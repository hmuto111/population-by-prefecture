import style from "./header.module.css";
import { Link } from "react-router";

import { paths } from "@/config/paths";

export const Header = () => {
  return (
    <header className={style.header}>
      <Link to={paths.home.path} className={style.app_name}>
        popu
      </Link>
      <nav>
        <ul className={style.nav_links}>
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
