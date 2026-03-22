import { motion } from "framer-motion";
import CardSwap, { Card } from './CardSwap';

// Import your images here
// import devImg from '../assets/development.jpg';
// import aiImg from '../assets/ai.jpg';
// import dataImg from '../assets/data.jpg';

const About = () => {
  return (
    <section id="about" className="py-32 px-6 border-t border-zinc-900 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Text */}
 <div className="flex flex-col text-left">
  <motion.h2 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="text-zinc-600 font-mono tracking-[0.4em] uppercase mb-8 text-xs italic"
  >
    // ABOUT ME
  </motion.h2>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="space-y-8">
    <div className="flex flex-col text-left">

  <motion.p 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-12 text-white"
  >
    I build systems that transform <br />
    <span className="italic font-serif text-zinc-500">data into intelligence</span> <br />
    and ideas into <br />
    <span className="text-emerald-400">scalable digital products.</span>
  </motion.p>
</div>

  <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
  I am a Full Stack Developer and Machine Learning enthusiast focused on building production-grade applications that combine modern web technologies with intelligent systems. I specialize in designing scalable architectures, developing robust backend services, and delivering AI-driven solutions for real-world problems.
</p>

<p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
  With experience in the MERN stack, Python-based ML pipelines, and cloud deployment, I emphasize system design, performance, and maintainability. My work spans CMS platforms used by real institutions to AI systems that generate actionable insights from data.
</p>

<p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
  I focus on understanding problems deeply and translating them into scalable, efficient solutions, aiming to build systems that deliver meaningful and long-term impact.
</p>

    <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
      I am particularly interested in the intersection of 
      <span className="text-emerald-400"> machine learning, backend engineering, and distributed systems</span>, 
      where intelligent decision-making meets scalable infrastructure.
    </p>
  </motion.div>
</div>

        {/* Right Side: CardStack with Images */}
      <div className="relative flex justify-center items-center h-[550px] w-full">
  <div className="w-full max-w-[420px]">
    <CardSwap delay={5000}>

      {/* Card 1: Frontend & Full Stack */}
      <Card>
        <div className="h-full flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden">
          <div className="h-48 w-full bg-zinc-100 overflow-hidden">
            <img
              src="https://res.cloudinary.com/ddgfjerss/image/upload/v1774202536/full-stack-development_ia56sp.png"
              alt="Dev"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between flex-grow">
            <div>
              <span className="text-emerald-600 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                01. Development
              </span>
              <h3 className="text-2xl font-black mt-2 text-black tracking-tight">
                Full Stack Engineering
              </h3>
            </div>
            <p className="text-zinc-500 text-xl leading-relaxed mt-4">
              Building web applications using <strong>React, Tailwind, Node.js</strong>, and integrating with REST APIs. I also experiment with responsive UI and interactive design.
            </p>
          </div>
        </div>
      </Card>

      {/* Card 2: Backend (Java + Spring Boot) */}
      <Card>
        <div className="h-full flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden">
          <div className="h-48 w-full bg-zinc-100 overflow-hidden">
            <img
              src="https://res.cloudinary.com/ddgfjerss/image/upload/v1774202456/java-software-engineer_xdqgw3.jpg"
              alt="Backend"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between flex-grow">
            <div>
              <span className="text-blue-600 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                02. Backend
              </span>
              <h3 className="text-2xl font-black mt-2 text-black tracking-tight">
                Java & Spring Boot
              </h3>
            </div>
            <p className="text-zinc-500 text-xl leading-relaxed mt-4">
              Learning <strong>Spring Boot</strong> to build RESTful APIs and microservices. Exploring <strong>OOP, MVC</strong>, and backend architecture for scalable systems.
            </p>
          </div>
        </div>
      </Card>

      {/* Card 3: Machine Learning */}
      <Card>
        <div className="h-full flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden">
          <div className="h-48 w-full bg-zinc-100 overflow-hidden">
            <img
              src="https://res.cloudinary.com/ddgfjerss/image/upload/v1774199684/datascience_tussaw.webp"
              alt="ML"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between flex-grow">
            <div>
              <span className="text-purple-600 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                03. AI / ML
              </span>
              <h3 className="text-2xl font-black mt-2 text-black tracking-tight">
                Machine Learning
              </h3>
            </div>
            <p className="text-zinc-500 text-xl leading-relaxed mt-4">
              Building ML pipelines with <strong>Python, Pandas, NumPy, and Scikit-learn</strong>. Trained models for predictions, sports assessment, and data-driven insights.
            </p>
          </div>
        </div>
      </Card>

      {/* Card 4: Projects & Systems */}
      <Card>
        <div className="h-full flex flex-col bg-white rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden">
          <div className="h-48 w-full bg-zinc-100 overflow-hidden">
            <img
              src="https://res.cloudinary.com/ddgfjerss/image/upload/v1774200106/Screenshot_2026-03-22_at_9.58.55_PM_gpxabg.png"
              alt="Projects"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between flex-grow">
            <div>
              <span className="text-rose-600 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                04. Projects
              </span>
              <h3 className="text-2xl font-black mt-2 text-black tracking-tight">
                Portfolio Builds
              </h3>
            </div>
            <p className="text-zinc-500 text-xl leading-relaxed mt-4">
              Developed personal projects including <strong>school platforms, medical reminder apps, and AI sports assessment</strong>. Focused on learning, experimenting, and applying real-world logic.
            </p>
          </div>
        </div>
      </Card>

    </CardSwap>
  </div>
</div>

      </div>
    </section>
  );
};

export default About;