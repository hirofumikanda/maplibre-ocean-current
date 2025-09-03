# MapLibre Ocean Current Visualization

WebベースのNOAAグローバル海流データ可視化アプリケーション

## 概要

このプロジェクトは、NOAA Global RTOFS（Real-Time Ocean Forecast System）の海流データ（バロトロピック流速）を、パーティクルアニメーションとして可視化するWebアプリケーションです。日本を中心とした地図上で、全世界の海流の動きを美しいパーティクル効果で表示します。

## 主な機能

- 🌊 **リアルタイム海流可視化**: NOAA RTOFSデータを基にした海流パーティクル表示
- 🗺️ **高品質地図**: 国土地理院の航空写真タイルを背景に使用
- ⚡ **高性能レンダリング**: WebGLを活用した滑らかな10,000パーティクルアニメーション
- 📱 **レスポンシブ対応**: デスクトップ・モバイルに対応
- 🔗 **URL状態管理**: ハッシュベースの位置・ズーム状態保持
- 🚀 **自動デプロイ**: GitHub Actionsによる自動ビルド・デプロイ

## 技術スタック

### フロントエンド
- **MapLibre GL JS** (v5.6.1): オープンソース地図ライブラリ
- **Deck.gl** (v9.1.13): WebGL対応データ可視化フレームワーク
- **weatherlayers-gl** (v2025.7.2): 気象データ専用可視化ライブラリ

### ビルド・デプロイ
- **Vite** (v7.0.4): 高速ビルドツール
- **GitHub Pages**: ホスティングプラットフォーム
- **GitHub Actions**: CI/CDパイプライン

### データソース
- **NOAA Global RTOFS**: 全球海流予測システム
- **国土地理院**: 日本の航空写真タイル

## 使用データ

### 海流データ
- **データ元**: [NOAA Global RTOFS](https://polar.ncep.noaa.gov/global/)
- **データ種別**: バロトロピック流速 U/V
- **データ範囲**: グローバル（緯度経度：-179.875°～179.875°、-89.875°～89.875°）
- **形式**: NetCDF形式 >>> GRIB2形式 >>> PNG画像に変換して利用

### 地図タイル
- **背景地図**: [国土地理院 地理院タイル（航空写真）](https://maps.gsi.go.jp/development/ichiran.html#seamlessphoto)

## デモ

[GitHub Pagesで公開中](https://hirofumikanda.github.io/maplibre-ocean-current/)

## 開発環境のセットアップ

### 必要な環境
- Node.js 22.x以上
- npm 

### インストール手順

1. **リポジトリのクローン**
```bash
git clone https://github.com/hirofumikanda/maplibre-ocean-current.git
cd maplibre-ocean-current
```

2. **依存関係のインストール**
```bash
npm install
```

3. **開発サーバーの起動**
```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスして確認してください。

## データ更新プロセス

海流データの更新は外部の[grib2png](https://github.com/naogify/grib2png.sh)ツールで処理しています：

### 変換コマンド例
```bash
./grib2uv2png.sh uv_curr_ll.grb2 \
  -o global.png \
  -u ":UOGRD:" \
  -v ":VOGRD:" \
  -scale -0.9 1.1
```

## パフォーマンス調整

### パーティクル設定
`src/main.js` で以下のパラメータを調整可能：

```javascript
new WeatherLayers.ParticleLayer({
  numParticles: 10000,    // パーティクル数（性能 vs 品質）
  maxAge: 30,             // パーティクル寿命
  speedFactor: 500,       // アニメーション速度
  width: 3.0,             // パーティクル軌跡の太さ
  opacity: 0.05,          // 透明度（重複時のブレンド調整）
})
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 謝辞

このプロジェクトは以下のプロジェクトにインスパイアされて、海流データについて可視化を試みたものです。

[jma-wind-map](https://github.com/naogify/jma-wind-map)