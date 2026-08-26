"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/tasks",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);
const updateTaskStatus = async (taskId: number, status: string) => {
  try {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: status,
          priority: task.priority,
          dueDate: task.dueDate,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? { ...task, status }
            : task
        )
      );

      console.log("Task updated:", data);
    } else {
      console.error("Failed to update task:", data);
    }
  } catch (error) {
    console.error(error);
  }
};
  return (
  <div className="dashboard">

    <Sidebar />

    <main className="dashboard-main">

      <div className="projects-header">
        <div>
          <p className="projects-eyebrow">YOUR WORK</p>

          <h1>Tasks</h1>

          <p className="projects-subtitle">
            All your tasks across your projects.
          </p>
        </div>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="task-list">

          {tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task.id}>

                <div className="task-card-top">

                  <div>
                    <span className={`priority ${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>

                </div>

                <h4>{task.title}</h4>

                <p>
                  Project: {task.project.name}
                </p>

                <div className="task-assignees">
                  Status:
                  
                  <select
  className="task-status-select"
  value={task.status}
  onChange={(event) => {
    updateTaskStatus(
      task.id,
      event.target.value
    );
  }}
>
                    <option value="todo">To Do</option>
                    <option value="in_progress">
                      In Progress
                    </option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <p>
                  Due date:{" "}
                  {task.dueDate
                    ? new Date(
                        task.dueDate
                      ).toLocaleDateString()
                    : "No due date"}
                </p>

              </div>
            ))
          )}

        </div>
      )}

    </main>

  </div>
);
}