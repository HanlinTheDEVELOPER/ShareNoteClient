import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Index from "./pages/notes/Index";
import Create from "./pages/notes/Create";
import Edit from "./pages/notes/Edit";
import Details from "./pages/notes/Details";
import Loggin from "./pages/auth/Loggin";
import { useUserStore } from "./store/userStore";
import { queryClient } from "./main";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import Profile from "./pages/user/Profile";
import SetupAcc from "./pages/auth/SetupAcc";
import Test from "./pages/Test";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
          path: "/setup",
          element: (
            <ProtectedRoute>
              <SetupAcc />
            </ProtectedRoute>
          ),
        },
        { path: "test", element: <Test /> },
        { path: "/profile", element: <Profile /> },
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
