import { RegionData, PopulationData } from "../types/prefectures";

const url = "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/";

export const getPrefectures = async (apiKey: string) => {
  if (!apiKey) return { result: [] };

  const prefectures = await fetch(url + "prefectures", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("エラー:", error);
      return { result: [] };
    });

  return prefectures;
};

export const getPopulationData = async (
  apiKey: string,
  prefectures: RegionData[],
  setPopulationData: (populationData: PopulationData | null) => void
) => {
  const tempPopulationData: PopulationData | null = {
    boundaryYear: 0,
    data: [],
  };
  prefectures?.forEach((pref) => {
    fetch(url + "population/composition/perYear?prefCode=" + pref.prefCode, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => {
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
