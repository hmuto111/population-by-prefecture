import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom"; // jest-dom の便利なマッチャーを使用

import PopulationGraph from "@/app/routes/population-graph";

import {
  getPrefectures,
  getPopulationData,
} from "@/features/population-graph/api/get-prefecture-data";
import { Prefectures } from "@/features/population-graph/components/prefectures";
import { TransitionGraph } from "@/features/population-graph/components/transition-graph";
import { PrefectureTab } from "@/features/population-graph/components/prefecture-tab";
import { PopulationLayout } from "@/components/layout/population-layout"; // レイアウトコンポーネントもモック化

jest.mock("@/features/population-graph/api/get-prefecture-data");

const mockGetPrefectures = getPrefectures as jest.Mock;
const mockGetPopulationData = getPopulationData as jest.Mock;

jest.mock("@/components/layout/population-layout", () => ({
  PopulationLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-layout">{children}</div>
  ),
}));
jest.mock("@/features/population-graph/components/prefectures", () => ({
  Prefectures: jest.fn(() => (
    <div data-testid="mock-prefectures">Mock Prefectures</div>
  )),
}));
jest.mock("@/features/population-graph/components/transition-graph", () => ({
  TransitionGraph: jest.fn(() => (
    <div data-testid="mock-transition-graph">Mock Transition Graph</div>
  )),
}));
jest.mock("@/features/population-graph/components/prefecture-tab", () => ({
  PrefectureTab: jest.fn(() => (
    <div data-testid="mock-prefecture-tab">Mock Prefecture Tab</div>
  )),
}));

const MockPrefectures = Prefectures as jest.Mock;
const MockTransitionGraph = TransitionGraph as jest.Mock;
const MockPrefectureTab = PrefectureTab as jest.Mock;

describe("PopulationGraph Component", () => {
  // userEvent のセットアップ (v14以降推奨)
  const user = userEvent.setup();

  // 各テストケースの実行前にモックの呼び出し履歴などをリセット
  beforeEach(() => {
    mockGetPrefectures.mockClear();
    mockGetPopulationData.mockClear();
    MockPrefectures.mockClear();
    MockTransitionGraph.mockClear();
    MockPrefectureTab.mockClear();
  });

  // --- テストケース 1: 初期表示 ---
  test("renders initial elements correctly", () => {
    // コンポーネントをレンダリング
    render(<PopulationGraph />);

    // 各要素が描画されているか確認
    expect(screen.getByText("Population Graph")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("please api key")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Get Prefectures" })
    ).toBeInTheDocument();

    // モック化された子コンポーネントが表示されているか確認
    expect(screen.getByTestId("mock-layout")).toBeInTheDocument();
    expect(screen.getByTestId("mock-prefectures")).toBeInTheDocument();
    expect(screen.getByTestId("mock-transition-graph")).toBeInTheDocument();
    expect(screen.getByTestId("mock-prefecture-tab")).toBeInTheDocument();

    // 初期状態では API は呼び出されていないことを確認
    expect(mockGetPrefectures).not.toHaveBeenCalled();
    expect(mockGetPopulationData).not.toHaveBeenCalled();
  });
});
