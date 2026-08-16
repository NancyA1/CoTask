import Link from "next/link";

export default function ProjectsHeader() {
  return (
    <header className="projects-header">

      <div>
        <p className="projects-eyebrow">Workspace</p>

        <h1>Projects</h1>

        <p className="projects-subtitle">
          Manage your projects and keep your team moving forward.
        </p>
      </div>

      <Link href="/projects/new" className="new-project-btn">
        + New Project
      </Link>

    </header>
  );
}