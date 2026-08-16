"use client";

import { useEffect, useState } from "react";
import ProjectsHeader from "../components/ProjectsHeader";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
    const [projects, setProjects] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/projects",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to load projects");
        return;
      }

      setProjects(data.projects);

    } catch (error) {
      console.error(error);
      setError("Something went wrong while loading projects");
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  return (
    <div className="dashboard">

      <main className="dashboard-main">

        <ProjectsHeader />

        <section className="projects-section">

          <div className="section-heading">
            <div>
              <p>Your workspace</p>
              <h2>Your Projects</h2>
            </div>
          </div>

        {loading && <p>Loading projects...</p>}

{error && <p>{error}</p>}

          <div className="projects-grid">

            {projects.map((project) => (
  <ProjectCard
  key={project.id}
  id={project.id}
  name={project.name}
  description={project.description}
  progress={0}
  members={project.members.length}
  tasks={project.tasks.length}
/>
))}

          </div>

        </section>

      </main>

    </div>
  );
}