import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children, onNavSelect = () => {} }) => {
  const { user, logout } = useAuth();
  const [active, setActive] = useState("courses"); // ✅ default

  const handleSelect = (key) => {
    setActive(key);
    onNavSelect(key);
  };

  const isStudent = user?.role === "student";

  return (
    <div className="min-h-screen flex bg-[#0f0f0f] text-white">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#121212] border-r border-white/10 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-xl font-semibold">MACKY</h1>
          <p className="text-xs text-white/40">
            Learning Management System
          </p>
        </div>

        {isStudent && (
          <nav className="space-y-2 text-sm">
            <SidebarItem
              label="My Courses"
              active={active === "courses"}
              onClick={() => handleSelect("courses")}
            />
            <SidebarItem
              label="Assignments"
              active={active === "assignments"}
              onClick={() => handleSelect("assignments")}
            />
            <SidebarItem
              label="Projects"
              active={active === "projects"}
              onClick={() => handleSelect("projects")}
            />
          </nav>
        )}

        <div className="flex-1" />

        <button
          onClick={logout}
          className="text-left text-red-400 hover:bg-red-500/10 px-3 py-2 rounded text-sm"
        >
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const SidebarItem = ({ label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`px-4 py-2 rounded cursor-pointer transition
      ${
        active
          ? "bg-blue-500/20 text-blue-400"
          : "text-white/60 hover:text-white hover:bg-white/5"
      }`}
  >
    {label}
  </div>
);

export default DashboardLayout;
