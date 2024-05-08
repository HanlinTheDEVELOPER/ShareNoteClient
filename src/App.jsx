import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import { useEffect } from "react";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { queryClient } from "./main";
import Loggin from "./pages/auth/Loggin";
import SetupAcc from "./pages/auth/SetupAcc";
import Create from "./pages/notes/Create";
import Details from "./pages/notes/Details/index";
import Edit from "./pages/notes/Edit";
import Index from "./pages/notes/Index";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/user/Profile";
import { useAuthStore } from "./store/authStore";

import useSetUser from "./hooks/useSetUser";
import Search from "./pages/Search/Index";

const App = () => {
  const auth = useAuthStore((state) => state.auth);
  const [setUserfn] = useSetUser();
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: setUserfn,
      onSuccess: () => queryClient.invalidateQueries("profile"),
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
          errorElement: <NotFound fromRoot={true} />,
        },
        {
          path: "/setup",
          element: (
            <ProtectedRoute>
              <SetupAcc />
            </ProtectedRoute>
          ),
        },
        { path: "/not_found", element: <NotFound /> },
        { path: "/profile", element: <Profile />, errorElement: <NotFound /> },
        {
          path: "/create",
          element: (
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          ),
          errorElement: <NotFound />,
        },
        {
          path: "/edit/:slug",
          element: <Edit />,
          errorElement: <NotFound />,
        },
        {
          path: "/notes/:slug",
          element: <Details />,
          errorElement: <NotFound />,
        },
        { path: "/search", element: <Search />, errorElement: <NotFound /> },
      ],
    },
    { path: "/login", element: <Loggin />, errorElement: <NotFound /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
