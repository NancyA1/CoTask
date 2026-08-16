"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ProjectMember = {
  userId: number;
  projectId: number;
  role: string;
  joinedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  projectId: number;
};

type Project = {
  id: number;
  name: string;
  description: string | null;
  members: ProjectMember[];
  tasks: Task[];
};

export default function ProjectPage() {
  const params = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showTaskModal, setShowTaskModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskDueDate, setTaskDueDate] = useState("");

  const [creatingTask, setCreatingTask] = useState(false);
  const [taskError, setTaskError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${params.id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load project");
          return;
        }

        setProject(data.project);

        const tasksResponse = await fetch(
          "http://localhost:3000/api/tasks",
          {
            credentials: "include",
          }
        );

        const tasksData = await tasksResponse.json();

        if (!tasksResponse.ok) {
          setError(tasksData.message || "Failed to load tasks");
          return;
        }

        setTasks(
          tasksData.tasks.filter(
            (task: Task) =>
              task.projectId === Number(params.id)
          )
        );
      } catch (error) {
        console.error(error);
        setError(
          "Something went wrong while loading the project"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  const handleCreateTask = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setTaskError("");

    if (!taskTitle.trim()) {
      setTaskError("Task title is required");
      return;
    }

    try {
      setCreatingTask(true);

      const response = await fetch(
        "http://localhost:3000/api/tasks",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title: taskTitle,
            description: taskDescription,
            status: taskStatus,
            priority: taskPriority,
            projectId: Number(params.id),
            dueDate: taskDueDate || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setTaskError(
          data.message || "Failed to create task"
        );
        return;
      }

      setTasks((currentTasks) => [
        ...currentTasks,
        data.task,
      ]);

      setTaskTitle("");
      setTaskDescription("");
      setTaskStatus("todo");
      setTaskPriority("medium");
      setTaskDueDate("");

      setShowTaskModal(false);
    } catch (error) {
      console.error(error);
      setTaskError("Something went wrong");
    } finally {
      setCreatingTask(false);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to delete task"
        );
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId
        )
      );
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while deleting the task"
      );
    }
  };

  return (
    <main className="project-page">

      <div className="project-page-header">

        <div className="project-header-left">

          <button
            className="back-button"
            onClick={() => window.history.back()}
          >
            ← Back to Projects
          </button>

          <div className="project-title-row">

            <div className="project-large-icon">
              ◈
            </div>

            <div>
              <h1>{project.name}</h1>
              <p>{project.description}</p>
            </div>

          </div>

        </div>

        <button
          className="add-task-button"
          onClick={() => setShowTaskModal(true)}
        >
          + Add Task
        </button>

      </div>


      <div className="project-stats">

        <div className="project-stat">
          <span className="stat-label">
            Status
          </span>

          <span className="stat-value">
            Active
          </span>
        </div>


        <div className="project-stat">
          <span className="stat-label">
            Tasks
          </span>

          <span className="stat-value">
            {tasks.length}
          </span>
        </div>


        <div className="project-stat">
          <span className="stat-label">
            Members
          </span>

          <span className="stat-value">
            {project.members.length}
          </span>
        </div>


        <div className="project-stat">
          <span className="stat-label">
            Progress
          </span>

          <span className="stat-value">
            0%
          </span>
        </div>

      </div>


      <section className="project-board-section">

        <div className="board-heading">

          <div>
            <span className="section-eyebrow">
              Workspace
            </span>

            <h2>Project Board</h2>
          </div>

        </div>


        <div className="task-board">

          {/* TO DO */}

          <div className="task-column">

            <div className="column-header">

              <h3>To Do</h3>

              <span>
                {
                  tasks.filter(
                    (task) => task.status === "todo"
                  ).length
                }
              </span>

            </div>


            <div className="task-list">

              {tasks
                .filter(
                  (task) => task.status === "todo"
                )
                .map((task) => (

                  <div
                    className="task-card"
                    key={task.id}
                  >

                    <div className="task-card-top">

                      <span
                        className={`priority ${task.priority}`}
                      >
                        {task.priority}
                      </span>

                      <button
                        className="delete-task-button"
                        onClick={() =>
                          handleDeleteTask(task.id)
                        }
                      >
                        Delete
                      </button>

                    </div>


                    <h4>{task.title}</h4>

                    {task.description && (
                      <p>{task.description}</p>
                    )}

                  </div>

                ))}

            </div>

          </div>


          {/* IN PROGRESS */}

          <div className="task-column">

            <div className="column-header">

              <h3>In Progress</h3>

              <span>
                {
                  tasks.filter(
                    (task) =>
                      task.status === "in_progress"
                  ).length
                }
              </span>

            </div>


            <div className="task-list">

              {tasks
                .filter(
                  (task) =>
                    task.status === "in_progress"
                )
                .map((task) => (

                  <div
                    className="task-card"
                    key={task.id}
                  >

                    <div className="task-card-top">

                      <span
                        className={`priority ${task.priority}`}
                      >
                        {task.priority}
                      </span>

                      <button
                        className="delete-task-button"
                        onClick={() =>
                          handleDeleteTask(task.id)
                        }
                      >
                        Delete
                      </button>

                    </div>


                    <h4>{task.title}</h4>

                    {task.description && (
                      <p>{task.description}</p>
                    )}

                  </div>

                ))}

            </div>

          </div>


          {/* DONE */}

          <div className="task-column">

            <div className="column-header">

              <h3>Done</h3>

              <span>
                {
                  tasks.filter(
                    (task) => task.status === "done"
                  ).length
                }
              </span>

            </div>


            <div className="task-list">

              {tasks
                .filter(
                  (task) => task.status === "done"
                )
                .map((task) => (

                  <div
                    className="task-card"
                    key={task.id}
                  >

                    <div className="task-card-top">

                      <span
                        className={`priority ${task.priority}`}
                      >
                        {task.priority}
                      </span>

                      <button
                        className="delete-task-button"
                        onClick={() =>
                          handleDeleteTask(task.id)
                        }
                      >
                        Delete
                      </button>

                    </div>


                    <h4>{task.title}</h4>

                    {task.description && (
                      <p>{task.description}</p>
                    )}

                  </div>

                ))}

            </div>

          </div>

        </div>

      </section>


      {/* MEMBERS */}

      <section className="project-members-section">

        <div className="board-heading">

          <div>

            <span className="section-eyebrow">
              Team
            </span>

            <h2>Members</h2>

          </div>

        </div>


        <div className="members-grid">

          {project.members.map((member) => (

            <div
              className="member-card"
              key={member.userId}
            >

              <div className="member-avatar">
                {member.user.name
                  .charAt(0)
                  .toUpperCase()}
              </div>


              <div className="member-info">

                <h3>{member.user.name}</h3>

                <p>{member.user.email}</p>

              </div>


              <span
                className={`member-role ${member.role}`}
              >
                {member.role}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* CREATE TASK MODAL */}

      {showTaskModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowTaskModal(false)
          }
        >

          <div
            className="task-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="section-eyebrow">
                  New Task
                </span>

                <h2>Create a task</h2>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowTaskModal(false)
                }
              >
                ×
              </button>

            </div>


            <form onSubmit={handleCreateTask}>

              <div className="form-group">

                <label htmlFor="task-title">
                  Task title
                </label>

                <input
                  id="task-title"
                  type="text"
                  placeholder="e.g. Build login page"
                  value={taskTitle}
                  onChange={(event) =>
                    setTaskTitle(event.target.value)
                  }
                />

              </div>


              <div className="form-group">

                <label htmlFor="task-description">
                  Description
                </label>

                <textarea
                  id="task-description"
                  placeholder="What needs to be done?"
                  value={taskDescription}
                  onChange={(event) =>
                    setTaskDescription(
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-row">

                {/* STATUS */}

                <div className="form-group">

                  <label htmlFor="task-status">
                    Status
                  </label>

                  <select
                    id="task-status"
                    value={taskStatus}
                    onChange={(event) =>
                      setTaskStatus(
                        event.target.value
                      )
                    }
                  >

                    <option value="todo">
                      To Do
                    </option>

                    <option value="in_progress">
                      In Progress
                    </option>

                    <option value="done">
                      Done
                    </option>

                  </select>

                </div>


                {/* PRIORITY */}

                <div className="form-group">

                  <label htmlFor="task-priority">
                    Priority
                  </label>

                  <select
                    id="task-priority"
                    value={taskPriority}
                    onChange={(event) =>
                      setTaskPriority(
                        event.target.value
                      )
                    }
                  >

                    <option value="low">
                      Low
                    </option>

                    <option value="medium">
                      Medium
                    </option>

                    <option value="high">
                      High
                    </option>

                  </select>

                </div>


                {/* DUE DATE */}

                <div className="form-group">

                  <label htmlFor="task-due-date">
                    Due date
                  </label>

                  <input
                    id="task-due-date"
                    type="date"
                    value={taskDueDate}
                    onChange={(event) =>
                      setTaskDueDate(
                        event.target.value
                      )
                    }
                  />

                </div>

              </div>


              {taskError && (

                <p className="task-form-error">
                  {taskError}
                </p>

              )}


              <button
                type="submit"
                className="create-task-button"
                disabled={creatingTask}
              >

                {creatingTask
                  ? "Creating..."
                  : "Create Task"}

              </button>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}