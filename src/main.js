
import { MapboxOverlay } from '@deck.gl/mapbox';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';
import * as WeatherLayers from 'weatherlayers-gl';

// ラジオボタンUIを追加
window.addEventListener('DOMContentLoaded', () => {
  const uiDiv = document.createElement('div');
  uiDiv.style.position = 'absolute';
  uiDiv.style.top = '10px';
  uiDiv.style.left = '10px';
  uiDiv.style.zIndex = '1000';
  uiDiv.style.background = 'rgba(255,255,255,0.8)';
  uiDiv.style.padding = '8px 12px';
  uiDiv.style.borderRadius = '6px';
  uiDiv.style.display = 'flex';
  uiDiv.style.flexDirection = 'column';
  uiDiv.style.gap = '4px';

  // 2025/9/1 ラジオボタン
  const radio1Container = document.createElement('div');
  radio1Container.style.display = 'flex';
  radio1Container.style.alignItems = 'center';
  
  const radio1 = document.createElement('input');
  radio1.type = 'radio';
  radio1.name = 'dateSelect';
  radio1.id = 'date20250901';
  radio1.value = '20250901';
  radio1.checked = true;

  const label1 = document.createElement('label');
  label1.htmlFor = 'date20250901';
  label1.textContent = '2025/9/1';
  label1.style.marginLeft = '6px';

  radio1Container.appendChild(radio1);
  radio1Container.appendChild(label1);

  // 2025/3/1 ラジオボタン
  const radio2Container = document.createElement('div');
  radio2Container.style.display = 'flex';
  radio2Container.style.alignItems = 'center';
  
  const radio2 = document.createElement('input');
  radio2.type = 'radio';
  radio2.name = 'dateSelect';
  radio2.id = 'date20250301';
  radio2.value = '20250301';

  const label2 = document.createElement('label');
  label2.htmlFor = 'date20250301';
  label2.textContent = '2025/3/1';
  label2.style.marginLeft = '6px';

  radio2Container.appendChild(radio2);
  radio2Container.appendChild(label2);

  // 2024/9/1 ラジオボタン
  const radio3Container = document.createElement('div');
  radio3Container.style.display = 'flex';
  radio3Container.style.alignItems = 'center';
  
  const radio3 = document.createElement('input');
  radio3.type = 'radio';
  radio3.name = 'dateSelect';
  radio3.id = 'date20240901';
  radio3.value = '20240901';

  const label3 = document.createElement('label');
  label3.htmlFor = 'date20240901';
  label3.textContent = '2024/9/1';
  label3.style.marginLeft = '6px';

  radio3Container.appendChild(radio3);
  radio3Container.appendChild(label3);

  uiDiv.appendChild(radio1Container);
  uiDiv.appendChild(radio2Container);
  uiDiv.appendChild(radio3Container);
  document.body.appendChild(uiDiv);
});


const map = new maplibregl.Map({
  container: 'map',
  style: './style/style.json',
  center: [137, 36.9],
  zoom: 1,
  hash: true,
  attributionControl: {
    customAttribution: '<a href="https://polar.ncep.noaa.gov/global/" target="_blank">NOAA Global RTOFS</a>',
  }
});


let deckOverlay = null;
let currentImagePath = './img/global_20250901.png';

async function updateParticleLayer(imagePath) {
  const globalImage = await WeatherLayers.loadTextureData(imagePath);
  
  // 各データに応じて異なるimageUnscaleを使用
  let imageUnscale;
  if (imagePath.includes('20250301')) {
    imageUnscale = [-1.3, 1.2];
  } else if (imagePath.includes('20240901')) {
    imageUnscale = [-1.2, 1.2];
  } else {
    imageUnscale = [-0.9, 1.1]; // 20250901のデフォルト
  }
  
  // 画面サイズに応じてパーティクル数を調整
  let numParticles;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenArea = screenWidth * screenHeight;
  
  if (screenWidth <= 480 || screenArea < 500000) {
    // スマホサイズまたは小画面: 少ないパーティクル
    numParticles = 2000;
  } else if (screenWidth <= 768 || screenArea < 1000000) {
    // タブレットサイズ: 中程度のパーティクル
    numParticles = 5000;
  } else {
    // デスクトップサイズ: 多いパーティクル
    numParticles = 10000;
  }
  
  const particleLayer = new WeatherLayers.ParticleLayer({
    id: 'particle',
    numParticles: numParticles,
    maxAge: 30,
    speedFactor: 500,
    width: 3.0,
    opacity: 0.05,
    image: globalImage,
    bounds: [-179.875, -89.875000, 179.875, 89.875000],
    imageUnscale: imageUnscale,
  });

  if (deckOverlay) {
    deckOverlay.setProps({ layers: [particleLayer] });
  } else {
    deckOverlay = new MapboxOverlay({
      interleaved: true,
      layers: [particleLayer]
    });
    map.addControl(deckOverlay);
  }
}

map.on('load', async () => {
  map.addControl(new maplibregl.NavigationControl(), 'top-right');
  await updateParticleLayer(currentImagePath);

  // ラジオボタンイベント
  const radios = document.querySelectorAll('input[name="dateSelect"]');
  radios.forEach(radio => {
    radio.addEventListener('change', async (e) => {
      if (e.target.checked) {
        if (e.target.value === '20250901') {
          currentImagePath = './img/global_20250901.png';
        } else if (e.target.value === '20250301') {
          currentImagePath = './img/global_20250301.png';
        } else if (e.target.value === '20240901') {
          currentImagePath = './img/global_20240901.png';
        }
        await updateParticleLayer(currentImagePath);
      }
    });
  });
});