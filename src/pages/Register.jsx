import { Button, Form, Input } from "antd";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosConfig";
import GoogleLogin from "../components/providers/GoogleLogin";
import { useState } from "react";
const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const onFinish = async ({
    name,
    email,
    password,
    confirmPassword,
    photoURL,
  }) => {
    setLoading(true);
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const data = await createUser(email, password);
      if (data?.user?.email) {
        const userInfo = {
          email: data.user.email,
          name: name,
        };

        await updateUserProfile(name, photoURL);

        try {
          const res = await axiosInstance.post("/user", userInfo);
          localStorage.setItem("token", res?.data?.token);
          setLoading(false);
          navigate(from);
        } catch (error) {
          console.error("There was an error creating the user:", error);
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating user:", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Photo URL"
            name="photoURL"
            rules={[
              {
                required: true,
                message: "Please input PhotoURL!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Re-enter your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Password Not Matched"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
