"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import RecentProjects from "../components/RecentProjects";

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://serene-heliotrope-3138a4.netlify.app/api/projects",
          {
            credentials: "include",
          }
        );

        const data = await response.json();
        console.log("PROJECT DATA:", data);

        if (response.ok) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const totalProjects = projects.length;

  const allTasks = projects.flatMap(
    (project) => project.tasks || []
  );

  const activeTasks = allTasks.filter(
    (task) => task.status !== "done"
  ).length;

  const completedTasks = allTasks.filter(
    (task) => task.status === "done"
  ).length;

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardHeader />

        <StatsCards
          totalProjects={totalProjects}
          activeTasks={activeTasks}
          completedTasks={completedTasks}
        />

        <RecentProjects
          projects={projects}
          loading={loading}
        />

      </main>

    </div>
  );
}
