export type RegionData = {
  prefCode: number;
  prefName: string;
  isSelected: boolean;
};

export type PopulationPerYear = {
  year: number;
  value: number;
};

export type PopulationCategory = {
  label: string;
  data: PopulationPerYear[];
};

export type PrefecturePopulation = {
  prefCode: number;
  prefName: string;
  [key: number]: PopulationCategory;
};

export type PopulationData = {
  boundaryYear: number;
  data: PrefecturePopulation[];
};

export type Label = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
