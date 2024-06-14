import { Alert, Button, Modal, Space, Spin, Table } from "antd";
import useMyCourses from "../hooks/useMyCourses";
import axiosInstance from "../axios/axiosConfig";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

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
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={console.log(record)}>Buy {record.courseTitle}</Button>
      </Space>
    ),
  },
];
const ViewMyCourses = () => {
  const { courses, loading, error, refetch } = useMyCourses();

  const { user } = useAuth();
  const handleEditCourse = (record) => {
    // Implement logic to handle editing course
    console.log(`Editing course: ${record.courseTitle}`);
  };

  const handleDeleteCourse = (record) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${record.courseTitle}?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(`Deleting course: ${record.courseTitle}`);
        axiosInstance.delete(`/course/${record._id}/${user.email}`).then(() => {
          toast.success(`${record.courseTitle} is Deleted SuccessFully`);
          refetch();
        });
      },
    });
  };

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
              <Button onClick={() => handleEditCourse(record)}>Edit</Button>
              <Button onClick={() => handleDeleteCourse(record)} danger>
                Delete
              </Button>
            </Space>
          ),
        },
      ]}
      dataSource={courses}
      rowKey={(record) => record._id}
    />
  );
};

export default ViewMyCourses;
