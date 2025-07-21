import { MapboxOverlay } from '@deck.gl/mapbox';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css'
import * as WeatherLayers from 'weatherlayers-gl';

const map = new maplibregl.Map({
  container: 'map',
  style: './style/style.json',
  center: [136.51, 37.88],
  zoom: 4,
  hash: true,
  attributionControl: {
    customAttribution: '<a href="https://www.jmbsc.or.jp/jp/online/c-onlineGsample.html" target="_blank">出典：気象庁「日本近海海流予報格子点資料」（サンプルデータ）を加工して作成</a>',
  }
});

map.on('load', async () => {
  map.addControl(new maplibregl.NavigationControl(), 'top-left');

  const image = await WeatherLayers.loadTextureData('./img/ocean.png');

  const deckOverlay = new MapboxOverlay({
    interleaved: true,
    layers: [
      new WeatherLayers.ParticleLayer({
        id: 'particle',
        numParticles: 5000,
        maxAge: 30,
        speedFactor: 500,
        width: 2.0,
        opacity: 0.05,
        image: image,
        bounds: [120, 20, 160, 50],
        imageUnscale: [-1.4, 1.8],
      }),
    ]
  });

  map.addControl(deckOverlay);
});