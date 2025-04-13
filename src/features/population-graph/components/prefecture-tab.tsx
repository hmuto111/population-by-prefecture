import { useState } from "react";
import styles from "../styles/tab.module.css";
import { Label } from "../types/prefectures";

type Props = {
  setLabel: (label: Label) => void;
};

export const PrefectureTab = ({ setLabel }: Props) => {
  const tabs: {
    id: number;
    label: Label;
  }[] = [
    { id: 1, label: "総人口" },
    { id: 2, label: "年少人口" },
    { id: 3, label: "生産年齢人口" },
    { id: 4, label: "老年人口" },
  ];
  const [activeTab, setActiveTab] = useState<number>(tabs[0].id);

  const handleTabClick = (id: number, label: Label) => {
    setActiveTab(id);
    setLabel(label);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tab_buttons}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.label)}
            className={activeTab === tab.id ? styles.active : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
