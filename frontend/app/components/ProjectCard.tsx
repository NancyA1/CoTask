"use client";

import Link from "next/link";
import { useState } from "react";

type ProjectCardProps = {
  id: number;
  name: string;
  description: string;
  progress: number;
  members: number;
  tasks: number;
  onDelete: (id: number) => void;
};
export default function ProjectCard({
  id,
  name,
  description,
  progress,
  members,
  tasks,
onDelete,
}: ProjectCardProps) {
    const [editing, setEditing] = useState(false);
  const [projectName, setProjectName] = useState(name);
  const [projectDescription, setProjectDescription] =
    useState(description);
  const handleUpdateProject = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: projectName,
            description: projectDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update project");
        return;
      }

      setEditing(false);

    } catch (error) {
      console.error(error);
      alert("Something went wrong while updating the project");
    }
  };
const handleDeleteProject = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this project?"
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/projects/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to delete project");
      return;
    }

    alert("Project deleted successfully");
    onDelete(id);

  } catch (error) {
    console.error(error);
    alert("Something went wrong while deleting the project");
  }
};
  return (
    <div className="project-card">

      <div className="project-card-top">
        <span className="project-icon">◈</span>

        <span className="project-status">
          Active
        </span>
      </div>

      <h3>{projectName}</h3>

<p>{projectDescription}</p>

      <div className="project-progress">

        <div className="progress-info">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      <div className="project-footer">
        <span>{tasks} tasks</span>
        <span>{members} members</span>
      </div>
     <div className="project-actions">

  <Link
    href={`/projects/${id}`}
    className="open-project-button"
  >
    Open Project
  </Link>

  <button
    className="edit-project-button"
    onClick={() => setEditing(true)}
  >
    Edit
  </button>

  <button
    className="delete-project-button"
    onClick={handleDeleteProject}
  >
    Delete
  </button>

</div>
{editing && (
  <div className="edit-project-form">

    <div className="edit-project-header">
      <span>Edit project</span>
    </div>

    <div className="edit-project-field">
      <label>Project name</label>

      <input
        type="text"
        value={projectName}
        onChange={(event) =>
          setProjectName(event.target.value)
        }
      />
    </div>

    <div className="edit-project-field">
      <label>Description</label>

      <textarea
        value={projectDescription}
        onChange={(event) =>
          setProjectDescription(event.target.value)
        }
      />
    </div>

    <div className="edit-project-actions">

      <button
        type="button"
        className="save-project-button"
        onClick={handleUpdateProject}
      >
        Save Changes
      </button>

      <button
        type="button"
        className="cancel-project-button"
        onClick={() => setEditing(false)}
      >
        Cancel
      </button>

    </div>

  </div>
)}
    </div>
  );
}