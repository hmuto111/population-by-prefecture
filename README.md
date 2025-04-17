# 都道府県別総人口推移グラフ

## 概要

このプロジェクトは、API から取得した各都道府県人口データに基づき、都道府県別の総人口推移グラウで表示するウェブアプリケーションです。ユーザーは表示したい都道府県を選択し、その人口構成（総人口、年少人口、生産年齢人口、老年人口）の推移を視覚的に比較できます。

## 目次

- [使用技術](#使用技術)
- [ディレクトリ構成](#ディレクトリ構成)
- [環境構築手順](#環境構築手順)
- [参考記事](#参考記事)

## 使用技術

- **フロントエンド:** React, TypeScript
- **ビルドツール:** Vite
- **グラフ描画:** Highcharts
- **テスト** Jest, React Testing Library
- **スタイリング** CSS Modules

## ディレクトリ構成

```
src
├── app                     # アプリケーションのルートディレクトリ
│   └── routes              # アプリケーションの各ページを格納する
├── assets                  # 画像やフォントなど静的ファイルを格納する
├── components              # アプリケーションに共通なコンポーネントを格納する
├── config                  # パスなどのグローバルな設定を格納する
├── features                # 機能ごとのモジュールを格納
│   ├── home
│   │   ├── components
│   │   └── styles
│   └── population-graph
│       ├── api             # 機能で使用するAPI関連のモジュールを格納
│       ├── components      # 機能で使用するコンポーネントを格納
│       ├── data            # 機能で使用するデータを格納
│       ├── styles          # 機能で使用するスタイルを格納
│       └── types           # 機能で使用する型定義を格納
│
├── styles                  # アプリケーションに共通なスタイルを格納する
└── testing                 # テスト用のモジュールを格納する
    └── population-graph    # 機能ごとのテストを格納する
        └── api             # 機能で使用するAPI関連モジュールのテストを格納する
```

## 環境構築手順

### 前提条件

- Node.js (v23.x 以上推奨 ※開発時の環境が v23.11.0 のため)
- pnpm
- API キー(対象のページにて入力)
  - [https://yumemi-frontend-engineer-codecheck-api.vercel.app/api-doc](https://yumemi-frontend-engineer-codecheck-api.vercel.app/api-doc)から API キーを取得してください。

### インストール

1. リポジトリをクローン

```bash
git clone <リポジトリURL>
cd population-by-prefecture
```

2. 依存関係をインストール

```bash
pnpm install
# または pnpm i
```

### 開発サーバの起動とテストの実行

- 開発サーバを起動する場合、以下を実行

```bash
pnpm dev
```

- テストを実行する場合、以下を実行

```bash
pnpm test
```

## 参考記事

- ディレクトリ構成参考

  - [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)

- README 参考

  - [エンジニアが開発しやすい環境作りをする](https://zenn.dev/sutamac/articles/5a262f0096176a)

- コミットメッセージ参考
  - [僕が考える最強のコミットメッセージの書き方](https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e)
