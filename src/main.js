
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';
import { MAP_CONFIG, DATE_OPTIONS } from './utils/config.js';
import { DateSelector } from './components/DateSelector.js';
import { ParticleLayerManager } from './components/ParticleLayer.js';

// マップ初期化
const map = new maplibregl.Map({
  container: 'map',
  style: MAP_CONFIG.style,
  center: MAP_CONFIG.center,
  zoom: MAP_CONFIG.zoom,
  hash: true,
  attributionControl: {
    customAttribution: MAP_CONFIG.attribution,
  }
});

// パーティクルレイヤーマネージャー初期化
const particleManager = new ParticleLayerManager(map);

// 日付選択UI初期化
const dateSelector = new DateSelector(async (dateValue) => {
  await particleManager.updateLayer(dateValue);
});

// マップロード時の処理
map.on('load', async () => {
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  
  // デフォルトの日付データを読み込み
  const defaultOption = DATE_OPTIONS.find(option => option.default);
  if (defaultOption) {
    await particleManager.updateLayer(defaultOption.value);
  }
});