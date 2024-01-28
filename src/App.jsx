import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main, { StatusLoader } from "./layouts/Main";

import Index from "./pages/Index";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Details from "./pages/Details";
import Loggin from "./pages/Loggin";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: StatusLoader,
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
