import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Handle any post-payment success logic here
    setTimeout(() => {
      navigate("/");
    }, 5000); // Redirect back to home after 5 seconds
  }, [navigate]);

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>
        Thank you for your purchase. You will be redirected to the home page
        shortly.
      </p>
    </div>
  );
};

export default SuccessPayment;
