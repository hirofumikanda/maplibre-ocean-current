# Maplibre-Ocean-Current

- [jma-wind-map](https://github.com/naogify/jma-wind-map)を参考にして作成

- [気象庁「日本近海海流予報格子点資料サンプルデータ」](https://www.jmbsc.or.jp/jp/online/c-onlineGsample.html)（GRIB2）から海流ベクトル（U、V）データを取得しRGBエンコーディングしたPNGを地図上に可視化

- [grib2 to RGB Encode PNG tools](https://github.com/naogify/grib2png.sh) を使って PNG 画像を作成

## デモURL
https://hirofumikanda.github.io/maplibre-ocean-current/

## 使い方

```bash
git clone https://github.com/hirofumikanda/maplibre-ocean-current.git
cd maplibre-ocean-current
npm install
npm run dev
```

## 参考
このプロジェクトは以下のプロジェクトをクローンして、海流データについて可視化を試みたものです。

- https://github.com/naogify/jma-wind-map