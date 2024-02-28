import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const useLogout = () => {
  const logOut = useAuthStore((state) => state.logOut);
  const clearUser = useUserStore((state) => state.clearUser);

  const logout = () => {
    logOut();
    clearUser();
  };

  return [logout];
};

export default useLogout;
