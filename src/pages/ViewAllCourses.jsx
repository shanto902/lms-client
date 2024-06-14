import { Button, Space, Table, Spin, Alert } from "antd";
import useCourses from "../hooks/useCourses";
import axiosInstance from "../axios/axiosConfig";
import useAuth from "../hooks/useAuth";

const ViewAllCourses = () => {
  const { courses, loading, error } = useCourses();
  const { user } = useAuth();
  const buyFunction = async (record) => {
    console.log(record);
    const data = {
      ...record,
      userEmail: user.email,
    };
    try {
      const response = await axiosInstance.post("/create-payment-intent", data);
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

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
          <Button onClick={() => buyFunction(record)}>Buy</Button>
        </Space>
      ),
    },
  ];

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
