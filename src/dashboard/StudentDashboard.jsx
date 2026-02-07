import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import { courses } from "../data/courses";
import DashboardLayout from "../dashboard/DashboardLayout";

// --- AESTHETIC BUTTON STYLES ---
const btnBase = "w-full py-2.5 px-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 transform active:scale-95 shadow-lg flex items-center justify-center gap-2";

const btnStyles = {
  primary: `${btnBase} bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hover:shadow-blue-500/25 hover:-translate-y-1`,
  success: `${btnBase} bg-gradient-to-r from-emerald-500 to-green-600 text-white cursor-default border border-green-400/20`,
  locked: `${btnBase} bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700`,
  action: `${btnBase} bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white hover:shadow-fuchsia-500/25 hover:-translate-y-1`,
  pending: `${btnBase} bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 cursor-wait`,
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const {
    enrollments,
    completeVideo,
    submitAssignment,
    submitMiniProject,
    submitFinalAssignment,
    submitFinalProject,
  } = useLMS();

  const [activeTab, setActiveTab] = useState("courses");
  const [activeVideo, setActiveVideo] = useState(null);

  const myEnrollments = enrollments.filter((e) => e.studentId === user.id);

  return (
    <DashboardLayout onNavSelect={setActiveTab}>
      <div className="space-y-12 pb-12">
        {myEnrollments.map((enroll) => {
          const course = courses.find((c) => c.id === enroll.courseId);
          if (!course) return null;

          const vp = enroll.videoProgress;
          const allAssignmentsApproved = vp.every((v) => v.assignment.approved);
          const allProjectsApproved = vp.every((v) => v.miniProject.approved);

          return (
            <div key={course.id} className="animate-fade-in-up">
              {/* Course Header */}
              <div className="mb-8 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {course.title}
                  </h2>
                  <p className="text-gray-400 mt-1 text-sm">Continue your learning journey</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full text-yellow-400 font-bold shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  ⭐ {enroll.totalPoints} Points
                </div>
              </div>

              {/* ================= VIDEOS (Square Cards Grid) ================= */}
              {activeTab === "courses" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {course.videos.map((video, index) => {
                    const prog = vp[index];
                    const unlocked = index === 0 || vp[index - 1].videoCompleted;

                    return (
                      <div
                        key={video.id}
                        className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                          unlocked
                            ? "bg-[#1e293b]/60 border-white/10 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2"
                            : "bg-gray-900/40 border-white/5 opacity-60 grayscale"
                        }`}
                      >
                        {/* Card Image Area (Video Thumbnail) */}
                        <div
                          onClick={() => unlocked && setActiveVideo(video)}
                          className={`relative aspect-video w-full overflow-hidden bg-black ${
                            unlocked ? "cursor-pointer" : "cursor-not-allowed"
                          }`}
                        >
                          <iframe
                            src={video.url}
                            className="w-full h-full object-cover pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                            title={video.title}
                          />
                          {/* Overlay Icons */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                             {!unlocked && <span className="text-4xl">🔒</span>}
                             {unlocked && <span className="text-4xl opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">▶️</span>}
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-5 flex flex-col gap-4">
                          <h3 className="text-lg font-bold text-white leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                            {index + 1}. {video.title}
                          </h3>

                          {/* Action Button */}
                          <div className="mt-auto">
                            {!unlocked ? (
                              <button className={btnStyles.locked}>
                                🔒 Locked
                              </button>
                            ) : (
                              <button
                                onClick={() => completeVideo(user.id, course.id, index)}
                                disabled={prog.videoCompleted}
                                className={prog.videoCompleted ? btnStyles.success : btnStyles.primary}
                              >
                                {prog.videoCompleted ? "✔ Completed" : "Mark as Watched"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ================= ASSIGNMENTS (Task Cards) ================= */}
              {activeTab === "assignments" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.videos.map((video, index) => {
                    const a = vp[index].assignment;
                    const unlocked = vp[index].videoCompleted;

                    return (
                      <div
                        key={video.id}
                        className="bg-[#1e293b]/40 backdrop-blur border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:bg-[#1e293b]/60 transition-colors"
                      >
                        <div className="mb-4">
                          <span className="text-xs font-mono text-gray-500 mb-1 block">ASSIGNMENT #{index + 1}</span>
                          <h4 className="text-xl font-bold text-white">{video.title}</h4>
                        </div>

                        <div>
                          {!unlocked && (
                            <button className={btnStyles.locked}>🔒 Watch Video First</button>
                          )}
                          {unlocked && !a.submitted && (
                            <button
                              onClick={() => submitAssignment(user.id, course.id, index)}
                              className={btnStyles.action}
                            >
                               Submit Assignment
                            </button>
                          )}
                          {a.submitted && !a.approved && (
                            <button className={btnStyles.pending}> Pending Review</button>
                          )}
                          {a.approved && (
                            <button className={btnStyles.success}>✔ Approved</button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Final Assignment Card */}
                  <div className="col-span-1 md:col-span-2 mt-4 p-8 rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 border border-emerald-500/30 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all"></div>
                     <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                           <h3 className="text-2xl font-bold text-emerald-400">Final Assignment</h3>
                           <p className="text-gray-400 text-sm">Complete this to master the course.</p>
                        </div>
                        <div className="w-full md:w-auto md:min-w-[200px]">
                            {!allAssignmentsApproved && (
                                <button className={btnStyles.locked}>🔒 Locked</button>
                            )}
                            {allAssignmentsApproved && !enroll.finalAssignment.submitted && (
                                <button onClick={() => submitFinalAssignment(user.id, course.id)} className={btnStyles.action}>
                                    Submit Final Work
                                </button>
                            )}
                            {enroll.finalAssignment.submitted && !enroll.finalAssignment.approved && (
                                <button className={btnStyles.pending}> Under Review</button>
                            )}
                            {enroll.finalAssignment.approved && (
                                <button className={btnStyles.success}> Certified</button>
                            )}
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* ================= PROJECTS (Task Cards) ================= */}
              {activeTab === "projects" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {course.videos.map((video, index) => {
                    const p = vp[index].miniProject;
                    const unlocked = vp[index].videoCompleted;

                    return (
                      <div
                        key={video.id}
                        className="bg-[#1e293b]/40 backdrop-blur border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:bg-[#1e293b]/60 transition-colors"
                      >
                         <div className="mb-4">
                          <span className="text-xs font-mono text-gray-500 mb-1 block">MINI PROJECT #{index + 1}</span>
                          <h4 className="text-xl font-bold text-white">{video.title}</h4>
                        </div>

                        <div>
                          {!unlocked && (
                            <button className={btnStyles.locked}> Watch Video First</button>
                          )}
                          {unlocked && !p.submitted && (
                            <button
                              onClick={() => submitMiniProject(user.id, course.id, index)}
                              className={`${btnStyles.action} bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500`}
                            >
                               Submit Project
                            </button>
                          )}
                          {p.submitted && !p.approved && (
                            <button className={btnStyles.pending}> Pending Review</button>
                          )}
                          {p.approved && (
                            <button className={btnStyles.success}>✔ Approved</button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                   {/* Final Project Card */}
                   <div className="col-span-1 md:col-span-2 mt-4 p-8 rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 border border-yellow-500/30 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] group-hover:bg-yellow-500/20 transition-all"></div>
                     <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                           <h3 className="text-2xl font-bold text-yellow-400">Capstone Project</h3>
                           <p className="text-gray-400 text-sm">The final challenge. Prove your skills.</p>
                        </div>
                        <div className="w-full md:w-auto md:min-w-[200px]">
                            {!allProjectsApproved && (
                                <button className={btnStyles.locked}>🔒 Locked</button>
                            )}
                            {allProjectsApproved && !enroll.finalProject.submitted && (
                                <button onClick={() => submitFinalProject(user.id, course.id)} className={`${btnStyles.action} bg-gradient-to-r from-amber-500 to-orange-600`}>
                                    Submit Capstone
                                </button>
                            )}
                            {enroll.finalProject.submitted && !enroll.finalProject.approved && (
                                <button className={btnStyles.pending}> Under Review</button>
                            )}
                            {enroll.finalProject.approved && (
                                <button className={btnStyles.success}> Certified</button>
                            )}
                        </div>
                     </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Video Player Modal (Simple & Dark) */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-red-500 text-white p-2 rounded-full transition-colors backdrop-blur-md"
              >
                ✕
              </button>
              <div className="aspect-video">
                 <iframe src={activeVideo.url} className="w-full h-full" allowFullScreen title="Player" />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;