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

      {/* LEFT – HERO / BRANDING */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-16 bg-gradient-to-br from-[#0F172A] via-[#020617] to-[#020617]">
        <h1 className="text-4xl font-bold text-white leading-tight mb-6">
          Learn Smarter.<br />
          Build Your Future.
        </h1>

        <p className="text-white/70 max-w-md mb-10">
          Access premium courses, expert instructors, structured learning paths
          and track your progress — all in one place.
        </p>

        <div className="flex gap-8">
          <div>
            <p className="text-2xl font-semibold text-white">8+</p>
            <p className="text-sm text-white/50">Courses</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">6+</p>
            <p className="text-sm text-white/50">Instructors</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">100%</p>
            <p className="text-sm text-white/50">Skill-Focused</p>
          </div>
        </div>
      </div>

      {/* RIGHT – LOGIN CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#020617] relative">

        {/* subtle glow */}
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
