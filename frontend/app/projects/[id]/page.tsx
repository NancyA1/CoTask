"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Project = {
  id: number;
  name: string;
  description: string | null;
//   members: any[];
//   tasks: any[];
//   progress: number;
};

export default function ProjectPage() {
  const params = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${params.id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load project");
          return;
        }

        setProject(data.project);

      } catch (error) {
        console.error(error);
        setError("Something went wrong while loading the project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <main>
      <h1>{project.name}</h1>

      <p>{project.description}</p>

      <p>Project ID: {project.id}</p>
    </main>
  );
}