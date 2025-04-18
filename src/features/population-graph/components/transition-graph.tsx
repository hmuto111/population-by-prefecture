import { useRef, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import styles from "@/features/population-graph/styles/contents.module.css";

import { RegionData, PopulationData } from "../types/prefectures";

type Props = {
  prefectures: RegionData[] | null;
  populationData: PopulationData | null;
  label: "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
};

export const TransitionGraph = ({
  prefectures,
  populationData,
  label,
}: Props) => {
  const [options, setOptions] = useState<Highcharts.Options>({
    chart: {
      height: "100%",
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: "都道府県別 人口推移",
    },
    xAxis: {
      title: {
        text: "年度",
      },
    },
    yAxis: {
      labels: {
        formatter: function () {
          return Highcharts.numberFormat(
            Number(this.value) / 10000,
            0,
            ".",
            ","
          );
        },
      },
      title: {
        text: "人口数 (万人)",
      },
    },
    legend: {
      align: "right",
      verticalAlign: "middle",
      layout: "vertical",
    },
    series: [],
  });

  useEffect(() => {
    if (!prefectures || !populationData?.data) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        series: [],
      }));
      return;
    }

    const selectedPref = prefectures
      ? prefectures.filter((pref) => pref.isSelected === true)
      : null;

    const selectedPopulationData = populationData?.data.filter((pref) =>
      selectedPref?.some(
        (selectedPref) => selectedPref.prefCode === pref.prefCode
      )
    );

    const years: string[] = selectedPopulationData?.[0]?.[0]?.data
      ?.map((item) =>
        String(item.year <= populationData.boundaryYear && item.year)
      )
      ?.filter((item) => item !== "false");

    const series: Highcharts.SeriesOptionsType[] =
      (selectedPopulationData
        ?.map((pref) => {
          const key = { 総人口: 0, 年少人口: 1, 生産年齢人口: 2, 老年人口: 3 };

          return {
            type: "line",
            name: pref.prefName,
            data: pref[key[label]].data
              .slice(0, years.length)
              .map((item) => item.value),
          };
        })
        .filter((item) => item !== null) as Highcharts.SeriesOptionsType[]) ??
      [];

    setOptions((prevOptions) => ({
      ...prevOptions,
      xAxis: {
        ...prevOptions.xAxis,
        categories: years,
      },
      series: series,
    }));
  }, [prefectures, populationData, label]);

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
