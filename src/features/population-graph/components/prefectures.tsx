import styles from "@/features/population-graph/styles/contents.module.css";
import { RegionData, RegionKey } from "../types/prefectures";
import { Regions } from "../data/region";

type Props = {
  prefectures: RegionData[] | null;
  setPrefectures: (prefectures: RegionData[] | null) => void;
  region: RegionKey | "all";
  setRegion: (region: RegionKey | "all") => void;
};

export const Prefectures = ({
  prefectures,
  setPrefectures,
  region,
  setRegion,
}: Props) => {
  const handleCheck = (name: string) => {
    if (!prefectures) {
      return;
    }

    const newPrefectures = prefectures.map((pref: RegionData) =>
      pref.prefName === name ? { ...pref, isSelected: !pref.isSelected } : pref
    );
    setPrefectures(newPrefectures);
  };

  const handleReset = () => {
    if (!prefectures) {
      return;
    }

    const resetPrefectures = prefectures.map((pref: RegionData) => ({
      ...pref,
      isSelected: false,
    }));
    setPrefectures(resetPrefectures);
  };

  return (
    <div className={styles.prefectures_container}>
      <h4>都道府県選択 ※複数可</h4>
      <div className={styles.option_wrap}>
        <div className={styles.select_region}>
          <label>地方で絞り込む</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as RegionKey | "all")}
          >
            <option value={"all"} selected>
              -
            </option>
            <option value={"北海道"}>北海道</option>
            <option value={"東北"}>東北</option>
            <option value={"関東"}>関東</option>
            <option value={"中部"}>中部</option>
            <option value={"近畿"}>近畿</option>
            <option value={"中国"}>中国</option>
            <option value={"四国"}>四国</option>
            <option value={"九州"}>九州</option>
          </select>
        </div>

        <button className={styles.reset} onClick={handleReset}>
          選択をリセット
        </button>
      </div>

      <div className={styles.prefectures_box}>
        {prefectures &&
          prefectures.map((pref) => {
            if (region === "all") {
              return (
                <label key={pref.prefCode}>
                  <input
                    type="checkbox"
                    onClick={() => handleCheck(pref.prefName)}
                    checked={pref.isSelected}
                  />
                  {pref.prefName}
                </label>
              );
            } else if (Regions[region].includes(pref.prefName as never)) {
              return (
                <label key={pref.prefCode}>
                  <input
                    type="checkbox"
                    onClick={() => handleCheck(pref.prefName)}
                    checked={pref.isSelected}
                  />
                  {pref.prefName}
                </label>
              );
            } else return null;
          })}
      </div>
    </div>
  );
};
