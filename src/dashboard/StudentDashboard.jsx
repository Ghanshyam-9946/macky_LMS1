import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLMS } from "../context/LMSContext";
import { courses } from "../data/courses";
import DashboardLayout from "../dashboard/DashboardLayout";

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

  const myEnrollments = enrollments.filter(
    (e) => e.studentId === user.id
  );

  return (
    <DashboardLayout onNavSelect={setActiveTab}>
      <div className="space-y-8">
        {myEnrollments.map((enroll) => {
          const course = courses.find(
            (c) => c.id === enroll.courseId
          );
          if (!course) return null;

          return (
            <div
              key={course.id}
              className="bg-[#121212] border border-white/10 rounded-xl p-6"
            >
              <h2 className="text-xl text-white mb-6">
                {course.title} — ⭐ {enroll.totalPoints}
              </h2>

              {/* ================= COURSES (VIDEOS LIST ALWAYS VISIBLE) ================= */}
              {activeTab === "courses" &&
                course.videos.map((video, index) => {
                  const prog = enroll.videoProgress[index];

                  return (
                    <div
                      key={video.id}
                      className="bg-black/40 p-4 rounded mb-4"
                    >
                      {/* VIDEO PREVIEW */}
                      <div
                        onClick={() => setActiveVideo(video)}
                        className="cursor-pointer mb-3"
                      >
                        <iframe
                          src={video.url}
                          title={video.title}
                          className="w-full h-56 rounded pointer-events-none"
                        />
                      </div>

                      {/* TITLE + ACTION */}
                      <div className="flex justify-between items-center">
                        <p className="text-white/80">
                          {video.title}
                        </p>

                        <button
                          onClick={() =>
                            completeVideo(
                              user.id,
                              course.id,
                              index
                            )
                          }
                          disabled={prog.videoCompleted}
                          className="text-blue-400 text-sm"
                        >
                          {prog.videoCompleted
                            ? "✔ Watched"
                            : "Mark Watched"}
                        </button>
                      </div>
                    </div>
                  );
                })}

              {/* ================= ASSIGNMENTS ================= */}
              {activeTab === "assignments" && (
                <div className="space-y-4">
                  {course.videos.map((video, index) => {
                    const a =
                      enroll.videoProgress[index].assignment;

                    return (
                      <div
                        key={video.id}
                        className="bg-black/40 p-4 rounded"
                      >
                        <h4 className="text-white mb-1">
                          Assignment – {video.title}
                        </h4>
                        <p className="text-white/60 text-sm mb-2">
                          {video.assignment}
                        </p>

                        {!a.submitted && (
                          <button
                            onClick={() =>
                              submitAssignment(
                                user.id,
                                course.id,
                                index
                              )
                            }
                            className="text-emerald-400 text-sm"
                          >
                            Submit Assignment
                          </button>
                        )}

                        {a.submitted && !a.approved && (
                          <span className="text-yellow-400 text-sm">
                            ⏳ Pending Review
                          </span>
                        )}

                        {a.approved && (
                          <span className="text-green-400 text-sm">
                            ✔ Approved
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {/* FINAL ASSIGNMENT */}
                  <div className="border border-emerald-400/40 p-4 rounded">
                    <h3 className="text-emerald-400 mb-2">
                      ⭐ Final Assignment
                    </h3>

                    {!enroll.finalAssignment.submitted && (
                      <button
                        onClick={() =>
                          submitFinalAssignment(
                            user.id,
                            course.id
                          )
                        }
                        className="text-emerald-400"
                      >
                        Submit Final Assignment
                      </button>
                    )}

                    {enroll.finalAssignment.submitted &&
                      !enroll.finalAssignment.approved && (
                        <span className="text-yellow-400">
                          ⏳ Pending Review
                        </span>
                      )}

                    {enroll.finalAssignment.approved && (
                      <span className="text-green-400">
                        ✔ Approved
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ================= PROJECTS ================= */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  {course.videos.map((video, index) => {
                    const p =
                      enroll.videoProgress[index].miniProject;

                    return (
                      <div
                        key={video.id}
                        className="bg-black/40 p-4 rounded"
                      >
                        <h4 className="text-white mb-1">
                          Mini Project – {video.title}
                        </h4>
                        <p className="text-white/60 text-sm mb-2">
                          {video.miniProject}
                        </p>

                        {!p.submitted && (
                          <button
                            onClick={() =>
                              submitMiniProject(
                                user.id,
                                course.id,
                                index
                              )
                            }
                            className="text-purple-400 text-sm"
                          >
                            Submit Project
                          </button>
                        )}

                        {p.submitted && !p.approved && (
                          <span className="text-yellow-400 text-sm">
                            ⏳ Pending Review
                          </span>
                        )}

                        {p.approved && (
                          <span className="text-green-400 text-sm">
                            ✔ Approved
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {/* FINAL PROJECT */}
                  <div className="border border-yellow-400/40 p-4 rounded">
                    <h3 className="text-yellow-400 mb-2">
                      ⭐ Final Project
                    </h3>

                    {!enroll.finalProject.submitted && (
                      <button
                        onClick={() =>
                          submitFinalProject(
                            user.id,
                            course.id
                          )
                        }
                        className="text-yellow-400"
                      >
                        Submit Final Project
                      </button>
                    )}

                    {enroll.finalProject.submitted &&
                      !enroll.finalProject.approved && (
                        <span className="text-yellow-400">
                          ⏳ Pending Review
                        </span>
                      )}

                    {enroll.finalProject.approved && (
                      <span className="text-green-400">
                        ✔ Approved
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= VIDEO MODAL (80% SCREEN) ================= */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-[80%] h-[80%] bg-black rounded-lg">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ✕
            </button>

            <iframe
              src={activeVideo.url}
              className="w-full h-full rounded"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
