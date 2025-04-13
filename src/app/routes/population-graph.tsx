import { useState } from "react";

import { PopulationLayout } from "@/components/layout/population-layout";
import { Prefectures } from "@/features/population-graph/components/prefectures";
import { TransitionGraph } from "@/features/population-graph/components/transition-graph";

import {
  PopulationData,
  RegionData,
  Label,
  RegionKey,
} from "@/features/population-graph/types/prefectures";
import styles from "@/features/population-graph/styles/contents.module.css";

import {
  getPrefectures,
  getPopulationData,
} from "@/features/population-graph/api/get-prefecture-data";

import { PrefectureTab } from "@/features/population-graph/components/prefecture-tab";

const PopulationGraph = () => {
  const [prefectures, setPrefectures] = useState<RegionData[] | null>(null);
  const [populationData, setPopulationData] = useState<PopulationData | null>(
    null
  );
  const [label, setLabel] = useState<Label>("総人口");
  const [region, setRegion] = useState<RegionKey | "all">("all");
  const [apiKey, setApiKey] = useState<string>("");

  const handleGetPrefectures = async () => {
    const data = await getPrefectures(apiKey);

    if (data && data.result) {
      const initialPrefectures: RegionData[] = data.result.map(
        (pref: RegionData) => ({
          ...pref,
          isSelected: false,
        })
      );
      setPrefectures(initialPrefectures);
      getPopulationData(apiKey, initialPrefectures, setPopulationData);
    }
  };

  return (
    <PopulationLayout>
      <div className={styles.title}>Population Graph</div>
      <input
        type="text"
        placeholder="please api key"
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button onClick={handleGetPrefectures}>Get Prefectures</button>
      <Prefectures
        prefectures={prefectures}
        setPrefectures={setPrefectures}
        region={region}
        setRegion={setRegion}
      />
      <PrefectureTab setLabel={setLabel} />
      <TransitionGraph
        prefectures={prefectures}
        populationData={populationData}
        label={label}
      />
    </PopulationLayout>
  );
};

export default PopulationGraph;
