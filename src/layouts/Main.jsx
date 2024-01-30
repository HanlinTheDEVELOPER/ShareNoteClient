import { Outlet, useLoaderData } from "react-router-dom";
import Nav from "../components/Nav";

import { useAuthStore } from "../store/authStore";

export const StatusLoader = async () => {
  const [auth, setAuth] = useAuthStore((state) => [state.auth, state.setAuth]);

  const res = await fetch("http://localhost:5173/api/v1/auth/status", {
    credentials: "include",
    headers: {
      Authentication: auth?.token,
    },
  });
  const status = await res.json();
  if (status.message === "Refresh Token Success") {
    await setAuth(status.data);
  } else if (status.statusCode == 401) {
    setAuth(null);
  }
  return status;
};

const Main = () => {
  const data = useLoaderData();

  return (
    <section>
      <Nav />
      {JSON.stringify(data)}
      <Outlet />
    </section>
  );
};

export default Main;
