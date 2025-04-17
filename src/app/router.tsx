import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";

import AppRoot from "./routes/root";

import { paths } from "@/config/paths";

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const module = await import("./routes/home"); // Vite can analyze this static path
        return { Component: module.default };
      },
      hydrateFallbackElement: <div>spinner</div>,
    },
    {
      path: paths.app.root.path,
      element: <AppRoot />,
      hydrateFallbackElement: <div>spinner</div>,
      children: [
        {
          path: paths.app.population_graph.path,
          lazy: async () => {
            const module = await import("./routes/population-graph"); // Vite can analyze this too
            return { Component: module.default };
          },
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
