import Link from "next/link";

type ProjectCardProps = {
  id: number;
  name: string;
  description: string;
  progress: number;
  members: number;
  tasks: number;
};

export default function ProjectCard({
  id,
  name,
  description,
  progress,
  members,
  tasks,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="project-card">

      <div className="project-card-top">
        <span className="project-icon">◈</span>

        <span className="project-status">
          Active
        </span>
      </div>

      <h3>{name}</h3>

      <p>{description}</p>

      <div className="project-progress">

        <div className="progress-info">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      <div className="project-footer">
        <span>{tasks} tasks</span>
        <span>{members} members</span>
      </div>

    </Link>
  );
}