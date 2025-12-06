import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/home.jsx";
import Repository from "./pages/repository.jsx";
import AuthLogin from "./pages/authlogin.jsx";
import AuthRegister from "./pages/authregister.jsx";
import Plagiarism from "./pages/Plagiarism.jsx";
import DashboardFaculty from "./pages/DashboardFaculty.jsx";
import DashboardStudent from "./pages/DashboardStudent.jsx";
import DashboardAdmin from "./pages/DashboardAdmin.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repository" element={<Repository />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/plagiarism" element={<Plagiarism />} />
        <Route path="/dashboard/student" element={<DashboardStudent />} />
        <Route path="/dashboard/faculty" element={<DashboardFaculty />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
