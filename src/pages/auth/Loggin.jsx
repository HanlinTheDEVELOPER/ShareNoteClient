import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/userStore";

const Loggin = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("user");
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    let isFirst = true;
    const fetchFn = () => {
      setAuth(userId);
      user?.tags?.length > 0 ? navigate("/") : navigate("/setup");
    };
    isFirst && fetchFn();
    return () => {
      isFirst = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Please Wait, while logging you in</div>;
};

export default Loggin;
