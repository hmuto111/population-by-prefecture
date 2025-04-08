export type Prefecture = {
  code: number;
  name: string;
  ja: string;
  isSelect: boolean;
};

export type Region = {
  code: number;
  name: string;
  ja: string;
  pref: Prefecture[];
};

export type RegionData = {
  region: Region[];
};
