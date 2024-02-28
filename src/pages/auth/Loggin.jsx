import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Loggin = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const user = searchParams.get("user");
  const navigate = useNavigate();

  const [setAuth] = useAuthStore((state) => [state.setAuth]);

  useEffect(() => {
    const fetchFn = () => {
      setAuth(user);
      return navigate("/");
    };
    fetchFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Please Wait, while logging you in</div>;
};

export default Loggin;
