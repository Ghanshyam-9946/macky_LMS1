import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { courses } from "../data/courses";

const MyCourses = () => {
  const { startedCourses } = useAuth();

  const myCourses = courses.filter(course =>
    startedCourses.includes(course.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b1020] to-[#1a0f2e] text-gray-200 p-10">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">
          My Courses
        </h1>

        <Link
          to="/student/dashboard"
          className="px-6 py-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {myCourses.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-gray-400">
          You have not started any course yet.
          <Link
            to="/courses"
            className="text-purple-400 ml-2"
          >
            Browse courses →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {myCourses.map(course => (
            <Link
              key={course.id}
              to={`/course/${course.id}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-4
              hover:shadow-purple-500/20 transition"
            >
              <img
                src={course.image}
                alt={course.title}
                className="h-36 w-full object-cover rounded-xl mb-4"
              />

              <h4 className="font-semibold">
                {course.title}
              </h4>

              <p className="text-sm text-yellow-400">
                In Progress
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
