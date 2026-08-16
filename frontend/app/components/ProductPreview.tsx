export default function ProductPreview() {
  return (
    <section className="product-preview">

      <div className="section-heading">

        <span className="section-eyebrow">
          YOUR WORKSPACE
        </span>

        <h2>
          Everything you need,
          <br />
          <span>in one place.</span>
        </h2>

        <p>
          Manage projects, track tasks, and see your team's
          progress without jumping between different tools.
        </p>

      </div>


      <div className="dashboard-preview">

        {/* Top bar */}

        <div className="preview-topbar">

          <div className="preview-brand">
            <span className="preview-logo">C</span>
            <strong>CoTask</strong>
          </div>

          <div className="preview-search">
            Search your workspace...
          </div>

          <div className="preview-user">
            👤
          </div>

        </div>


        <div className="preview-body">

          {/* Sidebar */}

          <aside className="preview-sidebar">

            <div className="sidebar-item active">
              <span>⌂</span>
              Dashboard
            </div>

            <div className="sidebar-item">
              <span>▣</span>
              Projects
            </div>

            <div className="sidebar-item">
              <span>✓</span>
              Tasks
            </div>

            <div className="sidebar-item">
              <span>◉</span>
              Team
            </div>

            <div className="sidebar-spacer"></div>

            <div className="sidebar-item">
              <span>⚙</span>
              Settings
            </div>

          </aside>


          {/* Main dashboard */}

          <main className="preview-main">

            <div className="preview-welcome">
              <div>
                <span>Monday, August 2026</span>

                <h3>
                  Good morning 👋
                </h3>
              </div>

              <button>
                + New Project
              </button>
            </div>


            <h4>Your projects</h4>


            <div className="project-cards">

              <div className="project-card">
                <span className="project-tag">
                  WEBSITE
                </span>

                <h5>CoTask Website</h5>

                <div className="project-progress">
                  <div>
                    <span>Progress</span>
                    <strong>72%</strong>
                  </div>

                  <div className="mini-progress">
                    <span style={{ width: "72%" }}></span>
                  </div>
                </div>
              </div>


              <div className="project-card">
                <span className="project-tag">
                  MOBILE
                </span>

                <h5>Mobile App</h5>

                <div className="project-progress">
                  <div>
                    <span>Progress</span>
                    <strong>45%</strong>
                  </div>

                  <div className="mini-progress">
                    <span style={{ width: "45%" }}></span>
                  </div>
                </div>
              </div>


              <div className="project-card">
                <span className="project-tag">
                  AI
                </span>

                <h5>AI Assistant</h5>

                <div className="project-progress">
                  <div>
                    <span>Progress</span>
                    <strong>88%</strong>
                  </div>

                  <div className="mini-progress">
                    <span style={{ width: "88%" }}></span>
                  </div>
                </div>
              </div>

            </div>


            <div className="recent-section">

              <div className="recent-header">
                <h4>Recent tasks</h4>
                <span>View all</span>
              </div>

              <div className="task-row">
                <span className="task-check completed">✓</span>
                <span>Build landing page</span>
                <small>Completed</small>
              </div>

              <div className="task-row">
                <span className="task-check">○</span>
                <span>Connect authentication API</span>
                <small>In progress</small>
              </div>

              <div className="task-row">
                <span className="task-check">○</span>
                <span>Build dashboard UI</span>
                <small>To do</small>
              </div>

            </div>

          </main>

        </div>

      </div>

    </section>
  );
}