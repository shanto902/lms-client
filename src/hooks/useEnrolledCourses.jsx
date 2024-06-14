import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../axios/axiosConfig";
import useAuth from "./useAuth";

const useEnrolledCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/enrolled-courses/${user.email}`
      );
      setCourses(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [user.email]);

  useEffect(() => {
    if (user.email) {
      fetchCourses();
    }
  }, [user.email, fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
};

export default useEnrolledCourses;
