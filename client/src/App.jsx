import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects"; // Your public Projects page
import Certifications from "./pages/Certifications"; // Your public Certifications page
import Contact from "./pages/Contact";
import Skills from "./pages/Skills";
import Footer from "./components/Footer";

// --- IMPORTS FOR ALL PAGES (INCLUDING ADMIN) ---
// Ensure each component is imported only ONCE
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageCertifications from "./pages/admin/ManageCertifications";


function App() {
  return (
    <Router>
      {/*
        Outer wrapper div to ensure the entire page background is #e0e0e0.
        flex flex-col min-h-screen for sticky footer layout.
      */}
      <div className="flex flex-col min-h-screen bg-[#e0e0e0]">
        <Navbar />
        <main className="flex-grow">
          {/* ALL Route components MUST be children of <Routes> */}
          <Routes>
            {/* Public Routes - These are accessible to everyone */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/skills" element={<Skills />} />

            {/* --- ADMIN ROUTES --- */}
            {/* Admin Login page */}
            <Route path="/admin" element={<AdminLogin />} />
            {/* Admin Dashboard - This is the entry point after logging in */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Page to manage (add, edit, delete) projects */}
            <Route path="/admin/projects" element={<ManageProjects />} />
            {/* Page to manage (add, edit, delete) certifications */}
            <Route path="/admin/certifications" element={<ManageCertifications />} />

            {/* You might want to add a catch-all route for 404 pages here, e.g.: */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;