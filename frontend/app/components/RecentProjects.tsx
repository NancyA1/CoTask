import Link from "next/link";

export default function RecentProjects() {
  return (
    <section className="projects-section">

      <div className="section-heading">
        <div>
          <p>Workspace</p>
          <h2>Recent Projects</h2>
        </div>

        <Link href="/projects" className="view-all">
          View all
        </Link>
      </div>

      <div className="projects-grid">

        <div className="project-card">

          <div className="project-card-top">
            <span className="project-icon">◈</span>
            <span className="project-status">Active</span>
          </div>

          <h3>CoTask Website</h3>

          <p>
            Build and launch the CoTask productivity platform.
          </p>

          <div className="project-progress">
            <div className="progress-info">
              <span>Progress</span>
              <span>72%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill progress-72"></div>
            </div>
          </div>

          <div className="project-footer">
            <span>8 tasks</span>
            <span>3 members</span>
          </div>

        </div>


        <div className="project-card">

          <div className="project-card-top">
            <span className="project-icon">◇</span>
            <span className="project-status">Active</span>
          </div>

          <h3>Mobile Application</h3>

          <p>
            Plan the future mobile version of CoTask.
          </p>

          <div className="project-progress">
            <div className="progress-info">
              <span>Progress</span>
              <span>45%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill progress-45"></div>
            </div>
          </div>

          <div className="project-footer">
            <span>12 tasks</span>
            <span>4 members</span>
          </div>

        </div>


        <div className="project-card">

          <div className="project-card-top">
            <span className="project-icon">○</span>
            <span className="project-status completed">
              Completed
            </span>
          </div>

          <h3>API Development</h3>

          <p>
            Authentication and backend API implementation.
          </p>

          <div className="project-progress">
            <div className="progress-info">
              <span>Progress</span>
              <span>100%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill progress-100"></div>
            </div>
          </div>

          <div className="project-footer">
            <span>15 tasks</span>
            <span>2 members</span>
          </div>

        </div>

      </div>

    </section>
  );
}