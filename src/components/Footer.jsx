import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-24 px-6 border-t border-zinc-900 bg-[#050505] overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">

        {/* 🔥 CTA SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
        <div>
  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
    Let’s build something <br />
    <span className="text-emerald-400">meaningful.</span>
  </h2>

  <p className="text-zinc-500 mt-4 max-w-md">
    Available for roles and collaborations in full-stack and AI-driven development.
  </p>
</div>

          <a
            href="mailto:manusaviour5@gmail.com"
            className="group flex items-center gap-3 px-6 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition"
          >
            Contact Me
            <ArrowUpRight size={16} className="group-hover:translate-x-1 -translate-y-1 transition" />
          </a>
        </div>

        {/* 🔗 LINKS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Manu<span className="text-emerald-400">.</span>
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Full Stack Developer building scalable systems and AI-powered solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase text-zinc-500 mb-4 tracking-widest">Navigation</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#home" className="hover:text-white">Home</a></li>
              <li><a href="#work" className="hover:text-white">Projects</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-xs uppercase text-zinc-500 mb-4 tracking-widest">Projects</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="https://aisportsassessment.vercel.app/" target="_blank" className="hover:text-white">Khel Pratibha</a></li>
              <li><a href="https://mamathaschool.vercel.app/" target="_blank" className="hover:text-white">Mamatha School</a></li>
              <li><a href="https://medease-psi.vercel.app/login" target="_blank" className="hover:text-white">Medease</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase text-zinc-500 mb-4 tracking-widest">Connect</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a href="https://github.com/ManuSaviour1506" target="_blank" className="flex items-center gap-2 hover:text-white">
                  <Github size={14} /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/manu-saviour-36a08429a/" target="_blank" className="flex items-center gap-2 hover:text-white">
                  <Linkedin size={14} /> LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:yourmail@gmail.com" className="flex items-center gap-2 hover:text-white">
                  <Mail size={14} /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 🧠 BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-zinc-900 pt-6">
          
          <span className="text-xs text-zinc-600 font-mono">
            © {currentYear} Manu Saviour — Built with precision & passion
          </span>

          <div className="flex items-center gap-4 text-xs text-zinc-600 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Available for opportunities
            </span>
            <span>|</span>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;