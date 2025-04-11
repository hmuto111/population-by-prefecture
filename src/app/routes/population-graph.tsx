import { useState, useEffect } from "react";

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
        setPrefectures(
          data.result.map((pref: RegionData) => ({
            ...pref,
            isSelected: false,
          }))
        );
      })
      .catch((error) => {
        console.error("エラー:", error);
      });
  };

  useEffect(() => {
    const getPopulationData = async () => {
      const tempPopulationData: PopulationData | null = {
        boundryYear: 0,
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
            tempPopulationData.boundryYear = data.result.boundryYear;
            tempPopulationData.data =
              tempPopulationData === null
                ? [{ prefCode: pref.prefCode, ...data.result.data }]
                : [
                    ...tempPopulationData.data,
                    { prefCode: pref.prefCode, ...data.result.data },
                  ];
          })
          .catch((error) => {
            console.error("エラー:", error);
          });
      });

      setPopulationData(tempPopulationData);
    };

    getPopulationData();
  }, [prefectures]);

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
