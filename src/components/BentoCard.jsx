import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const BentoGrid = () => {
  return (
    <section id="work" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-5xl font-bold tracking-tighter italic font-serif">My Works</h2>
        <div className="h-[1px] flex-1 bg-zinc-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;