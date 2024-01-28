import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Loggin = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get("user");
  const navigate = useNavigate();

  const [setAuth] = useAuthStore((state) => [state.setAuth]);

  useEffect(() => {
    const fetchFn = async () => {
      const res = await fetch(
        `http://localhost:5173/api/v1/auth/login?user=${user}`,
        { credentials: "include" }
      );
      const logginUser = await res.json();
      navigate("/");
      setAuth(logginUser.data);
    };
    fetchFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Please Wait, while logging you in</div>;
};

export default Loggin;
