import { Button, Form, Input, InputNumber, Grid } from "antd";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../axios/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";
const { useBreakpoint } = Grid;

const EditCourse = () => {
  const course = useLoaderData();
  const { user } = useAuth();
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const onFinish = (values) => {
    setLoading(true);
    const courseData = {
      ...values,
    };

    axiosInstance
      .patch(`/course/${course._id}/${user.email}`, courseData)
      .then(() => {
        toast.success("Course updated successfully");
        navigate("/my-courses");
      })
      .catch(() => toast.error("Failed to update course"))
      .finally(() => {
        setLoading(false);
      });

    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Edit Course</h2>
      <Form
        {...formItemLayout}
        form={form}
        initialValues={course}
        style={{
          maxWidth: screens.xs ? "80%" : 800,
          margin: "auto",
          marginTop: "30px",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Course Title"
          name="courseTitle"
          rules={[
            {
              required: true,
              message: "Please input the course title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input the price!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input the description!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xs: { span: 24 },
            sm: { offset: 6, span: 14 },
          }}
        >
          <Button
            loading={loading}
            style={{ marginLeft: "30px", marginRight: "10px" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button type="default" onClick={handleReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCourse;
