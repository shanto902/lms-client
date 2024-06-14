import { Alert, Button, Modal, Space, Spin, Table } from "antd";
import useMyCourses from "../hooks/useMyCourses";
import axiosInstance from "../axios/axiosConfig";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
];
const ViewMyCourses = () => {
  const { courses, loading, error, refetch } = useMyCourses();
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleEditCourse = (record) => {
    navigate(`/my-courses/edit/${record._id}`);
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
        My All Written Courses
      </h2>
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
    </div>
  );
};

export default ViewMyCourses;
