# Copilot Instructions - Ocean Current Visualization

## Project Overview
This is a web-based ocean current visualization using MapLibre GL JS, Deck.gl, and weatherlayers-gl to display particle-based ocean current data from NOAA Global RTOFS.

## Architecture & Key Components

### Core Stack
- **MapLibre GL JS**: Base map rendering with Japanese GSI tile service background
- **Deck.gl**: WebGL-powered particle layer rendering via `@deck.gl/mapbox` overlay
- **weatherlayers-gl**: Custom weather visualization library providing `ParticleLayer`
- **Vite**: Build tool with GitHub Pages deployment target

### Data Pipeline
- Ocean current data is processed into PNG format (`public/img/global.png`)
- Data comes from `~/src/grib2rgb/` processing pipeline (external to this repo)
- Image bounds: `[-179.875, -89.875, 179.875, 89.875]` with unscaling `[-0.9, 1.1]`
- Move processed data with: `mv ~/src/grib2rgb/ocean.png ./public/img/global.png`

### Key Files
- `src/main.js`: Single entry point - map initialization, particle layer setup
- `public/style/style.json`: MapLibre style using GSI seamless photo tiles
- `vite.config.js`: Base path set to `/maplibre-ocean-current/` for GitHub Pages

## Development Patterns

### Particle Layer Configuration
```javascript
new WeatherLayers.ParticleLayer({
  id: 'particle',
  numParticles: 10000,    // Performance vs quality trade-off
  maxAge: 30,             // Particle lifecycle
  speedFactor: 500,       // Animation speed multiplier
  width: 3.0,             // Particle trail width
  opacity: 0.05,          // Low opacity for better blending
})
```

### Map Setup
- Default center: `[137, 36.9]` (Japan-centered view)
- Hash-based URL state persistence enabled
- Custom attribution for NOAA data source required
- Japanese GSI tiles as base layer (not OpenStreetMap)

## Deployment Workflow
1. **Local Development**: `npm run dev` (Vite dev server)
2. **Build**: `npm run build` (outputs to `dist/`)  
3. **Deploy**: `npm run deploy` (gh-pages to GitHub Pages)
4. **Auto-deploy**: GitHub Actions on push to main branch

## Data Update Process
1. Process GRIB data externally using `grib2rgb` tool
2. Move resulting PNG: `mv ~/src/grib2rgb/ocean.png ./public/img/global.png`
3. Commit and push to trigger auto-deployment

## Performance Considerations
- Particle count (`numParticles: 10000`) balances performance vs visual quality
- Low opacity (`0.05`) prevents oversaturation with many particles
- `interleaved: true` on MapboxOverlay for better rendering performance
- Single large texture image rather than tiled approach for ocean data

## Styling Notes
- Full-screen map with zero margins/padding
- Light gray background (`rgba(223, 223, 223, 0.733)`) visible during loading
- Japanese language HTML (`lang="ja"`)
- GSI (Geospatial Information Authority of Japan) tiles as base layer
