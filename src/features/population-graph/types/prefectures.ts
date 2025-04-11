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
  data: PopulationCategory[];
};

export type PopulationData = {
  boundryYear: number;
  data: PrefecturePopulation[];
};
