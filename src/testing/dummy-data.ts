export const dummyPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 13, prefName: "東京都" },
];

export const dummyPopulationData = {
  boundryYear: 2020,
  data: [
    {
      prefCode: 1,
      prefName: "北海道",
      0: {
        label: "総人口",
        data: [
          { year: 2000, value: 100 },
          { year: 2001, value: 102 },
        ],
      },
      1: {
        label: "年少人口",
        data: [
          { year: 2000, value: 50 },
          { year: 2001, value: 52 },
        ],
      },
      2: {
        label: "生産年齢人口",
        data: [
          { year: 2000, value: 30 },
          { year: 2001, value: 32 },
        ],
      },
      3: {
        label: "老年人口",
        data: [
          { year: 2000, value: 20 },
          { year: 2001, value: 22 },
        ],
      },
    },
    {
      prefCode: 13,
      prefName: "東京都",
      data: [
        { year: 2000, value: 200 },
        { year: 2001, value: 202 },
      ],
    },
  ],
};
