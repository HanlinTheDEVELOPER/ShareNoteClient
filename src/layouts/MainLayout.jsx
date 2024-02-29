import { Outlet } from "react-router-dom";
import Nav from "../components/common/Nav";
import { Container } from "@chakra-ui/react";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";
import LoginModal from "../pages/auth/LoginModal";

const MainLayout = () => {
  const [auth, clearAuth] = useAuthStore((state) => [
    state.auth,
    state.clearAuth,
  ]);
  const clearUser = useUserStore((state) => state.clearUser);

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
        clearAuth();
        clearUser();
      }
    };
    fetchFn();
  }, [clearAuth, auth, clearUser]);

  return (
    <Container p={0} maxW={{ base: "100%", sm: "90vw", md: "80vw" }}>
      <Nav />
      <Outlet />
      <LoginModal />
    </Container>
  );
};

export default MainLayout;
