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
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login?user=${user}`,
        { credentials: "include" }
      );
      const logginUser = await res.json();
      setAuth(logginUser.data);
      return navigate("/");
    };
    fetchFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Please Wait, while logging you in</div>;
};

export default Loggin;
