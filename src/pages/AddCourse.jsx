import { Button, Form, Input, InputNumber, Grid } from "antd";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../axios/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";
const { useBreakpoint } = Grid;

const AddCourse = () => {
  const { user } = useAuth();
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
      ownerEmail: user.email,
      instructorName: user.displayName,
    };

    axiosInstance
      .post("/add-course", courseData)
      .then(() => toast.success("Course Added Success fully"));
    form.resetFields();
    setLoading(false);
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
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Add Course</h2>
      <Form
        {...formItemLayout}
        form={form}
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
              message: "Please input!",
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
              message: "Please input!",
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
              message: "Please input!",
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

export default AddCourse;
