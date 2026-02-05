import { useState } from "react";
import { useLMS } from "../context/LMSContext";
import { students, instructors } from "../data/users";

const AdminDashboard = () => {
  const {
    courses,
    enrollments,
    assignCourse,
  } = useLMS();

  const [studentId, setStudentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [message, setMessage] = useState("");

  const handleAssign = () => {
    if (!studentId || !courseId) {
      setMessage("⚠️ Please select both student and course");
      return;
    }

    const success = assignCourse(
      Number(studentId),
      Number(courseId)
    );

    if (!success) {
      setMessage("❌ This course is already assigned to the student");
    } else {
      setMessage("✅ Course assigned successfully");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0b1020] to-[#1a0f2e] text-gray-200 p-10">

      <h1 className="text-3xl font-semibold mb-8">
        Admin Dashboard
      </h1>

      {/* ASSIGN COURSE SECTION */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6">
          Assign Course to Student
        </h2>

        <div className="grid grid-cols-3 gap-6 mb-4">

          {/* STUDENT SELECT */}
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg p-3"
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} (ID: {s.id})
              </option>
            ))}
          </select>

          {/* COURSE SELECT WITH INSTRUCTOR NAME */}
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-lg p-3"
          >
            <option value="">Select Course</option>
            {courses.map((c) => {
              const instructor = instructors.find(
                (i) => i.id === c.instructorId
              );

              return (
                <option key={c.id} value={c.id}>
                  {c.title} — {instructor?.name}
                </option>
              );
            })}
          </select>

          {/* ASSIGN BUTTON */}
          <button
            onClick={handleAssign}
            className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-105 transition"
          >
            Assign Course
          </button>
        </div>

        {message && (
          <p className="text-sm text-yellow-400">
            {message}
          </p>
        )}
      </div>

      {/* ASSIGNMENT RECORDS */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">
          Course Assignment Records
        </h2>

        {enrollments.length === 0 ? (
          <p className="text-gray-400">
            No course assigned yet.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3">Student</th>
                <th className="p-3">Course</th>
                <th className="p-3">Instructor</th>
              </tr>
            </thead>

            <tbody>
              {enrollments.map((e, index) => {
                const student = students.find(
                  (s) => s.id === e.studentId
                );
                const course = courses.find(
                  (c) => c.id === e.courseId
                );
                const instructor = instructors.find(
                  (i) => i.id === e.instructorId
                );

                return (
                  <tr
                    key={index}
                    className="border-b border-white/5"
                  >
                    <td className="p-3">
                      {student?.name}
                    </td>
                    <td className="p-3">
                      {course?.title}
                    </td>
                    <td className="p-3">
                      {instructor?.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
