import { useState } from "react";

import { PopulationLayout } from "@/components/layout/population-layout";
import { Prefectures } from "@/features/population-graph/components/Prefectures";

import { RegionData } from "@/features/population-graph/types/prefectures";
import { region_data } from "@/features/population-graph/data/prefectures";
import styles from "@/features/population-graph/styles/contents.module.css";

const PopulationGraph = () => {
  const [prefectures, setPrefectures] = useState<RegionData>(region_data);
  return (
    <PopulationLayout>
      <div className={styles.title}>Population Graph</div>
      <Prefectures prefectures={prefectures} setPrefectures={setPrefectures} />
      <div className={styles.graph}>aaa</div>
    </PopulationLayout>
  );
};

export default PopulationGraph;
