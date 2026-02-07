import React from "react";
import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import { courses } from "../data/courses";
import { students } from "../data/users";
import DashboardLayout from "../dashboard/DashboardLayout";

// Updated Button Style
const btn =
  "px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2";

const InstructorDashboard = () => {
  const { user } = useAuth();
  const {
    enrollments,
    approveAssignment,
    approveMiniProject,
    approveFinalAssignment,
    approveFinalProject,
  } = useLMS();

  const myEnrollments = enrollments.filter(
    (e) => e.instructorId === user.id
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <h1 className="text-3xl font-bold text-white mb-6">Instructor Review Dashboard</h1>

        {myEnrollments.length === 0 && (
           <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-dashed border-gray-700">
             <p className="text-gray-400">No active enrollments to review.</p>
           </div>
        )}

        {myEnrollments.map((enroll) => {
          const course = courses.find((c) => c.id === enroll.courseId);
          const student = students.find((s) => s.id === enroll.studentId);
          if (!course || !student) return null;

          return (
            <div
              key={`${enroll.studentId}-${enroll.courseId}`}
              className="bg-[#1e293b]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] -z-10" />

              <div className="border-b border-white/10 pb-4 mb-4 flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                    {course.title}
                    </h2>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-gray-300">Student: {student.name}</span>
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-yellow-400 font-bold text-xl block">{enroll.totalPoints}</span>
                    <span className="text-xs text-gray-500 uppercase">Total Points</span>
                </div>
              </div>

              {/* === VIDEO MODULES REVIEW === */}
              <div className="space-y-3 mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Module Submissions</h3>
                {course.videos.map((video, index) => {
                  const prog = enroll.videoProgress[index];
                  // Check if action is needed
                  const needsAction = (prog.assignment.submitted && !prog.assignment.approved) || (prog.miniProject.submitted && !prog.miniProject.approved);

                  return (
                    <div
                      key={video.id}
                      className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                          needsAction 
                          ? "bg-blue-900/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                          : "bg-gray-900/40 border-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                          <span className={`text-sm font-mono ${needsAction ? "text-blue-400" : "text-gray-600"}`}>#{index + 1}</span>
                          <p className="text-gray-200 font-medium">{video.title}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {/* Assignment Status */}
                        {prog.assignment.submitted && !prog.assignment.approved ? (
                          <button
                            onClick={() => approveAssignment(enroll.studentId, enroll.courseId, index)}
                            className={`${btn} bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20`}
                          >
                            📝 Approve Assignment
                          </button>
                        ) : prog.assignment.approved ? (
                            <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20 flex items-center">
                                ✓ Assignment Done
                            </span>
                        ) : (
                            <span className="text-xs px-3 py-1 text-gray-600 italic">No Assignment</span>
                        )}

                        {/* Mini Project Status */}
                        {prog.miniProject.submitted && !prog.miniProject.approved ? (
                          <button
                            onClick={() => approveMiniProject(enroll.studentId, enroll.courseId, index)}
                            className={`${btn} bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20`}
                          >
                            💻 Approve Project
                          </button>
                        ) : prog.miniProject.approved ? (
                            <span className="text-xs px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full border border-purple-500/20 flex items-center">
                                ✓ Project Done
                            </span>
                        ) : (
                            <span className="text-xs px-3 py-1 text-gray-600 italic">No Project</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* === FINAL ASSESSMENTS REVIEW (Always Visible now) === */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                
                {/* Final Assignment Card */}
                <div className={`p-5 rounded-xl border flex flex-col justify-between h-full ${
                    enroll.finalAssignment.submitted && !enroll.finalAssignment.approved
                    ? "bg-blue-900/10 border-blue-500/30"
                    : "bg-gray-900/30 border-white/5"
                }`}>
                    <div>
                        <h4 className="text-blue-400 font-bold mb-1">Final Assignment</h4>
                        <p className="text-xs text-gray-500 mb-4">Written Assessment</p>
                    </div>
                    
                    {enroll.finalAssignment.submitted && !enroll.finalAssignment.approved ? (
                         <button
                            onClick={() => approveFinalAssignment(enroll.studentId, enroll.courseId)}
                            className={`${btn} w-full justify-center bg-blue-600 hover:bg-blue-500 text-white`}
                         >
                           📄 Approve Submission
                         </button>
                    ) : enroll.finalAssignment.approved ? (
                        <div className="text-center py-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 text-sm font-bold">
                            ✓ Approved
                        </div>
                    ) : (
                        <div className="text-center py-2 bg-white/5 text-gray-500 rounded-lg text-sm italic">
                            Waiting for Student...
                        </div>
                    )}
                </div>

                {/* Final Project Card */}
                <div className={`p-5 rounded-xl border flex flex-col justify-between h-full ${
                    enroll.finalProject.submitted && !enroll.finalProject.approved
                    ? "bg-orange-900/10 border-orange-500/30"
                    : "bg-gray-900/30 border-white/5"
                }`}>
                    <div>
                        <h4 className="text-orange-400 font-bold mb-1">Capstone Project</h4>
                        <p className="text-xs text-gray-500 mb-4">Final Practical Exam</p>
                    </div>

                    {enroll.finalProject.submitted && !enroll.finalProject.approved ? (
                         <button
                            onClick={() => approveFinalProject(enroll.studentId, enroll.courseId)}
                            className={`${btn} w-full justify-center bg-orange-600 hover:bg-orange-500 text-white`}
                         >
                           🎓 Approve Capstone
                         </button>
                    ) : enroll.finalProject.approved ? (
                        <div className="text-center py-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 text-sm font-bold">
                            ✓ Approved
                        </div>
                    ) : (
                        <div className="text-center py-2 bg-white/5 text-gray-500 rounded-lg text-sm italic">
                            Waiting for Student...
                        </div>
                    )}
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default InstructorDashboard;