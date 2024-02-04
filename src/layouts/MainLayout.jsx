import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

const MainLayout = () => {
  const [auth, setAuth] = useAuthStore((state) => [state.auth, state.setAuth]);

  useEffect(() => {
    const fetchFn = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/status`,
        {
          credentials: "include",
        }
      );
      const status = await res.json();
      if (status.statusCode === 403 || status.statusCode === 401) {
        setAuth(null);
      }
    };
    fetchFn();
  }, [setAuth, auth]);

  return (
    <section>
      <Nav />
      <Outlet />
    </section>
  );
};

export default MainLayout;
