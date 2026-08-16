import ProjectsHeader from "../components/ProjectsHeader";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <div className="dashboard">

      <main className="dashboard-main">

        <ProjectsHeader />

        <section className="projects-section">

          <div className="section-heading">
            <div>
              <p>Your workspace</p>
              <h2>Your Projects</h2>
            </div>
          </div>

          <div className="projects-grid">

            <ProjectCard
              id={1}
              name="CoTask Website"
              description="Build and launch the CoTask productivity platform."
              progress={72}
              members={3}
              tasks={8}
            />

            <ProjectCard
              id={2}
              name="Portfolio Website"
              description="Build and launch a personal developer portfolio."
              progress={45}
              members={2}
              tasks={12}
            />

            <ProjectCard
              id={3}
              name="API Development"
              description="Authentication and backend API implementation."
              progress={100}
              members={2}
              tasks={15}
            />

          </div>

        </section>

      </main>

    </div>
  );
}