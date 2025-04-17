import {
  getPrefectures,
  getPopulationData,
} from "@/features/population-graph/api/get-prefecture-data";
import { RegionData } from "@/features/population-graph/types/prefectures";

import { dummyPrefectures, dummyPopulationData } from "@/testing/dummy-data";

global.fetch = jest.fn();

describe("test: getPrefectures", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });
  it("正しいAPIキーが渡された場合、都道府県リストを返す", async () => {
    const mockResponse = {
      message: null,
      result: dummyPrefectures,
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const apiKey = "test-api-key";
    const result = await getPrefectures(apiKey);

    expect(fetch).toHaveBeenCalledWith(
      "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("APIキーが空の場合、空の結果を返す", async () => {
    const result = await getPrefectures("");
    expect(result).toEqual({ result: [] });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("APIリクエストが失敗した場合、エラーログを出力して空の結果を返す", async () => {
    const mockError = "APIエラー発生 : getPrefecture";

    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);
    const consoleSpy = jest.spyOn(console, "error");

    const apiKey = "test-api-key";
    const result = await getPrefectures(apiKey);

    expect(fetch).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith("エラー:", mockError);
    expect(result).toEqual({ result: [] });

    consoleSpy.mockRestore();
  });
});

describe("test: getPopulationData", () => {
  let mockSetPopulationData: jest.Mock;
  const mockPrefectures: RegionData[] = dummyPrefectures.map((pref) => ({
    ...pref,
    isSelected: false,
  }));
  const apiKey = "test-api-key";

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    mockSetPopulationData = jest.fn();
  });

  it("都道府県データが渡された場合、各人口構成データを取得してsetPopulationDataを呼び出す", async () => {
    const mockResponseHokkaido = {
      boundaryYear: dummyPopulationData.boundaryYear,
      data: dummyPopulationData.data[0],
    };
    const mockResponseTokyo = {
      boundaryYear: dummyPopulationData.boundaryYear,
      data: dummyPopulationData.data[1],
    };

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({
          message: null,
          result: mockResponseHokkaido,
        }),
      })
      .mockResolvedValueOnce({
        json: jest
          .fn()
          .mockResolvedValueOnce({ message: null, result: mockResponseTokyo }),
      });

    await getPopulationData(apiKey, mockPrefectures, mockSetPopulationData);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );
    expect(fetch).toHaveBeenCalledWith(
      "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=13",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    expect(mockSetPopulationData).toHaveBeenCalledWith({
      boundaryYear: 2020,
      data: [
        {
          prefCode: 1,
          prefName: "北海道",
          "0": mockResponseHokkaido.data[0],
          "1": mockResponseHokkaido.data[1],
          "2": mockResponseHokkaido.data[2],
          "3": mockResponseHokkaido.data[3],
        },
        {
          prefCode: 13,
          prefName: "東京都",
          "0": mockResponseTokyo.data[0],
          "1": mockResponseTokyo.data[1],
          "2": mockResponseTokyo.data[2],
          "3": mockResponseTokyo.data[3],
        },
      ],
    });
  });

  it("APIリクエストが失敗した場合でも、エラーログを出力して処理を継続する", async () => {
    const mockResponseHokkaido = {
      boundaryYear: dummyPopulationData.boundaryYear,
      data: {
        "0": dummyPopulationData.data[0]["0"],
        "1": dummyPopulationData.data[0]["1"],
        "2": dummyPopulationData.data[0]["2"],
        "3": dummyPopulationData.data[0]["3"],
      },
    };
    const mockError = "APIエラー発生 : getPopulationData";
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        message: null,
        json: jest.fn().mockResolvedValueOnce({
          message: null,
          result: mockResponseHokkaido,
        }),
      })
      .mockRejectedValueOnce(mockError);
    const consoleSpy = jest.spyOn(console, "error");

    await getPopulationData(apiKey, mockPrefectures, mockSetPopulationData);

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(mockSetPopulationData).toHaveBeenCalledWith({
      boundaryYear: dummyPopulationData.boundaryYear,
      data: [dummyPopulationData.data[0]],
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      `都道府県コード ${mockPrefectures[1].prefCode} のデータ取得でエラー:`,
      mockError
    );

    consoleSpy.mockRestore();
  });

  it("都道府県データが空の場合、空のデータが返される", async () => {
    await getPopulationData(apiKey, [], mockSetPopulationData);
    expect(fetch).not.toHaveBeenCalled();
    expect(mockSetPopulationData).toHaveBeenCalledWith({
      boundaryYear: 0,
      data: [],
    });
  });
});
