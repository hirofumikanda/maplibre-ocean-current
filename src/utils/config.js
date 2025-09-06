// 設定データとユーティリティ関数

export const MAP_CONFIG = {
  center: [137, 36.9],
  zoom: 1,
  style: './style/style.json',
  attribution: '<a href="https://polar.ncep.noaa.gov/global/" target="_blank">NOAA Global RTOFS</a>'
};

export const PARTICLE_CONFIG = {
  maxAge: 30,
  speedFactor: 500,
  width: 3.0,
  opacity: 0.05,
  bounds: [-179.875, -89.875000, 179.875, 89.875000]
};

export const DATE_OPTIONS = [
  {
    id: 'date20250901',
    value: '20250901',
    label: '2025/9/1',
    imagePath: './img/global_20250901.png',
    imageUnscale: [-0.9, 1.1],
    default: true
  },
  {
    id: 'date20250301',
    value: '20250301',
    label: '2025/3/1',
    imagePath: './img/global_20250301.png',
    imageUnscale: [-1.3, 1.2]
  },
  {
    id: 'date20240901',
    value: '20240901',
    label: '2024/9/1',
    imagePath: './img/global_20240901.png',
    imageUnscale: [-1.2, 1.2]
  }
];

// 画面サイズに応じたパーティクル数を計算
export function calculateNumParticles() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenArea = screenWidth * screenHeight;
  
  if (screenWidth <= 480 || screenArea < 500000) {
    return 2000; // スマホサイズ
  } else if (screenWidth <= 768 || screenArea < 1000000) {
    return 5000; // タブレットサイズ
  } else {
    return 10000; // デスクトップサイズ
  }
}

// 日付値から設定を取得
export function getDateConfig(dateValue) {
  return DATE_OPTIONS.find(option => option.value === dateValue);
}
