import { Link } from "react-router";
import { Header } from "@/components/header/header";
import { HomeContainer } from "@/features/home/components/home-container";

import { paths } from "@/config/paths";

const Home = () => {
  return (
    <div>
      <Header />
      <HomeContainer>
        <h1>Welcome to my app</h1>
        <Link to={paths.app.population_graph.getHref()}>
          Use Population Graph
        </Link>
      </HomeContainer>
    </div>
  );
};

export default Home;
