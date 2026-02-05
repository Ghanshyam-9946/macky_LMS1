import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";

const InstructorDashboard = () => {
  const { user } = useAuth();
  const { enrollments, courses, students } = useLMS();

  const instructorId = user.id;
  const myEnrollments = enrollments.filter(
    e => e.instructorId === instructorId
  );

  return (
    <div className="min-h-screen bg-[#0b1020] text-gray-200 p-10">
      <h1 className="text-3xl font-semibold mb-8">
        Instructor Dashboard
      </h1>

      {myEnrollments.map((e, index) => {
        const student = students.find(
          s => s.id === e.studentId
        );
        const course = courses.find(
          c => c.id === e.courseId
        );

        return (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
          >
            <h2 className="text-xl mb-2">
              {course.title}
            </h2>

            <p className="mb-2">
              Student: {student.name}
            </p>

            <p>
              Videos Completed:{" "}
              {
                e.videos.filter(v => v.completed)
                  .length
              } / {e.videos.length}
            </p>

            <p>Total Points: {e.totalPoints}</p>

            <p>
              Assignment:{" "}
              {e.assignmentCompleted
                ? "Completed"
                : "Pending"}
            </p>

            <p>
              Project:{" "}
              {e.projectCompleted
                ? "Completed"
                : "Pending"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default InstructorDashboard;
