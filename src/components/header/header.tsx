import "./header.css";
import { Link } from "react-router";

import { paths } from "@/config/paths";

export const Header = () => {
  return (
    <header className="header">
      <Link to={paths.home.path} className="app-name">
        popu
      </Link>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to={paths.home.path}>Home</Link>
          </li>
          <li>
            <Link to={paths.app.population_graph.getHref()}>graph</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
