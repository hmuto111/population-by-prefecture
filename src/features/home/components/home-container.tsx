import { ReactNode } from "react";
import styles from "../styles/home-container.module.css";

type Props = {
  children: ReactNode;
};

export const HomeContainer = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>{children}</div>
    </div>
  );
};
