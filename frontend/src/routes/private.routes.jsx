import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_key");
    if (!token) {
      return navigate("/login", { replace: true });
    }
  }, []);
  return children;
}
