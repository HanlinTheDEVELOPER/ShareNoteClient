import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Index from "./pages/Index";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Details from "./pages/Details";
import Loggin from "./pages/Loggin";
import { useUserStore } from "./store/userStore";
import { queryClient } from "./main";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";

const App = () => {
  const setUser = useUserStore((state) => state.setUser);
  const auth = useAuthStore((state) => state.auth);
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: setUser,
    });
  }, [auth, setUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/edit/:id",
          element: <Edit />,
        },
        {
          path: "/notes/:id",
          element: <Details />,
        },
        { path: "/login", element: <Loggin /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
