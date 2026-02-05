import { Link } from "react-router-dom";
import { courses } from "../data/courses";
import { useAuth } from "../context/AuthContext";

const Courses = () => {
  const { startedCourses, startCourse } = useAuth();

  const handleStart = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    startCourse(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b1020] to-[#1a0f2e] text-gray-200 p-10">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-semibold">
          Courses
        </h1>

        {/* BACK TO DASHBOARD */}
        <Link
          to="/student/dashboard"
          className="px-6 py-2 rounded-xl bg-white/10 border border-white/10 text-gray-200 hover:bg-white/20 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* COURSES GRID */}
      <div className="grid grid-cols-4 gap-8">
        {courses.map((course) => {
          const isStarted = startedCourses.includes(course.id);

          return (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className={`relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition hover:scale-[1.02] hover:shadow-purple-500/30 ${
                isStarted ? "opacity-60" : ""
              }`}
            >
              {/* Image */}
              <img
                src={course.image}
                alt={course.title}
                className="h-40 w-full object-cover"
              />

              {/* IN PROGRESS OVERLAY */}
              {isStarted && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-semibold">
                    IN PROGRESS
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-purple-400 mb-4">
                  {course.price}
                </p>

                {/* START BUTTON */}
                {!isStarted && (
                  <button
                    onClick={(e) =>
                      handleStart(e, course.id)
                    }
                    className="w-full py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition"
                  >
                    Start
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
