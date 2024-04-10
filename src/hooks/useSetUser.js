import { fetchUser } from "../lib/Api/userApi";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";

const useSetUser = () => {
  const auth = useAuthStore((state) => state.auth);
  const setUser = useUserStore((state) => state.setUser);
  const setUserFn = async () => {
    const data = await fetchUser();
    auth && setUser(data);
    return null;
  };
  return [setUserFn];
};

export default useSetUser;
