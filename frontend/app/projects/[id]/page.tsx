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
type TaskAssignment = {
  userId: number;
  taskId: number;
  assignedAt: string;
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
  assignments: TaskAssignment[];
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

  // CREATE TASK
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("todo");
  const [taskPriority, setTaskPriority] = useState("medium");
  const [taskDueDate, setTaskDueDate] = useState("");

  const [creatingTask, setCreatingTask] = useState(false);
  const [taskError, setTaskError] = useState("");

  // EDIT TASK
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDescription, setEditTaskDescription] =
    useState("");
  const [editTaskStatus, setEditTaskStatus] = useState("todo");
  const [editTaskPriority, setEditTaskPriority] =
    useState("medium");
  const [editTaskDueDate, setEditTaskDueDate] = useState("");

  const [updatingTask, setUpdatingTask] = useState(false);
  const [editTaskError, setEditTaskError] = useState("");
const [showAssignModal, setShowAssignModal] = useState(false);
const [selectedTask, setSelectedTask] = useState<Task | null>(null);
const [selectedUserId, setSelectedUserId] = useState("");
const [assigningTask, setAssigningTask] = useState(false);
const [assignError, setAssignError] = useState("");
const [showAddMemberModal, setShowAddMemberModal] = useState(false);
const [users, setUsers] = useState<
  {
    id: number;
    name: string;
    email: string;
  }[]
>([]);
const [selectedMemberId, setSelectedMemberId] = useState("");
const [addingMember, setAddingMember] = useState(false);
const [memberError, setMemberError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `https://serene-heliotrope-3138a4.netlify.app/api/projects/${params.id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Failed to load project"
          );
          return;
        }

        setProject(data.project);

        const tasksResponse = await fetch(
          "https://serene-heliotrope-3138a4.netlify.app/api/tasks",
          {
            credentials: "include",
          }
        );

        const tasksData = await tasksResponse.json();

        if (!tasksResponse.ok) {
          setError(
            tasksData.message || "Failed to load tasks"
          );
          return;
        }

        setTasks(
          tasksData.tasks.filter(
            (task: Task) =>
              task.projectId === Number(params.id)
          )
        );

        const usersResponse = await fetch(
  "https://serene-heliotrope-3138a4.netlify.app/api/auth/users",
  {
    credentials: "include",
  }
);

const usersData = await usersResponse.json();

if (!usersResponse.ok) {
  setError(
    usersData.message || "Failed to load users"
  );
  return;
}

setUsers(usersData.users);
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
        "https://serene-heliotrope-3138a4.netlify.app/api/tasks",
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
  {
    ...data.task,
    assignments: [],
  },
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
        `https://serene-heliotrope-3138a4.netlify.app/api/tasks/${taskId}`,
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

  const handleEditTask = (task: Task) => {
    setEditingTask(task);

    setEditTaskTitle(task.title);
    setEditTaskDescription(task.description || "");
    setEditTaskStatus(task.status);
    setEditTaskPriority(task.priority);

    setEditTaskDueDate(
      task.dueDate
        ? task.dueDate.split("T")[0]
        : ""
    );

    setEditTaskError("");
  };

  const handleUpdateTask = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setEditTaskError("");

    if (!editingTask) {
      return;
    }

    if (!editTaskTitle.trim()) {
      setEditTaskError("Task title is required");
      return;
    }

    try {
      setUpdatingTask(true);

      const response = await fetch(
        `https://serene-heliotrope-3138a4.netlify.app/api/tasks/${editingTask.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            title: editTaskTitle,
            description: editTaskDescription,
            status: editTaskStatus,
            priority: editTaskPriority,
            dueDate: editTaskDueDate || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setEditTaskError(
          data.message || "Failed to update task"
        );
        return;
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? data.updatedTask
            : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      console.error(error);

      setEditTaskError(
        "Something went wrong while updating the task"
      );
    } finally {
      setUpdatingTask(false);
    }
  };

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }
const handleAssignTask = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  setAssignError("");

  if (!selectedTask) {
    return;
  }

  if (!selectedUserId) {
    setAssignError("Please select a member");
    return;
  }

  try {
    setAssigningTask(true);

    const response = await fetch(
      `https://serene-heliotrope-3138a4.netlify.app/api/tasks/${selectedTask.id}/assign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: Number(selectedUserId),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setAssignError(
        data.message || "Failed to assign user"
      );
      return;
    }

    const assignedMember = project.members.find(
      (member) =>
        member.userId === Number(selectedUserId)
    );

    if (!assignedMember) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== selectedTask.id) {
          return task;
        }

        return {
          ...task,
          assignments: [
            ...task.assignments,
            {
              userId: assignedMember.userId,
              taskId: task.id,
              assignedAt: new Date().toISOString(),
              user: {
                id: assignedMember.user.id,
                name: assignedMember.user.name,
                email: assignedMember.user.email,
              },
            },
          ],
        };
      })
    );

    setSelectedUserId("");
    setSelectedTask(null);
    setShowAssignModal(false);

  } catch (error) {
    console.error(error);
    setAssignError(
      "Something went wrong while assigning the task"
    );
  } finally {
    setAssigningTask(false);
  }
};
const handleAddMember = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  setMemberError("");

  if (!selectedMemberId) {
    setMemberError("Please select a user");
    return;
  }

  try {
    setAddingMember(true);

    const response = await fetch(
      `https://serene-heliotrope-3138a4.netlify.app/api/projects/${params.id}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: Number(selectedMemberId),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMemberError(
        data.message || "Failed to add member"
      );
      return;
    }

    const addedUser = users.find(
      (user) =>
        user.id === Number(selectedMemberId)
    );

    if (!addedUser) {
      return;
    }

    setProject((currentProject) => {
      if (!currentProject) {
        return currentProject;
      }

      return {
        ...currentProject,
        members: [
          ...currentProject.members,
          {
            userId: addedUser.id,
            projectId: Number(params.id),
            role: "member",
            joinedAt: new Date().toISOString(),
            user: {
              id: addedUser.id,
              name: addedUser.name,
              email: addedUser.email,
            },
          },
        ],
      };
    });

    setSelectedMemberId("");
    setShowAddMemberModal(false);

  } catch (error) {
    console.error(error);

    setMemberError(
      "Something went wrong while adding the member"
    );
  } finally {
    setAddingMember(false);
  }
};
  return (
    <main className="project-page">

      {/* HEADER */}

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
          onClick={() =>
            setShowTaskModal(true)
          }
        >
          + Add Task
        </button>

      </div>


      {/* PROJECT STATS */}

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


      {/* PROJECT BOARD */}

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
                    (task) =>
                      task.status === "todo"
                  ).length
                }
              </span>

            </div>


            <div className="task-list">

              {tasks
                .filter(
                  (task) =>
                    task.status === "todo"
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

                      <div>

                        <button
                          className="edit-task-button"
                          onClick={() =>
                            handleEditTask(task)
                          }
                        >
                          Edit
                        </button>
                        <button
  className="edit-task-button"
  onClick={() => {
    setSelectedTask(task);
    setSelectedUserId("");
    setAssignError("");
    setShowAssignModal(true);
  }}
>
  Assign
</button>
                        <button
                          className="delete-task-button"
                          onClick={() =>
                            handleDeleteTask(task.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>


                    <h4>{task.title}</h4>

                    {task.description && (
                      <p>{task.description}</p>
                    )}
{task.assignments.length > 0 && (
  <div className="task-assignees">
    <span>Assigned to:</span>

    {task.assignments.map((assignment) => (
      <span
        className="task-assignee"
        key={`${assignment.userId}-${assignment.taskId}`}
      >
        {assignment.user.name}
      </span>
    ))}
  </div>
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
                      task.status ===
                      "in_progress"
                  ).length
                }
              </span>

            </div>


            <div className="task-list">

              {tasks
                .filter(
                  (task) =>
                    task.status ===
                    "in_progress"
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

                      <div>

                        <button
                          className="edit-task-button"
                          onClick={() =>
                            handleEditTask(task)
                          }
                        >
                          Edit
                        </button>
<button
  className="edit-task-button"
  onClick={() => {
    setSelectedTask(task);
    setSelectedUserId("");
    setAssignError("");
    setShowAssignModal(true);
  }}
>
  Assign
</button>
                        <button
                          className="delete-task-button"
                          onClick={() =>
                            handleDeleteTask(task.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>


                    <h4>{task.title}</h4>

                    {task.description && (
                      <p>{task.description}</p>
                    )}
{task.assignments.length > 0 && (
  <div className="task-assignees">
    <span>Assigned to:</span>

    {task.assignments.map((assignment) => (
      <span
        className="task-assignee"
        key={`${assignment.userId}-${assignment.taskId}`}
      >
        {assignment.user.name}
      </span>
    ))}
  </div>
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
                    (task) =>
                      task.status === "done"
                  ).length
                }
              </span>

            </div>


            <div className="task-list">

              {tasks
                .filter(
                  (task) =>
                    task.status === "done"
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

                      <div>

                        <button
                          className="edit-task-button"
                          onClick={() =>
                            handleEditTask(task)
                          }
                        >
                          Edit
                        </button>
  <button
  className="edit-task-button"
  onClick={() => {
    setSelectedTask(task);
    setSelectedUserId("");
    setAssignError("");
    setShowAssignModal(true);
  }}
>
  Assign
</button>
                        <button
                          className="delete-task-button"
                          onClick={() =>
                            handleDeleteTask(task.id)
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>


                    <h4>{task.title}</h4>

                    {task.description && (
                      <p>{task.description}</p>
                    )}
{task.assignments.length > 0 && (
  <div className="task-assignees">
    <span>Assigned to:</span>

    {task.assignments.map((assignment) => (
      <span
        className="task-assignee"
        key={`${assignment.userId}-${assignment.taskId}`}
      >
        {assignment.user.name}
      </span>
    ))}
  </div>
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

  <button
    className="add-task-button"
    onClick={() => {
      setMemberError("");
      setSelectedMemberId("");
      setShowAddMemberModal(true);
    }}
  >
    + Add Member
  </button>

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


            <form
              onSubmit={handleCreateTask}
            >

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
                    setTaskTitle(
                      event.target.value
                    )
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


      {/* EDIT TASK MODAL */}

      {editingTask && (

        <div
          className="modal-overlay"
          onClick={() =>
            setEditingTask(null)
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
                  Edit Task
                </span>

                <h2>Update task</h2>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setEditingTask(null)
                }
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleUpdateTask}
            >

              {/* TITLE */}

              <div className="form-group">

                <label htmlFor="edit-task-title">
                  Task title
                </label>

                <input
                  id="edit-task-title"
                  type="text"
                  value={editTaskTitle}
                  onChange={(event) =>
                    setEditTaskTitle(
                      event.target.value
                    )
                  }
                />

              </div>


              {/* DESCRIPTION */}

              <div className="form-group">

                <label htmlFor="edit-task-description">
                  Description
                </label>

                <textarea
                  id="edit-task-description"
                  value={editTaskDescription}
                  onChange={(event) =>
                    setEditTaskDescription(
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="form-row">

                {/* STATUS */}

                <div className="form-group">

                  <label htmlFor="edit-task-status">
                    Status
                  </label>

                  <select
                    id="edit-task-status"
                    value={editTaskStatus}
                    onChange={(event) =>
                      setEditTaskStatus(
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

                  <label htmlFor="edit-task-priority">
                    Priority
                  </label>

                  <select
                    id="edit-task-priority"
                    value={editTaskPriority}
                    onChange={(event) =>
                      setEditTaskPriority(
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

              </div>


              {/* DUE DATE */}

              <div className="form-group">

                <label htmlFor="edit-task-due-date">
                  Due date
                </label>

                <input
                  id="edit-task-due-date"
                  type="date"
                  value={editTaskDueDate}
                  onChange={(event) =>
                    setEditTaskDueDate(
                      event.target.value
                    )
                  }
                />

              </div>


              {editTaskError && (

                <p className="task-form-error">
                  {editTaskError}
                </p>

              )}


              <button
                type="submit"
                className="create-task-button"
                disabled={updatingTask}
              >
                {updatingTask
                  ? "Updating..."
                  : "Update Task"}
              </button>

            </form>

          </div>

        </div>

      )}
{showAssignModal && selectedTask && (
  <div
    className="modal-overlay"
    onClick={() => setShowAssignModal(false)}
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
            Assign Task
          </span>

          <h2>Assign a member</h2>
        </div>

        <button
          className="modal-close"
          onClick={() =>
            setShowAssignModal(false)
          }
        >
          ×
        </button>

      </div>


      <p>
        Assign <strong>{selectedTask.title}</strong>{" "}
        to a project member.
      </p>


      <form onSubmit={handleAssignTask}>

        <div className="form-group">

          <label htmlFor="task-member">
            Project member
          </label>

          <select
            id="task-member"
            value={selectedUserId}
            onChange={(event) =>
              setSelectedUserId(
                event.target.value
              )
            }
          >

            <option value="">
              Select a member
            </option>

            {project.members.map((member) => (
              <option
                key={member.userId}
                value={member.userId}
              >
                {member.user.name} (
                {member.user.email})
              </option>
            ))}

          </select>

        </div>


        {assignError && (
          <p className="task-form-error">
            {assignError}
          </p>
        )}


        <button
          type="submit"
          className="create-task-button"
          disabled={assigningTask}
        >
          {assigningTask
            ? "Assigning..."
            : "Assign Task"}
        </button>

      </form>

    </div>

  </div>
)}
{showAddMemberModal && (
  <div
    className="modal-overlay"
    onClick={() => setShowAddMemberModal(false)}
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
            Team
          </span>

          <h2>Add a member</h2>
        </div>

        <button
          className="modal-close"
          onClick={() =>
            setShowAddMemberModal(false)
          }
        >
          ×
        </button>

      </div>

      <form onSubmit={handleAddMember}>

        <div className="form-group">

          <label htmlFor="project-member">
            Select a user
          </label>

          <select
            id="project-member"
            value={selectedMemberId}
            onChange={(event) =>
              setSelectedMemberId(
                event.target.value
              )
            }
          >

            <option value="">
              Select a user
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name} ({user.email})
              </option>
            ))}

          </select>

        </div>

        {memberError && (
          <p className="task-form-error">
            {memberError}
          </p>
        )}

        <button
  type="submit"
  className="create-task-button"
  disabled={addingMember}
>
  {addingMember
    ? "Adding..."
    : "Add Member"}
</button>

      </form>

    </div>
  </div>
)}
    </main>
  );
}