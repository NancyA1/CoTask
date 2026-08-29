import Link from "next/link";

type RecentProjectsProps = {
  projects: any[];
  loading: boolean;
};

export default function RecentProjects({
  projects,
  loading,
}: RecentProjectsProps) {
  const recentProjects = projects.slice(0, 3);

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

      {loading && <p>Loading projects...</p>}

      {!loading && projects.length === 0 && (
        <p>No projects yet.</p>
      )}

      <div className="projects-grid">

        {recentProjects.map((project) => {

          const tasks = project.tasks || [];
          const members = project.members || [];

          const completedTasks = tasks.filter(
            (task: any) => task.status === "done"
          ).length;

          const progress =
            tasks.length === 0
              ? 0
              : Math.round(
                  (completedTasks / tasks.length) * 100
                );

          return (
            <Link
              href={`/projects/${project.id}`}
              className="project-card"
              key={project.id}
            >

              <div className="project-card-top">
                <span className="project-icon">
                  ◈
                </span>

                <span className="project-status">
                  Active
                </span>
              </div>

              <h3>{project.name}</h3>

              <p>{project.description}</p>

              <div className="project-progress">

                <div className="progress-info">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

              </div>

              <div className="project-footer">
                <span>{tasks.length} tasks</span>
                <span>{members.length} members</span>
              </div>

            </Link>
          );
        })}

      </div>

    </section>
  );
}
