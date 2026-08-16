export default function Features() {
  return (
    <section className="features" id="features">

      <div className="section-heading features-heading">

        <span className="section-eyebrow">
          BUILT FOR PRODUCTIVITY
        </span>

        <h2>
          Everything your team needs
          <br />
          <span>to move forward.</span>
        </h2>

        <p>
          CoTask keeps your projects, tasks, and team organized
          so you can focus on getting meaningful work done.
        </p>

      </div>


      <div className="features-grid">


        {/* PROJECTS */}

        <article className="feature-card">

          <div className="feature-top">

            <div className="feature-icon project-icon">
              ◉
            </div>

            <span className="feature-number">
              01
            </span>

          </div>

          <h3>
            Manage projects
          </h3>

          <p>
            Keep every project organized and see exactly
            how much progress you've made.
          </p>


          <div className="feature-preview project-preview">

            <div className="preview-project-header">
              <span>Website redesign</span>
              <strong>72%</strong>
            </div>

            <div className="feature-progress">
              <span></span>
            </div>

            <div className="project-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

        </article>


        {/* TASKS */}

        <article className="feature-card">

          <div className="feature-top">

            <div className="feature-icon task-icon">
              ✓
            </div>

            <span className="feature-number">
              02
            </span>

          </div>

          <h3>
            Track tasks
          </h3>

          <p>
            Know what needs to be done, what's in progress,
            and what your team has already completed.
          </p>


          <div className="feature-preview task-preview">

            <div className="mini-task completed">
              <span>✓</span>
              Build landing page
            </div>

            <div className="mini-task">
              <span>○</span>
              Connect API
            </div>

            <div className="mini-task">
              <span>○</span>
              Build dashboard
            </div>

          </div>

        </article>


        {/* TEAM */}

        <article className="feature-card">

          <div className="feature-top">

            <div className="feature-icon team-icon">
              ◇
            </div>

            <span className="feature-number">
              03
            </span>

          </div>

          <h3>
            Work together
          </h3>

          <p>
            Assign responsibilities and keep everyone
            aligned around the same goals.
          </p>


          <div className="feature-preview team-preview">

            <div className="team-member">
              <span className="avatar avatar-one">N</span>

              <div>
                <strong>Nancy</strong>
                <small>Frontend</small>
              </div>

              <span className="member-status">3 tasks</span>
            </div>

            <div className="team-member">
              <span className="avatar avatar-two">A</span>

              <div>
                <strong>Alex</strong>
                <small>Backend</small>
              </div>

              <span className="member-status">5 tasks</span>
            </div>

          </div>

        </article>

      </div>

    </section>
  );
}