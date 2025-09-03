import { MapboxOverlay } from '@deck.gl/mapbox';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css'
import * as WeatherLayers from 'weatherlayers-gl';

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

map.on('load', async () => {
  map.addControl(new maplibregl.NavigationControl(), 'top-left');

  const globalImage = await WeatherLayers.loadTextureData('./img/global.png');

  const deckOverlay = new MapboxOverlay({
    interleaved: true,
    layers: [
      new WeatherLayers.ParticleLayer({
        id: 'particle',
        numParticles: 10000,
        maxAge: 30,
        speedFactor: 500,
        width: 3.0,
        opacity: 0.05,
        image: globalImage,
        bounds: [-179.875, -89.875000, 179.875, 89.875000],
        imageUnscale: [-0.9, 1.1],
      }),
    ]
  });

  map.addControl(deckOverlay);
});