import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const SuccessPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col d-flex justify-content-center align-items-center fs-1">
          Benvenuto Sei Loggato con successo.....
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
