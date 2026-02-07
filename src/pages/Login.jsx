import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ❌ LOGIC NOT TOUCHED
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      navigate(`/${user.role}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">

      {/* ================= LEFT – HERO / BRANDING ================= */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">

        {/* TECH IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1518770660439-4636190af475)",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617]/95 to-black" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <h1 className="text-5xl font-bold tracking-wide mb-6">
            <span className="text-red-500">MACKY</span>
            <span className="text-white"> LMS</span>
          </h1>

          <p className="text-white/70 text-lg max-w-md leading-relaxed">
            A modern learning platform to manage courses,
            assignments, projects and real-time progress —
            all in one place.
          </p>

          <div className="mt-10 flex gap-6 text-sm text-white/60">
            <span>• Secure Login</span>
            <span>• Role Based Access</span>
            <span>• Real-time Tracking</span>
          </div>
        </div>
      </div>

      {/* ================= RIGHT – LOGIN CARD ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#020617] relative">

        {/* subtle glow (same as before) */}
        <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[140px]" />

        <form
          onSubmit={handleSubmit}
          className="
            relative z-10
            w-[420px]
            bg-[#020617]
            border border-white/10
            rounded-2xl
            px-10 py-10
          "
        >
          {/* LOGO / TITLE */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">
              MACKY
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Login to your learning dashboard
            </p>
          </div>

          {/* USERNAME */}
          <div className="mb-5">
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full
                px-4 py-3
                rounded-lg
                bg-[#0F172A]
                border border-white/10
                text-white/80
                outline-none
                focus:border-blue-500/50
              "
              placeholder="Enter your username"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full
                px-4 py-3
                rounded-lg
                bg-[#0F172A]
                border border-white/10
                text-white/80
                outline-none
                focus:border-blue-500/50
              "
              placeholder="Enter your password"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-sm text-red-400 mb-4">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-lg
              bg-gradient-to-r from-blue-500 to-cyan-400
              text-black
              font-semibold
              tracking-wide
              hover:opacity-90
              transition
            "
          >
            Login
          </button>

          {/* FOOTER */}
          <p className="mt-6 text-xs text-center text-white/40">
            © 2026 MACKY LMS
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
