import { createContext, useContext, useState } from "react";
import { courses } from "../data/courses";
import { students, instructors } from "../data/users";

const LMSContext = createContext();

export const LMSProvider = ({ children }) => {
  const [enrollments, setEnrollments] = useState([]);

  // ADMIN → Assign course
  const assignCourse = (studentId, courseId) => {
    const already = enrollments.find(
      e => e.studentId === studentId && e.courseId === courseId
    );
    if (already) return false;

    const course = courses.find(c => c.id === courseId);

    setEnrollments(prev => [
      ...prev,
      {
        studentId,
        courseId,
        instructorId: course.instructorId,

        // VIDEO STATUS
        videos: course.videos.map(v => ({
          title: v,
          completed: false,
          points: 0,
        })),

        assignmentCompleted: false,
        projectCompleted: false,
        totalPoints: 0,
      },
    ]);

    return true;
  };

  // STUDENT → Complete Video
  const completeVideo = (studentId, courseId, videoIndex) => {
    setEnrollments(prev =>
      prev.map(e => {
        if (
          e.studentId === studentId &&
          e.courseId === courseId
        ) {
          if (e.videos[videoIndex].completed) return e;

          const updatedVideos = [...e.videos];
          updatedVideos[videoIndex] = {
            ...updatedVideos[videoIndex],
            completed: true,
            points: 10,
          };

          return {
            ...e,
            videos: updatedVideos,
            totalPoints: e.totalPoints + 10,
          };
        }
        return e;
      })
    );
  };

  const completeAssignment = (studentId, courseId) => {
    setEnrollments(prev =>
      prev.map(e =>
        e.studentId === studentId && e.courseId === courseId
          ? { ...e, assignmentCompleted: true }
          : e
      )
    );
  };

  const completeProject = (studentId, courseId) => {
    setEnrollments(prev =>
      prev.map(e =>
        e.studentId === studentId && e.courseId === courseId
          ? { ...e, projectCompleted: true }
          : e
      )
    );
  };

  return (
    <LMSContext.Provider
      value={{
        courses,
        students,
        instructors,
        enrollments,
        assignCourse,
        completeVideo,
        completeAssignment,
        completeProject,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = () => useContext(LMSContext);
