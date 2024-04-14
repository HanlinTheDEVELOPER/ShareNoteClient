import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import { useEffect } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { queryClient } from "./main";
import Loggin from "./pages/auth/Loggin";
import SetupAcc from "./pages/auth/SetupAcc";
import Create from "./pages/notes/Create";
import Details from "./pages/notes/Details";
import Edit from "./pages/notes/Edit";
import Index from "./pages/notes/Index";
import Test from "./pages/Test";
import Profile from "./pages/user/Profile";
import { useAuthStore } from "./store/authStore";

import useSetUser from "./hooks/useSetUser";

const App = () => {
  const auth = useAuthStore((state) => state.auth);
  const [setUserfn] = useSetUser();
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["user", "profile"],
      queryFn: setUserfn,
    });
  }, [auth]);

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
      ],
    },
    { path: "/login", element: <Loggin /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
