import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import AddCourse from "../pages/AddCourse";
import ViewAllCourses from "../pages/ViewAllCourses";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ViewMyCourses from "../pages/ViewMyCourses";
import PrivateRoute from "./private/PrivateRoute";
import EditCourse from "../pages/EditCourse";
import axiosInstance from "../axios/axiosConfig";
import SuccessPayment from "../pages/SuccessPayment";
import CancelPayment from "../pages/CancelPayment";
import MyEnrolledCourses from "../pages/MyEnrolledCourses";
import ViewSingleCourse from "../pages/ViewSingleCourse";

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
        path: "/all-courses",
        element: <ViewAllCourses />,
      },
      {
        path: "/enrolled-courses",
        element: <MyEnrolledCourses />,
      },

      {
        path: "/create-payment",

        children: [
          {
            path: "success",
            element: <SuccessPayment />,
          },
          {
            path: "cancel",
            element: <CancelPayment />,
          },
        ],
      },
      {
        path: "/my-courses",
        element: <ViewMyCourses />,
      },
      {
        path: "/my-courses/edit/:id",
        element: <EditCourse />,
        loader: async ({ params }) => {
          try {
            const response = await axiosInstance.get(`/course/${params.id}`);
            return response.data;
          } catch (error) {
            console.error("Error fetching poem:", error);

            throw error;
          }
        },
      },

      {
        path: "/enrolled-courses/:id",
        element: <ViewSingleCourse />,
        loader: async ({ params }) => {
          try {
            const response = await axiosInstance.get(`/course/${params.id}`);
            return response.data;
          } catch (error) {
            console.error("Error fetching poem:", error);

            throw error;
          }
        },
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
