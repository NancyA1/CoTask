export default function DashboardHeader() {
  return (
    <header className="dashboard-header">

      <div>
        <p className="dashboard-greeting">Good morning 👋</p>
        <h1>Welcome back, Ness</h1>
        <p className="dashboard-subtitle">
          Here's what's happening with your projects today.
        </p>
      </div>

      <button className="new-project-btn">
        + New Project
      </button>

    </header>
  );
}