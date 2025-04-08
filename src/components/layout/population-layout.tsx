import { ReactNode } from "react";
import styles from "./population-layout.module.css";

type Props = {
  children: ReactNode;
};

export const PopulationLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  );
};
