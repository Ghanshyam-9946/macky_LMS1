import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const {
    courses,
    enrollments,
    completeVideo,
    completeAssignment,
    completeProject,
  } = useLMS();

  const studentId = user.id;
  const myEnrollments = enrollments.filter(
    e => e.studentId === studentId
  );

  return (
    <div className="min-h-screen bg-[#0b1020] text-gray-200 p-10">
      <h1 className="text-3xl font-semibold mb-8">
        Student Dashboard
      </h1>

      {myEnrollments.map(e => {
        const course = courses.find(c => c.id === e.courseId);

        return (
          <div
            key={course.id}
            className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl mb-4">
              {course.title}
            </h2>

            {/* VIDEOS */}
            <h3 className="font-semibold mb-2">
              Videos
            </h3>

            {e.videos.map((v, i) => (
              <div
                key={i}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {v.title}
                </span>

                {v.completed ? (
                  <span className="text-green-400">
                    Completed (+10 pts)
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      completeVideo(
                        studentId,
                        course.id,
                        i
                      )
                    }
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded"
                  >
                    Submit Video
                  </button>
                )}
              </div>
            ))}

            <p className="mt-3 text-yellow-400">
              Total Points: {e.totalPoints}
            </p>

            {/* ASSIGNMENT */}
            <div className="mt-5">
              {!e.assignmentCompleted ? (
                <button
                  onClick={() =>
                    completeAssignment(
                      studentId,
                      course.id
                    )
                  }
                  className="px-4 py-2 bg-green-500/20 text-green-400 rounded"
                >
                  Submit Assignment
                </button>
              ) : (
                <p className="text-green-400">
                  Assignment Completed
                </p>
              )}
            </div>

            {/* PROJECT */}
            <div className="mt-3">
              {!e.projectCompleted ? (
                <button
                  onClick={() =>
                    completeProject(
                      studentId,
                      course.id
                    )
                  }
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded"
                >
                  Complete Project
                </button>
              ) : (
                <p className="text-purple-400">
                  Project Completed
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentDashboard;
