type StatsCardsProps = {
  totalProjects: number;
  activeTasks: number;
  completedTasks: number;
};

export default function StatsCards({
  totalProjects,
  activeTasks,
  completedTasks,
}: StatsCardsProps) {
  return (
    <section className="stats-grid">

      <div className="stat-card">
        <div className="stat-icon">📁</div>

        <div>
          <p>Total Projects</p>
          <h2>{totalProjects}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✓</div>

        <div>
          <p>Active Tasks</p>
          <h2>{activeTasks}</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🎯</div>

        <div>
          <p>Completed</p>
          <h2>{completedTasks}</h2>
        </div>
      </div>

    </section>
  );
}
