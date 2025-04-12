import { useState } from "react";

import { PopulationLayout } from "@/components/layout/population-layout";
import { Prefectures } from "@/features/population-graph/components/prefectures";
import { TransitionGraph } from "@/features/population-graph/components/transition-graph";

import {
  PopulationData,
  RegionData,
} from "@/features/population-graph/types/prefectures";
import styles from "@/features/population-graph/styles/contents.module.css";

const url = "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/";

const PopulationGraph = () => {
  const [prefectures, setPrefectures] = useState<RegionData[] | null>(null);
  const [populationData, setPopulationData] = useState<PopulationData | null>(
    null
  );
  const [apiKey, setApiKey] = useState<string>("");

  const handleGetPrefectures = async () => {
    if (!apiKey) return;

    await fetch(url + "prefectures", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("成功:", data);
        const initialPrefectures: RegionData[] = data.result.map(
          (pref: RegionData) => ({
            ...pref,
            isSelected: false,
          })
        );
        setPrefectures(initialPrefectures);
        getPopulationData(initialPrefectures);
      })
      .catch((error) => {
        console.error("エラー:", error);
      });
  };

  const getPopulationData = async (prefectures: RegionData[]) => {
    const tempPopulationData: PopulationData | null = {
      boundaryYear: 0,
      data: [],
    };
    prefectures?.forEach(async (pref) => {
      await fetch(
        url + "population/composition/perYear?prefCode=" + pref.prefCode,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("成功:", data);
          tempPopulationData.boundaryYear = data.result.boundaryYear;
          tempPopulationData.data =
            tempPopulationData === null
              ? [
                  {
                    prefCode: pref.prefCode,
                    prefName: pref.prefName,
                    ...data.result.data,
                  },
                ]
              : [
                  ...tempPopulationData.data,
                  {
                    prefCode: pref.prefCode,
                    prefName: pref.prefName,
                    ...data.result.data,
                  },
                ];
        })
        .catch((error) => {
          console.error("エラー:", error);
        });
    });

    setPopulationData(tempPopulationData);
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
      <Prefectures prefectures={prefectures} setPrefectures={setPrefectures} />
      <TransitionGraph
        prefectures={prefectures}
        populationData={populationData}
      />
    </PopulationLayout>
  );
};

export default PopulationGraph;
