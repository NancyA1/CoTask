"use client"
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import RecentProjects from "../components/RecentProjects";
export default function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="dashboard-main">

        <DashboardHeader />
        <StatsCards />
        <RecentProjects/>

      </main>

    </div>
  );
}