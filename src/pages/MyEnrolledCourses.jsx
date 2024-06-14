import { Alert, Button, Space, Spin, Table } from "antd";
import useEnrolledCourses from "../hooks/useEnrolledCourses";

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
      columns={[
        ...columns,
        {
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <Button onClick={() => console.log(record)}>View</Button>
            </Space>
          ),
        },
      ]}
      dataSource={courses}
      rowKey={(record) => record._id}
    />
  );
};

export default MyEnrolledCourses;
