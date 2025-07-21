// src/pages/Skills.jsx

import React from 'react';
import {
  Brain,       // For Machine Learning
  BarChart,    // For Data Analysis
  Layers,      // For MERN Stack / Full Stack (or similar)
  Code,        // For General / Other Skills
  Database,    // For Data Science general or SQL
  // Cloud,       // For Docker or general cloud tools (not directly used as category icon)
} from 'lucide-react'; // Remember to install: npm install lucide-react

// --- Skills Data with Image URLs ---
// IMPORTANT: For best reliability, download these icons and place them in your public folder (e.g., /public/icons/).
// Then, use relative paths like '/icons/python.svg'.
const skillsData = [
  {
    category: 'Machine Learning',
    description: 'Building intelligent systems and predictive models.',
    icon: Brain, // Lucide icon for category header
    skills: [
      { name: 'Python', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Scikit-learn', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'TensorFlow', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      // Add more ML skills here (e.g., Keras, OpenCV, NLTK, spaCy)
    ],
  },
  {
    category: 'Data Science',
    description: 'Extracting insights and making data-driven decisions.',
    icon: Database, // Lucide icon for category header
    skills: [
      { name: 'NumPy', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Pandas', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'Matplotlib', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
      { name: 'Seaborn', imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1753104422/seaborn_wjievk.webp' }, // Updated to Cloudinary
      { name: 'SQL', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg' },
      // Add more Data Science skills here (e.g., R, Apache Spark)
    ],
  },
  {
    category: 'Data Analysis',
    description: 'Processing, visualizing, and interpreting data sets.',
    icon: BarChart, // Lucide icon for category header
    skills: [
      { name: 'SQL (Advanced)', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Excel', imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1753104408/4852567_csv_excell_files_spreadsheet_xls_icon_yfvxxv.png' }, // Updated to Cloudinary
      { name: 'Power BI', imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1753104408/9805162_logo_microsoft_data_office_power_bi_icon_ckua7o.png' }, // Updated to Cloudinary
      { name: 'Tableau', imageUrl: 'https://res.cloudinary.com/dqdhui9bw/image/upload/v1753104407/9035068_logo_tableau_icon_v0ispw.png' }, // Updated to Cloudinary
      // Add more Data Analysis tools (e.g., Looker Studio)
    ],
  },
  {
    category: 'MERN Stack',
    description: 'Full-stack web development with MongoDB, Express.js, React.js, Node.js.',
    icon: Layers, // Lucide icon for category header
    skills: [
      { name: 'HTML5', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React.js', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MongoDB', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg' },
      { name: 'Tailwind CSS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      // Add more MERN specific skills here (e.g., Redux, Mongoose)
    ],
  },
  {
    category: 'Other Skills & Tools',
    description: 'Essential tools and practices for modern development.',
    icon: Code, // Lucide icon for category header
    skills: [
      { name: 'Git', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Docker', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Postman', imageUrl: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg' },
      { name: 'Jupyter', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg' },
      { name: 'RESTful APIs', imageUrl: 'https://api.iconify.design/material-symbols:api.svg?color=%23424242' }, // Using a generic API icon from Iconify
      // Add any other relevant skills like Agile, Problem Solving, Soft Skills, etc.
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-20 bg-[#e0e0e0] min-h-screen flex items-center justify-center px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center text-gray-900 mb-12 leading-tight drop-shadow-lg">
          What I <span className="text-orange-600">Do</span> & My Skills
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={category.category}
              // Added hover:bg and hover:border classes for the Peach Puff effect
              className="bg-white rounded-xl shadow-2xl p-6 flex flex-col items-center text-center
                         border-b-4 border-orange-500 transform transition-all duration-300
                         hover:shadow-3xl hover:-translate-y-1 hover:bg-[#ffdab9] hover:border-orange-700 group" // Added 'group' class for hover effects
            >
              {/* Category Header with Icon */}
              <div className="flex items-center justify-center w-full mb-6">
                {React.createElement(category.icon, { className: 'w-10 h-10 mr-3 text-orange-600 flex-shrink-0 transition-colors duration-300 group-hover:text-orange-900' })}
                <h3 className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-900">{category.category}</h3>
              </div>
              <p className="text-gray-600 text-lg mb-8 flex-grow transition-colors duration-300 group-hover:text-gray-900">{category.description}</p>

              {/* Individual Skill Icons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50
                               shadow-md transition-transform duration-200 hover:scale-105 hover:bg-gray-100"
                  >
                    <img
                      src={skill.imageUrl}
                      alt={`${skill.name} icon`}
                      className="w-12 h-12 object-contain mb-2" // Adjust size as needed
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/CCCCCC/000000?text=?" }} // Fallback generic question mark icon
                    />
                    <p className="text-sm font-medium text-gray-700 text-center transition-colors duration-300 group-hover:text-gray-900">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;