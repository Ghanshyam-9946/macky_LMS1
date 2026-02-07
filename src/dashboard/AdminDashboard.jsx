import DashboardLayout from "../dashboard/DashboardLayout";
import { courses } from "../data/courses";
import { students, instructors } from "../data/users";
import { useLMS } from "../context/LMSContext";
// REMOVED: import { Users, Film, FileCode, CheckCircle, PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const { enrollments, assignCourse } = useLMS();

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Course Administration
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage content, instructors, and student access permissions.
            </p>
          </div>
          <div className="bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-lg">
            <span className="text-blue-400 font-mono font-bold text-lg">
              {courses.length}
            </span>
            <span className="text-blue-400/60 text-xs ml-2 uppercase tracking-wider">
              Active Courses
            </span>
          </div>
        </div>

        {/* ================= COURSE ROWS ================= */}
        <div className="flex flex-col gap-6">
          {courses.map((course) => {
            const instructor = instructors.find(
              (i) => i.id === course.instructorId
            );

            // Calculate stats
            const enrolledCount = students.filter((s) =>
              enrollments.some((e) => e.studentId === s.id && e.courseId === course.id)
            ).length;

            return (
              <div
                key={course.id}
                className="group relative flex flex-col lg:flex-row bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-gray-700 transition-all duration-300"
              >
                {/* --- 1. VISUAL IDENTIFIER (Image & Instructor) --- */}
                <div className="lg:w-72 relative h-48 lg:h-auto shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent z-10" />
                  <img
                    src={`https://placehold.co/600x400/1e293b/FFF?text=${encodeURIComponent(
                      course.title.substring(0, 15)
                    )}`}
                    alt="Course Cover"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center text-white font-bold shadow-lg">
                      {instructor?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        Instructor
                      </p>
                      <p className="text-sm font-semibold text-white leading-none">
                        {instructor?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* --- 2. MAIN CONTENT (Title & Stats) --- */}
                <div className="flex-1 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-800 bg-[#111827]">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                      Comprehensive curriculum covering all aspects of {course.title}.
                      Includes video lectures, hands-on projects, and graded assignments.
                    </p>
                  </div>

                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800/50 border border-gray-700 text-xs text-gray-300">
                      🎥 {course.videos?.length} Modules
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800/50 border border-gray-700 text-xs text-gray-300">
                      📝 {course.assignments?.length} Assignments
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-800/50 border border-gray-700 text-xs text-gray-300">
                      👥 {enrolledCount} Enrolled
                    </span>
                  </div>
                </div>

                {/* --- 3. ROSTER MANAGEMENT (Right Panel) --- */}
                <div className="lg:w-80 bg-[#0f172a] p-5 flex flex-col border-l border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Access Control
                    </h3>
                  </div>

                  {/* Scrollable Student List */}
                  <div className="flex-1 overflow-y-auto max-h-[200px] pr-2 space-y-2 custom-scrollbar">
                    {students.map((student) => {
                      const isEnrolled = enrollments.some(
                        (e) => e.studentId === student.id && e.courseId === course.id
                      );

                      return (
                        <button
                          key={student.id}
                          onClick={() => assignCourse(student.id, course.id)}
                          disabled={isEnrolled}
                          className={`w-full group/btn flex items-center justify-between p-2 rounded-lg text-sm border transition-all duration-200 ${
                            isEnrolled
                              ? "bg-green-900/10 border-green-900/20 cursor-default"
                              : "bg-gray-800/40 border-transparent hover:bg-gray-800 hover:border-gray-600 active:scale-95"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                isEnrolled ? "bg-green-500" : "bg-gray-600"
                              }`}
                            />
                            <span
                              className={
                                isEnrolled
                                  ? "text-green-100/80"
                                  : "text-gray-400 group-hover/btn:text-white"
                              }
                            >
                              {student.name}
                            </span>
                          </div>

                          {isEnrolled ? (
                            <span className="text-green-500">✔</span>
                          ) : (
                            <span className="text-gray-500 group-hover/btn:text-blue-400">
                              +
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;