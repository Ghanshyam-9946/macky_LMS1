import { createContext, useContext, useState } from "react";
import { courses } from "../data/courses";

const LMSContext = createContext(null);

export const LMSProvider = ({ children }) => {
  const [enrollments, setEnrollments] = useState([]);

  /* ================= ASSIGN COURSE ================= */
  const assignCourse = (studentId, courseId) => {
    const exists = enrollments.some(
      (e) => e.studentId === studentId && e.courseId === courseId
    );
    if (exists) return false;

    const course = courses.find((c) => c.id === courseId);

    const newEnrollment = {
      studentId,
      courseId,
      instructorId: course.instructorId,

      videoProgress: course.videos.map(() => ({
        videoCompleted: false,
        assignment: { submitted: false, approved: false },
        miniProject: { submitted: false, approved: false },
      })),

      finalAssignment: { submitted: false, approved: false },
      finalProject: { submitted: false, approved: false },

      totalPoints: 0,
    };

    setEnrollments((p) => [...p, newEnrollment]);
    return true;
  };

  /* ================= STUDENT ACTIONS ================= */
  const completeVideo = (studentId, courseId, index) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.studentId === studentId && e.courseId === courseId) {
          const vp = [...e.videoProgress];
          vp[index].videoCompleted = true;
          return { ...e, videoProgress: vp };
        }
        return e;
      })
    );
  };

  const submitAssignment = (studentId, courseId, index) => {
    updateNested(studentId, courseId, index, "assignment", "submitted");
  };

  const submitMiniProject = (studentId, courseId, index) => {
    updateNested(studentId, courseId, index, "miniProject", "submitted");
  };

  const submitFinalAssignment = (studentId, courseId) => {
    updateFinal(studentId, courseId, "finalAssignment", "submitted");
  };

  const submitFinalProject = (studentId, courseId) => {
    updateFinal(studentId, courseId, "finalProject", "submitted");
  };

  /* ================= INSTRUCTOR ACTIONS ================= */
  const approveAssignment = (studentId, courseId, index) => {
    approveNested(studentId, courseId, index, "assignment", 20);
  };
  
  const approveMiniProject = (studentId, courseId, index) => {
    approveNested(studentId, courseId, index, "miniProject", 30);
  };
  
  const approveFinalAssignment = (studentId, courseId) => {
    approveFinal(studentId, courseId, "finalAssignment", 50);
  };
  
  const approveFinalProject = (studentId, courseId) => {
    approveFinal(studentId, courseId, "finalProject", 100);
  };
  

  /* ================= HELPERS ================= */
  const updateNested = (studentId, courseId, index, field, key) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.studentId === studentId && e.courseId === courseId) {
          const vp = [...e.videoProgress];
          vp[index][field][key] = true;
          return { ...e, videoProgress: vp };
        }
        return e;
      })
    );
  };

  const approveNested = (studentId, courseId, index, field, points) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.studentId === studentId && e.courseId === courseId) {
          const vp = [...e.videoProgress];
          if (!vp[index][field].approved) {
            vp[index][field].approved = true;
            return {
              ...e,
              videoProgress: vp,
              totalPoints: e.totalPoints + points,
            };
          }
        }
        return e;
      })
    );
  };

  const updateFinal = (studentId, courseId, field, key) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e.studentId === studentId && e.courseId === courseId
          ? { ...e, [field]: { ...e[field], [key]: true } }
          : e
      )
    );
  };

  const approveFinal = (studentId, courseId, field, points) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e.studentId === studentId &&
        e.courseId === courseId &&
        !e[field].approved
          ? {
              ...e,
              [field]: { ...e[field], approved: true },
              totalPoints: e.totalPoints + points,
            }
          : e
      )
    );
  };

  return (
    <LMSContext.Provider
      value={{
        enrollments,
        assignCourse,

        completeVideo,
        submitAssignment,
        submitMiniProject,
        submitFinalAssignment,
        submitFinalProject,

        approveAssignment,
        approveMiniProject,
        approveFinalAssignment,
        approveFinalProject,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => {
  const ctx = useContext(LMSContext);
  if (!ctx) throw new Error("useLMS must be used inside LMSProvider");
  return ctx;
};
