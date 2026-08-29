import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="final-cta">

      <div className="cta-glow"></div>

      <div className="cta-content">

        <span className="section-eyebrow cta-eyebrow">
          READY TO GET STARTED?
        </span>

        <h2>
          Turn your team's
          <br />
          <span>plans into progress.</span>
        </h2>

        <p>
          Bring your projects, tasks, and team together
          in one simple workspace.
        </p>

        <Link
          href="/register"
          className="cta-button"
        >
          Get Started
          <span>→</span>
        </Link>

        <small>
          No complicated setup. Just create your account and go.
        </small>

      </div>

    </section>
  );
}
