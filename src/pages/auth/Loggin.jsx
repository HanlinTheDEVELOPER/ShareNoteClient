import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { Img } from "@chakra-ui/react";
import loading from "../../assets/Bean Eater-1s-200px.gif";

const Loggin = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("user");
  const state = searchParams.get("state");
  const navigate = useNavigate();

  const [setAuth] = useAuthStore((state) => [state.setAuth]);

  useEffect(() => {
    let isFirst = true;
    const fetchFn = async () => {
      const fetchRes = await axiosInstance.get(
        `/api/v1/auth/login?user=${userId}`
      );
      const auth = fetchRes.data;
      setAuth({ id: auth?.data?.id });

      return auth?.data?.tags?.length > 0
        ? state
          ? navigate(state)
          : navigate("/")
        : navigate("/setup?state=" + state);
    };
    isFirst && fetchFn();
    // return () => {
    //   isFirst = false;
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" w-full h-screen text-xl opacity-80 flex justify-center font-bold mt-4 ">
      <img alt="loading" src={loading} width={100} />
    </div>
  );
};

export default Loggin;
