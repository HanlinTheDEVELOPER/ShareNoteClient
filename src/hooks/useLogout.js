import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const useLogout = () => {
  const [logOut, clearAuth] = useAuthStore((state) => [
    state.logOut,
    state.clearAuth,
  ]);
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = async () => {
    clearUser();
    clearAuth();
    logOut();
  };

  return [logout];
};

export default useLogout;
