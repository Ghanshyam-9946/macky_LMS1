import { useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useAuth } from "../context/AuthContext";

const CourseDetail = () => {
  const { id } = useParams();
  const { startedCourses, startCourse } = useAuth();

  const course = courses.find(c => c.id === Number(id));
  if (!course) return null;

  const isStarted = startedCourses.includes(course.id);
  const originalPrice =
    Number(course.price.replace(/[₹,]/g, "")) + 3000;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-[#0b1020] to-[#1a0f2e] text-gray-200 p-6">

      {/* LEFT IMAGE WITH BREATHING SPACE */}
      <div className="w-1/2 h-[calc(100vh-48px)] pr-4">
        <div className="h-full w-full rounded-3xl overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-1/2 pl-4 pr-2 overflow-y-auto">

        <Link
          to="/courses"
          className="text-purple-400 mb-4 inline-block"
        >
          ← Back to Courses
        </Link>

        <h1 className="text-2xl font-semibold mb-3">
          {course.title}
        </h1>

        {/* PRICE */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative text-gray-400">
            ₹{originalPrice}
            <span className="absolute left-0 top-1/2 w-full h-[2px] bg-red-500 rotate-[-10deg]" />
          </div>

          <span className="text-2xl font-bold text-purple-400">
            {course.price}
          </span>

          <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            OFFER
          </span>
        </div>

        {/* FACULTY */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-400">Faculty</p>
          <p className="font-medium">{course.faculty}</p>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
            <p className="text-lg font-semibold text-purple-400">
              {course.assignments.length}
            </p>
            <p className="text-xs text-gray-400">Assignments</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
            <p className="text-lg font-semibold text-purple-400">
              {course.projects.length}
            </p>
            <p className="text-xs text-gray-400">Projects</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
            <p className="text-lg font-semibold text-purple-400">
              {course.technology.length * 10}
            </p>
            <p className="text-xs text-gray-400">Videos</p>
          </div>
        </div>

        {/* TECHNOLOGIES */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold mb-2">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {course.technology.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ASSIGNMENTS + PROJECTS */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-1">Assignments</p>
            <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
              {course.assignments.slice(0, 3).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm font-semibold mb-1">Projects</p>
            <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
              {course.projects.slice(0, 3).map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* START BUTTON */}
        {!isStarted ? (
          <button
            onClick={() => startCourse(course.id)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:scale-105 transition"
          >
            Start Course
          </button>
        ) : (
          <div className="text-center text-yellow-400 font-semibold">
            Course In Progress
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
