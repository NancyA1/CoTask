"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  try {
    const response = await fetch("https://serene-heliotrope-3138a4.netlify.app/api/projects", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        description,
      }),
    });

    const data = await response.json();

    console.log("BACKEND RESPONSE:", data);

   if (!response.ok) {
  alert(data.message || "Failed to create project");
  return;
}

alert("Project created successfully!");
window.location.href = "/projects";

  } catch (error) {
    console.error("REQUEST ERROR:", error);
  }
};

  return (
    <div className="dashboard">

      <main className="dashboard-main">

        <div className="new-project-page">

          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>

          <div className="new-project-container">

            <div className="new-project-intro">
              <span className="new-project-icon">✦</span>

              <p className="projects-eyebrow">
                New workspace
              </p>

              <h1>Create a project</h1>

              <p>
                Start organizing your work, invite your team,
                and turn ideas into progress.
              </p>
            </div>

            <form
              className="project-form"
              onSubmit={handleSubmit}
            >

              <div className="form-field">
                <label htmlFor="name">
                  Project name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="e.g. CoTask Website"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="What are you building?"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows={5}
                />
              </div>

              <div className="project-form-actions">

                <Link
                  href="/projects"
                  className="cancel-project"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="create-project-btn"
                >
                  Create Project
                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

    </div>
  );
}
