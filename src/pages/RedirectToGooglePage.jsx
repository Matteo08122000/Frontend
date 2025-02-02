import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectToGooglePage = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      setTimeout(() => {
        navigate("/home");
      }, 5000);
    }
  }, [navigate, code]);

  return (
    <div>
      {code && <p>Accesso in corso...</p>}

      {!code && <p>Accesso fallito</p>}
    </div>
  );
};

export default RedirectToGooglePage;
