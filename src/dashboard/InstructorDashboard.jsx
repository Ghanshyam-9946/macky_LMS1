import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import { courses } from "../data/courses";
import { students } from "../data/users";
import DashboardLayout from "../dashboard/DashboardLayout";

const InstructorDashboard = () => {
  const { user } = useAuth();
  const {
    enrollments,
    approveAssignment,
    approveMiniProject,
    approveFinalAssignment,
    approveFinalProject,
  } = useLMS();

  const [activeTab, setActiveTab] = useState("courses");

  const myEnrollments = enrollments.filter(
    (e) => e.instructorId === user.id
  );

  return (
    <DashboardLayout onNavSelect={setActiveTab}>
      <div className="space-y-8">
        <h1 className="text-2xl text-white font-semibold">
          Instructor Dashboard
        </h1>

        {myEnrollments.map((enroll, idx) => {
          const course = courses.find(c => c.id === enroll.courseId);
          const student = students.find(s => s.id === enroll.studentId);
          if (!course || !student) return null;

          return (
            <div
              key={idx}
              className="bg-[#121212] border border-white/10 rounded-xl p-6"
            >
              {/* HEADER */}
              <div className="mb-6">
                <h2 className="text-lg text-white">{course.title}</h2>
                <p className="text-white/60 text-sm">
                  Student: {student.name}
                </p>
                <p className="text-yellow-400 text-sm mt-1">
                  ⭐ Points: {enroll.totalPoints}
                </p>
              </div>

              {/* ================= PER VIDEO REVIEW ================= */}
              {activeTab === "courses" &&
                course.videos.map((video, index) => {
                  const prog = enroll.videoProgress[index];
                  const a = prog.assignment;
                  const p = prog.miniProject;

                  return (
                    <div
                      key={video.id}
                      className="bg-black/40 border border-white/10 rounded p-4 mb-4"
                    >
                      <h4 className="text-white mb-2">
                        {video.title}
                      </h4>

                      <p className={prog.videoCompleted ? "text-green-400" : "text-yellow-400"}>
                        🎥 Video: {prog.videoCompleted ? "Watched" : "Pending"}
                      </p>

                      {/* ASSIGNMENT */}
                      {a.submitted && !a.approved && (
                        <button
                          onClick={() =>
                            approveAssignment(enroll.studentId, course.id, index)
                          }
                          className="text-emerald-400 text-sm"
                        >
                          Approve Assignment
                        </button>
                      )}

                      {!a.submitted && (
                        <p className="text-yellow-400 text-sm">
                          📝 Assignment: Not Submitted
                        </p>
                      )}

                      {a.approved && (
                        <p className="text-green-400 text-sm">
                          📝 Assignment: Approved
                        </p>
                      )}

                      {/* MINI PROJECT */}
                      {p.submitted && !p.approved && (
                        <button
                          onClick={() =>
                            approveMiniProject(enroll.studentId, course.id, index)
                          }
                          className="text-purple-400 text-sm"
                        >
                          Approve Mini Project
                        </button>
                      )}

                      {!p.submitted && (
                        <p className="text-yellow-400 text-sm">
                          🛠 Mini Project: Not Submitted
                        </p>
                      )}

                      {p.approved && (
                        <p className="text-green-400 text-sm">
                          🛠 Mini Project: Approved
                        </p>
                      )}
                    </div>
                  );
                })}

              {/* ================= FINAL ASSIGNMENT ================= */}
              {activeTab === "assignments" && (
                <div className="border border-emerald-400/40 p-4 rounded">
                  <h3 className="text-emerald-400 mb-2">
                    ⭐ Final Assignment
                  </h3>

                  {!enroll.finalAssignment.submitted && (
                    <p className="text-yellow-400">
                      Student has not submitted yet
                    </p>
                  )}

                  {enroll.finalAssignment.submitted &&
                    !enroll.finalAssignment.approved && (
                      <>
                        <p className="text-yellow-400 mb-2">
                          Submitted — Waiting for approval
                        </p>
                        <button
                          onClick={() =>
                            approveFinalAssignment(enroll.studentId, course.id)
                          }
                          className="text-emerald-400"
                        >
                          Approve Final Assignment
                        </button>
                      </>
                    )}

                  {enroll.finalAssignment.approved && (
                    <p className="text-green-400">
                      ✔ Final Assignment Approved
                    </p>
                  )}
                </div>
              )}

              {/* ================= FINAL PROJECT ================= */}
              {activeTab === "projects" && (
                <div className="border border-yellow-400/40 p-4 rounded">
                  <h3 className="text-yellow-400 mb-2">
                    ⭐ Final Project
                  </h3>

                  {!enroll.finalProject.submitted && (
                    <p className="text-yellow-400">
                      Student has not submitted yet
                    </p>
                  )}

                  {enroll.finalProject.submitted &&
                    !enroll.finalProject.approved && (
                      <>
                        <p className="text-yellow-400 mb-2">
                          Submitted — Waiting for approval
                        </p>
                        <button
                          onClick={() =>
                            approveFinalProject(enroll.studentId, course.id)
                          }
                          className="text-yellow-400"
                        >
                          Approve Final Project
                        </button>
                      </>
                    )}

                  {enroll.finalProject.approved && (
                    <p className="text-green-400">
                      ✔ Final Project Approved
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default InstructorDashboard;
