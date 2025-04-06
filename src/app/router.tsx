import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";

import AppRoot from "./routes/root";

import { paths } from "@/config/paths";

const convert = async (path: string) => {
  const module = await import(path);
  return { Component: module.default };
};

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => convert("./routes/home"),
      hydrateFallbackElement: <div>spinner</div>,
    },
    {
      path: paths.app.root.path,
      element: <AppRoot />,
      hydrateFallbackElement: <div>spinner</div>,
      children: [
        {
          path: paths.app.population_graph.path,
          lazy: () => convert("./routes/population-graph"),
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
