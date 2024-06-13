import { Button, Form, Input, InputNumber, Grid } from "antd";

const { useBreakpoint } = Grid;

const AddCourse = () => {
  const screens = useBreakpoint();

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
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Add Course</h2>
      <Form
        {...formItemLayout}
        style={{
          maxWidth: screens.xs ? "80%" : 800,
          margin: " auto",
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
          label="Instructor Name"
          name="instructorName"
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
          wrapperCol={{
            xs: { span: 24 },
            sm: { offset: 6, span: 14 },
          }}
        >
          <Button
            style={{ marginLeft: "30px", marginRight: "10px" }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
          <Button type="default">Reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCourse;
