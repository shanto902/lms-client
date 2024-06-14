import { useLoaderData } from "react-router-dom";

const ViewSingleCourse = () => {
  const course = useLoaderData();
  return (
    <div>
      {course && (
        <div
          style={{
            margin: 50,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h2>Course Title: {course.courseTitle}</h2>
          <p>Course Description: {course.description}</p>
          <h3>Author: {course.ownerEmail}</h3>
        </div>
      )}
    </div>
  );
};

export default ViewSingleCourse;
