import { Alert, Button, Space, Spin, Table } from "antd";
import useEnrolledCourses from "../hooks/useEnrolledCourses";
import { NavLink } from "react-router-dom";

const columns = [
  {
    title: "Course Title",
    dataIndex: "courseTitle",
    key: "courseTitle",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Instructor",
    dataIndex: "instructorName",
    key: "instructorName",
  },

  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
];
const MyEnrolledCourses = () => {
  const { courses, loading, error } = useEnrolledCourses();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load courses"
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        My Enrolled Courses
      </h2>
      <Table
        columns={[
          ...columns,
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button>
                  <NavLink to={`/enrolled-courses/${record._id}`}>View</NavLink>
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={courses}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default MyEnrolledCourses;
