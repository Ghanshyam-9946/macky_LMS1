import DashboardLayout from "../dashboard/DashboardLayout";
import { courses } from "../data/courses"; // ✅ CORRECT SOURCE
import { students, instructors } from "../data/users";
import { useLMS } from "../context/LMSContext";

const AdminDashboard = () => {
  const { enrollments, assignCourse } = useLMS();

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <h1 className="text-2xl font-semibold text-white">
          Admin Dashboard
        </h1>

        {/* ================= COURSES ================= */}
        {courses.map((course) => {
          const instructor = instructors.find(
            (i) => i.id === course.instructorId
          );

          return (
            <div
              key={course.id}
              className="bg-[#1e1e1e] border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-lg text-white mb-1">
                {course.title}
              </h2>

              <p className="text-white/50 text-sm mb-4">
                Instructor: {instructor?.name || "N/A"}
              </p>

              {/* ===== COURSE CONTENT INFO ===== */}
              <div className="text-sm text-white/60 mb-4 space-y-1">
                <p>Videos: {course.videos?.length || 0}</p>
                <p>Assignments: {course.assignments?.length || 0}</p>
                <p>Projects: {course.projects?.length || 0}</p>
              </div>

              {/* ================= ASSIGN COURSE ================= */}
              <div className="flex gap-3 flex-wrap">
                {students.map((student) => {
                  const alreadyAssigned = enrollments.some(
                    (e) =>
                      e.studentId === student.id &&
                      e.courseId === course.id
                  );

                  return (
                    <button
                      key={student.id}
                      disabled={alreadyAssigned}
                      onClick={() =>
                        assignCourse(student.id, course.id)
                      }
                      className={`
                        px-4 py-2 text-sm rounded transition
                        ${
                          alreadyAssigned
                            ? "bg-gray-600/40 text-white/40 cursor-not-allowed"
                            : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                        }
                      `}
                    >
                      {alreadyAssigned
                        ? `Assigned to ${student.name}`
                        : `Assign to ${student.name}`}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
