import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = () => {
    clearAuth();
    clearUser();
  };

  return [logout];
};

export default useLogout;
