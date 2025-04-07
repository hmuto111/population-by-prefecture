import { Link } from "react-router";
import { Header } from "@/components/header/header";

import { paths } from "@/config/paths";

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Home</h1>
      <Link to={paths.app.population_graph.getHref()}>Population Graph</Link>
    </div>
  );
};

export default Home;
