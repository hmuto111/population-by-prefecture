import styles from "@/features/population-graph/styles/contents.module.css";
import { RegionData, Region, Prefecture } from "../types/prefectures";

type Props = {
  prefectures: RegionData;
  setPrefectures: (prefectures: RegionData) => void;
};

export const Prefectures = ({ prefectures, setPrefectures }: Props) => {
  const handleCheck = (pref: string) => {
    const new_prefectures: RegionData = prefectures.region.map(
      (prefecture: Region) => {
        return prefecture.pref.map((p: Prefecture) => {
          if (p.ja === pref) {
            return;
          }
        });
      }
    );
    setPrefectures(new_prefectures);
  };

  return (
    <div className={styles.prefectures_container}>
      <h4>都道府県選択 ※複数可</h4>
      <div className={styles.prefectures_box}></div>
    </div>
  );
};
