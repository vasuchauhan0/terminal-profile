import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FrontendLayout from "./Layout/FrontendLayout";
import AdminLayout from "./Layout/AdminLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserProtectedRoute from "./Components/UserProtectedRoute";

// Frontend Pages
import Homepage from "./Page/homepage";
import Skill from "./Page/Skill";
import Contact from "./Page/Contact";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Project from "./Page/Project";
import NotFound from "./Page/NotFound";
import UserProfile from "./Page/UserProfile";

// Admin Pages
import Dashboard from "./admin/Dashboard";
import ManageMessagesPage from "./admin/Messages";
import Projects from "./admin/Project_management";
import AdminSkills from "./admin/Skills_management";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>

        {/* ================= PUBLIC ROUTES (Only Homepage) ================= */}
        <Route element={<FrontendLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        {/* ================= AUTH ROUTES (NO HEADER / FOOTER) ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= PROTECTED USER ROUTES (Must be logged in) ================= */}
        <Route element={<UserProtectedRoute />}>
          <Route element={<FrontendLayout />}>
            <Route path="/project" element={<Project />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* ================= PROTECTED ADMIN ROUTES (Must be admin) ================= */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects_management" element={<Projects />} />
            <Route path="messages" element={<ManageMessagesPage />} />
            <Route path="skills" element={<AdminSkills />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
};

export default App;