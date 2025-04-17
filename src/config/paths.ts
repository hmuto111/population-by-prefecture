export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    population_graph: {
      path: "",
      getHref: () => "/app",
    },
  },
} as const;
