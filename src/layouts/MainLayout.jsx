import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { Container } from "@chakra-ui/react";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import { useEffect } from "react";

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
    <Container maxW={{ base: "100%", sm: "90vw", md: "80vw" }}>
      <Nav />
      <Outlet />
    </Container>
  );
};

export default MainLayout;
