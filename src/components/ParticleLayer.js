import { MapboxOverlay } from '@deck.gl/mapbox';
import * as WeatherLayers from 'weatherlayers-gl';
import { PARTICLE_CONFIG, calculateNumParticles, getDateConfig } from '../utils/config.js';

export class ParticleLayerManager {
  constructor(map) {
    this.map = map;
    this.deckOverlay = null;
  }

  async updateLayer(dateValue) {
    const config = getDateConfig(dateValue);
    if (!config) {
      console.error('Invalid date value:', dateValue);
      return;
    }

    try {
      const globalImage = await WeatherLayers.loadTextureData(config.imagePath);
      const numParticles = calculateNumParticles();

      const particleLayer = new WeatherLayers.ParticleLayer({
        id: 'particle',
        numParticles: numParticles,
        maxAge: PARTICLE_CONFIG.maxAge,
        speedFactor: PARTICLE_CONFIG.speedFactor,
        width: PARTICLE_CONFIG.width,
        opacity: PARTICLE_CONFIG.opacity,
        image: globalImage,
        bounds: PARTICLE_CONFIG.bounds,
        imageUnscale: config.imageUnscale,
      });

      this.updateOverlay(particleLayer);
    } catch (error) {
      console.error('Failed to update particle layer:', error);
    }
  }

  updateOverlay(particleLayer) {
    if (this.deckOverlay) {
      this.deckOverlay.setProps({ layers: [particleLayer] });
    } else {
      this.deckOverlay = new MapboxOverlay({
        interleaved: true,
        layers: [particleLayer]
      });
      this.map.addControl(this.deckOverlay);
    }
  }
}
