import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const useLogout = () => {
  const [logOut, clearAuth] = useAuthStore((state) => [
    state.logOut,
    clearAuth,
  ]);
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = async () => {
    clearAuth();
    logOut();
    await clearUser();
  };

  return [logout];
};

export default useLogout;
