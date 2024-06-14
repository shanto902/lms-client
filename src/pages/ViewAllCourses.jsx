import { Button, Space, Table, Spin, Alert } from "antd";
import useCourses from "../hooks/useCourses";

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
    title: "Instructor Name",
    dataIndex: "instructorName",
    key: "instructorName",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button>Buy {record.courseTitle}</Button>
      </Space>
    ),
  },
];

const ViewAllCourses = () => {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <Spin size="large" />;
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
    <Table
      columns={columns}
      dataSource={courses}
      rowKey={(record) => record._id}
    />
  );
};

export default ViewAllCourses;
