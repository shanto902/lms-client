import { useNavigate } from "react-router-dom";

const CancelPayment = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Payment Cancelled</h2>
      <p>Your payment was cancelled. Please try again.</p>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default CancelPayment;
