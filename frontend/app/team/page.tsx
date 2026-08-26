"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function TeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/users",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("Users:", data);

        if (response.ok) {
          setMembers(data.users);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/projects",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("Projects:", data);

        if (response.ok) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMembers();
    fetchProjects();
  }, []);

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="dashboard-main">

        <div className="projects-header">
          <div>
            <p className="projects-eyebrow">YOUR TEAM</p>

            <h1>Team</h1>

            <p className="projects-subtitle">
              People working across your projects.
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading team members...</p>
        ) : (
          <>
            <div className="team-stat">
  <span className="team-stat-number">
    {members.length}
  </span>
  
  <span className="team-stat-label">
    Team members
  </span>
</div>

            <div className="members-grid">

              {members.map((member) => {

                const memberProjects = projects.filter((project) =>
                  project.members.some(
                    (projectMember: any) =>
                      projectMember.userId === member.id
                  )
                );
                const memberTasks = memberProjects.flatMap(
  (project) => project.tasks || []
);

                return (
                  <div
                    className="member-card"
                    key={member.id}
                  >

                    <div className="member-avatar">
                      {member.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="member-info">
                      <h3>{member.name}</h3>

                      <p>{member.email}</p>

                     <div className="member-projects">
  <p>
    Projects: {memberProjects.length}
  </p>

  {memberProjects.length > 0 && (
    <ul>
      {memberProjects.map((project) => (
        <li key={project.id}>
          {project.name}
        </li>
      ))}
    </ul>
  )}
</div>
<div className="member-tasks">
  <p>
    Tasks: {memberTasks.length}
  </p>

  {memberTasks.length > 0 && (
    <ul>
      {memberTasks.map((task) => (
        <li key={task.id}>
          {task.title}
        </li>
      ))}
    </ul>
  )}
</div>
                    </div>

                  </div>
                );
              })}

            </div>
          </>
        )}

      </main>

    </div>
  );
}