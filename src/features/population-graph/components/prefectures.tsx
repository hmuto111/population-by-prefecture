import styles from "@/features/population-graph/styles/contents.module.css";
import { RegionData } from "../types/prefectures";

type Props = {
  prefectures: RegionData[] | null;
  setPrefectures: (prefectures: RegionData[] | null) => void;
};

export const Prefectures = ({ prefectures, setPrefectures }: Props) => {
  const handleCheck = (name: string) => {
    if (!prefectures) {
      return;
    }

    const newRegions = prefectures.map((pref: RegionData) =>
      pref.prefName === name ? { ...pref, isSelected: !pref.isSelected } : pref
    );
    setPrefectures(newRegions);
  };

  return (
    <div className={styles.prefectures_container}>
      <h4>都道府県選択 ※複数可</h4>
      <div className={styles.prefectures_box}>
        {prefectures &&
          prefectures.map((pref) => (
            <label key={pref.prefCode}>
              <input
                type="checkbox"
                onClick={() => handleCheck(pref.prefName)}
              />
              {pref.prefName}
            </label>
          ))}
      </div>
    </div>
  );
};
