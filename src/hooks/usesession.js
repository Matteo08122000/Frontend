import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IsTokenExpire } from "../utilis/VerifyTokenExire";

const Auth = () => {
  const authData = localStorage.getItem("Auth");
  return authData ? JSON.parse(authData) : null;
};

const useSession = () => {
  const session = Auth();
  const decodedsession = session ? jwtDecode(session) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!session || IsTokenExpire(decodedsession?.exp)) {
      navigate("/login");
    }
  }, [navigate, session, decodedsession]);

  return decodedsession;
};

export default useSession;
