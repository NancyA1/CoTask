import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-eyebrow">
          PROJECT MANAGEMENT, SIMPLIFIED
        </span>

        <h1>
          Organize your work.
          <br />
          <span>Stay on track.</span>
        </h1>

        <p className="hero-description">
          CoTask gives you one simple workspace to manage projects,
          organize tasks, and keep your team moving forward.
        </p>

        <div className="hero-actions">

          <Link href="/register" className="hero-primary-btn">
            Get Started
            <span>→</span>
          </Link>

          <Link href="/login" className="hero-secondary-btn">
            Sign In
          </Link>

        </div>

        <div className="hero-trust">
          <span className="trust-dot"></span>
          Simple workspace. Clear progress. Better teamwork.
        </div>

      </div>

      <div className="hero-visual">

        <div className="hero-image-wrapper">
          <img
            src="/Business Plan-pana.png"
            alt="People collaborating on projects"
          />
        </div>

        <div className="floating-card task-card">
          <div className="floating-icon">✓</div>
          <div>
            <strong>Tasks organized</strong>
            <span>Stay on top of your work</span>
          </div>
        </div>

        <div className="floating-card progress-card">
          <span className="progress-label">Project progress</span>

          <div className="progress-row">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <strong>78%</strong>
          </div>
        </div>

      </div>

    </section>
  );
}
