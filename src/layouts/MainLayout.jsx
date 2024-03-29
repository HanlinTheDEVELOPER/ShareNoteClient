import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/common/Nav";
import LoginModal from "../pages/auth/LoginModal";
import { useUserStore } from "../store/userStore";
import { useAuthStore } from "../store/authStore";

const MainLayout = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const [setAuth, clearAuth] = useAuthStore((state) => [
    state.setAuth,
    state.clearAuth,
  ]);

  useEffect(() => {
    let isFirst = true;
    const fetchFn = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/status`,
        {
          credentials: "include",
        }
      );
      const status = await res.json();
      if (status.statusCode === 403 || status.statusCode === 401) {
        clearUser();
        clearAuth();
      }
      if (status.statusCode === 200) {
        setAuth({ id: status?.data?.id });
      }
    };
    isFirst && fetchFn();
    return () => (isFirst = false);
  }, []);

  return (
    <Container p={0} maxW={{ base: "100%", sm: "90vw", md: "80vw" }}>
      <Nav />
      <Outlet />
      <LoginModal />
    </Container>
  );
};

export default MainLayout;
