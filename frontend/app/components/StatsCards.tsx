export default function StatsCards() {
  return (
    <section className="stats-grid">

      <div className="stat-card">
        <div className="stat-icon">📁</div>
        <div>
          <p>Total Projects</p>
          <h2>5</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✓</div>
        <div>
          <p>Active Tasks</p>
          <h2>18</h2>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🎯</div>
        <div>
          <p>Completed</p>
          <h2>12</h2>
        </div>
      </div>

    </section>
  );
}