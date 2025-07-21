import { useEffect, useState } from "react";
import api from "../api";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
