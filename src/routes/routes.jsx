import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import AddCourse from "../pages/AddCourse";
import ViewAllCourses from "../pages/ViewAllCourses";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ViewMyCourses from "../pages/ViewMyCourses";
import PrivateRoute from "./private/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/add-course",
        element: <AddCourse />,
      },
      {
        path: "/view-all-courses",
        element: <ViewAllCourses />,
      },
      {
        path: "/view-my-courses",
        element: <ViewMyCourses />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
