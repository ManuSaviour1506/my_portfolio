import { useEffect } from 'react';
import Lenis from 'lenis';

// Component Imports
import Navbar from "./components/Navbar"; 
import Hero from "./components/Hero";
import ProjectStack from "./components/ProjectStack"; 
import SkillSection from "./components/SkillSection";
import About from "./components/About"; 
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import PixelSnow from './components/PixelSnow'; 

function App() {
  // Smooth Scroll Initialization (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-emerald-400 selection:text-black antialiased">
      
      {/* 1. INTERACTIVE CURSOR */}
      <CustomCursor />
      
      {/* 2. ATMOSPHERIC LAYERS (Z-Index Managed) */}
      
      {/* LAYER 0: Ambient Background Glows (Deepest) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-500/5 blur-[140px] rounded-full" />
      </div>

      {/* LAYER 1: Background Grid Pattern */}
      <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* LAYER 2: PIXEL SNOW (Middle - Above Glows, Below Content) */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden h-screen w-screen">
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.006}
          minFlakeSize={1.25}
          pixelResolution={500}
          speed={0.4}
          density={0.6}
          direction={125}
          brightness={0.4}
          variant="square"
        />
      </div>

      {/* LAYER 3: High-end Subtle Grain Overlay (On top of everything) */}
      <div className="fixed inset-0 z-[100] opacity-[0.03] pointer-events-none bg-[url('https://res.cloudinary.com/dwwre7as3/image/upload/v1706110825/noise_v3f1xv.png')]" />

      {/* 3. NAVIGATION (Fixed z-index to stay on top) */}
      <Navbar />

      {/* 4. MAIN PAGE CONTENT (z-index: 10) */}
      <main className="relative z-10 bg-transparent">
        
        {/* HERO SECTION */}
        <section id="home" className="bg-transparent">
          <Hero />
        </section>

        {/* WORK: Stacking Project Cards */}
        <section id="work" className="relative bg-transparent">
          <ProjectStack />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="relative border-y border-zinc-900/50 bg-transparent">
          <SkillSection />
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-transparent">
           <About />
        </section>

        {/* CONTACT & FOOTER */}
        <section id="contact" className="relative bg-transparent">
          <Contact />
        </section>
        
        <Footer />
      </main>

    </div>
  );
}

export default App;