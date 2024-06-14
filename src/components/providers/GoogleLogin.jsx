import { GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../axios/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    googleLogin().then((data) => {
      const userData = {
        email: data?.user?.email,
        name: data?.user?.displayName,
        photoURL: data?.user?.photoURL,
      };
      axiosInstance
        .post("/user", userData)
        .then((res) => localStorage.setItem("token", res?.data?.token))
        .catch((error) => {
          console.error("There was an error creating the user:", error);
        });
    });
    navigate(from);
  };

  return (
    <Button onClick={handleGoogleSignIn} style={{ width: "300px" }}>
      <GoogleOutlined />
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
