import { Button, Form, Input } from "antd";
import GoogleLogin from "../components/providers/GoogleLogin";
import useAuth from "../hooks/useAuth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Login = () => {
  const { signIn, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const onFinish = async (values) => {
    try {
      await signIn(values.email, values.password);
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const from = location?.state?.from?.pathname || "/";
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1 style={{ margin: "10px 0" }}>Learning Management System</h1>
        <h2 style={{ textAlign: "center", marginBottom: "50px" }}>Login Now</h2>
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
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Button type="link">
            <NavLink to={"/register"}>Register Now</NavLink>
          </Button>

          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
