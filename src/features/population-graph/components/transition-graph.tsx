import { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import styles from "@/features/population-graph/styles/contents.module.css";

import { RegionData, PopulationData } from "../types/prefectures";

type Props = {
  prefectures: RegionData[] | null;
  populationData: PopulationData | null;
};

export const TransitionGraph = ({ prefectures, populationData }: Props) => {
  const selectedPref: RegionData[] | null = prefectures
    ? prefectures.filter((pref) => pref.isSelected === true)
    : null;

  const series: Highcharts.SeriesOptionsType[] =
    populationData?.data?.flatMap((pref): Highcharts.SeriesOptionsType[] => {
      const sp = selectedPref?.find((sp) => sp.prefCode === pref.prefCode);

      if (!sp) {
        return [];
      }

      return [
        {
          type: "line",
          name: sp.prefName,
          data: [100], //pref.data.find((c) => c.label === "総人口"),
        },
      ];
    }) ?? [];

  const options: Highcharts.Options = {
    title: {
      text: "都道府県別 総人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series: series,
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div className={styles.graph}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
      />
    </div>
  );
};
