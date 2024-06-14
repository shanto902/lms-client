import React, { useState } from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Menu } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const { Header, Content, Sider } = Layout;

const navItems = [
  {
    key: 1,
    icon: React.createElement(DashboardOutlined),
    label: <NavLink to={"/"}>Dashboard</NavLink>,
  },
  {
    key: 2,
    icon: React.createElement(DashboardOutlined),
    label: <NavLink to={"/add-course"}>Add Course</NavLink>,
  },
  {
    key: 3,
    icon: React.createElement(DashboardOutlined),
    label: <NavLink to={"/all-courses"}>View All Course</NavLink>,
  },
  {
    key: 4,
    icon: React.createElement(DashboardOutlined),
    label: <NavLink to={"/my-courses"}>My All Course</NavLink>,
  },
];

const MainLayout = () => {
  const [sideMenuToggle, setSideMenuToggle] = useState(true);
  const location = useLocation();

  const { user, logout } = useAuth();

  // Determine which menu item should be selected based on the current path
  const getDefaultSelectedKey = () => {
    switch (location.pathname) {
      case "/":
        return ["1"];
      case "/add-course":
        return ["2"];
      case "/all-courses":
        return ["3"];
      case "/my-courses":
        return ["4"];
      default:
        return ["1"];
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setSideMenuToggle(!broken);
        }}
        onCollapse={(collapsed) => {
          setSideMenuToggle(!collapsed);
        }}
      >
        <div className="demo-logo-vertical" />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            margin: "40px 10px 0px 0px",
          }}
        >
          <Avatar
            size={100}
            icon={
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://avatar.iran.liara.run/public"
                }
                alt=""
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: "50%",
                }}
              />
            }
          />

          <h3 style={{ color: "white" }}>{user.displayName}</h3>
        </div>
        <hr style={{ margin: "15px 0" }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={getDefaultSelectedKey()}
          items={navItems}
        />
        <Button
          onClick={logout}
          style={{
            display: sideMenuToggle ? "block" : "none",
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          type="primary"
          danger
        >
          Log Out
        </Button>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            Learning Management System
          </h2>
        </Header>
        <Content>
          <div
            style={{
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
