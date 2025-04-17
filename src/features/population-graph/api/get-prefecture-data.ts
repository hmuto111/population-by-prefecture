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
  const tempPopulationData: PopulationData = {
    boundaryYear: 0,
    data: [],
  };

  if (prefectures.length === 0) {
    setPopulationData(tempPopulationData);
    return;
  }

  const fetchPromises: Promise<void>[] = prefectures.map(async (pref) => {
    try {
      const res = await fetch(
        url + "population/composition/perYear?prefCode=" + pref.prefCode,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );

      const data = await res.json();

      if (tempPopulationData.boundaryYear === 0 && data.result.boundaryYear) {
        tempPopulationData.boundaryYear = data.result.boundaryYear;
      }

      tempPopulationData.data.push({
        prefCode: pref.prefCode,
        prefName: pref.prefName,
        ...data.result.data,
      });
    } catch (error) {
      console.error(
        `都道府県コード ${pref.prefCode} のデータ取得でエラー:`,
        error
      );
    }
  });

  await Promise.all(fetchPromises)
    .then(() => {
      setPopulationData(tempPopulationData);
    })
    .catch((error) => {
      console.error("人口データ反映処理でエラーが発生しました:", error);
      setPopulationData(tempPopulationData);
    });
};
