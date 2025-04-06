import { Link } from "react-router";

import { paths } from "@/config/paths";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to={paths.app.population_graph.getHref()}>Population Graph</Link>
    </div>
  );
};

export default Home;
