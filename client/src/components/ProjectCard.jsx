import React from 'react';
// Importing icons for links (optional, but good for consistency)
import { Github, Link as LinkIcon } from 'lucide-react';

// ProjectCard component displays individual project details
export default function ProjectCard({ project }) {
  return (
    // Main card container with consistent styling from the portfolio page
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Project Image */}
      {project.imageUrl && (
        <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden bg-gray-200 flex items-center justify-center">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            // Fallback for image loading errors
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/000000?text=Image+Not+Found" }}
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Project Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
          {project.title}
        </h2>

        {/* Project Category and Date */}
        {(project.category || project.completionYear) && (
          <p className="text-sm text-gray-500 mb-2">
            {project.category && <span className="font-semibold">{project.category}</span>}
            {project.category && project.completionYear && ' - '}
            {project.completionYear && <span>{project.completionYear}</span>}
          </p>
        )}

        {/* Project Description */}
        <p className="text-gray-600 text-sm sm:text-base mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack / Tags */}
        {(project.techStack && project.techStack.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons (GitHub and Live Demo) */}
        <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-gray-100">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer" // Security best practice for target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-lg text-orange-600 border border-orange-600
                         hover:bg-orange-600 hover:text-white transition-colors duration-300 text-sm sm:text-base font-medium"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-orange-600
                         hover:bg-orange-700 transition-colors duration-300 text-sm sm:text-base font-medium"
            >
              <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Sample Usage Example (How you would use ProjectCard in a parent component) ---
// You would typically fetch your project data from an API or define it in a separate file.
// For demonstration, here's a sample array of project objects:

/*
const sampleProjects = [
  {
    title: "Predictive Analytics for E-commerce",
    description: "Developed a machine learning model to predict customer churn and optimize marketing campaigns for an e-commerce platform, leading to a 15% reduction in churn rate.",
    imageUrl: "https://placehold.co/600x400/FF7F50/FFFFFF?text=E-commerce+ML", // Placeholder image
    github: "https://github.com/manubabu/ecommerce-ml-project",
    demo: "https://manubabu.com/ecommerce-ml-demo",
    techStack: ["Python", "Scikit-learn", "Pandas", "Jupyter", "SQL"],
    category: "Data Science",
    completionYear: 2023
  },
  {
    title: "Real-time Chat Application",
    description: "Built a full-stack real-time chat application with user authentication, private messaging, and group chats using WebSockets.",
    imageUrl: "https://placehold.co/600x400/FFFFE0/000000?text=Chat+App", // Placeholder image
    github: "https://github.com/manubabu/realtime-chat-app",
    demo: "https://manubabu.com/chat-app-demo",
    techStack: ["React", "Node.js", "Express.js", "Socket.io", "MongoDB"],
    category: "Full Stack Development",
    completionYear: 2024
  },
  {
    title: "Image Recognition API",
    description: "Created a RESTful API for image recognition using a pre-trained Convolutional Neural Network (CNN) model, deployed on a cloud platform.",
    imageUrl: "https://placehold.co/600x400/FF7F50/FFFFFF?text=Image+Recognition", // Placeholder image
    github: "https://github.com/manubabu/image-recognition-api",
    techStack: ["Python", "TensorFlow", "Keras", "Flask", "Docker"],
    category: "Machine Learning",
    completionYear: 2023
  },
  {
    title: "Portfolio Website V2",
    description: "Designed and developed a responsive personal portfolio website to showcase projects, skills, and contact information.",
    imageUrl: "https://placehold.co/600x400/FFFFE0/000000?text=Portfolio+Site", // Placeholder image
    github: "https://github.com/manubabu/portfolio-v2",
    demo: "https://manubabu.com",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    category: "Full Stack Development",
    completionYear: 2024
  }
];

// Example of how you might render these cards in a Projects page component:
// function ProjectsPage() {
//   return (
//     <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {sampleProjects.map((project, index) => (
//         <ProjectCard key={index} project={project} />
//       ))}
//     </div>
//   );
// }
*/
