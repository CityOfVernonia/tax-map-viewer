import esriConfig from '@arcgis/core/config';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

import Basemap from '@arcgis/core/Basemap';
import BingMapsLayer from '@arcgis/core/layers/BingMapsLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

import App from 'app/App';
import TaxMaps from 'app/widgets/TaxMaps';
import MadeWith from 'cov/widgets/MadeWith';

esriConfig.portalUrl = 'https://gisportal.vernonia-or.gov/portal';

const taxMapsLayer = new MapImageLayer({
  portalItem: {
    id: '9c3b13af5a0b4fe7b57316d14259f893',
  },
  opacity: 0.4,
});

const taxMapBoundaries = new FeatureLayer({
  portalItem: {
    id: '5bbd874a1b4f4674a03ce5ba25e08bf2',
  },
  popupEnabled: false,
});

taxMapBoundaries.when(() => {
  taxMapBoundaries
    .queryExtent({
      where: '1 = 1',
      outSpatialReference: {
        wkid: 102100,
      },
    })
    .then((extent: esri.Extent) => {
      view.goTo(extent);
    })
    .catch();
});

const view = new MapView({
  map: new Map({
    basemap: new Basemap({
      baseLayers: [
        new BingMapsLayer({
          style: 'aerial',
          key: 'Ao8BC5dsixV4B1uhNaUAK_ejjm6jtZ8G3oXQ5c5Q-WtmpORHOMklBvzqSIEXwdxe',
        }),
      ],
    }),
    layers: [taxMapsLayer, taxMapBoundaries],
  }),
  popup: {
    dockEnabled: true,
    dockOptions: {
      position: 'bottom-left',
      breakpoint: false,
    },
  },
  highlightOptions: {
    fillOpacity: 0,
    haloColor: 'red',
    haloOpacity: 0.8,
  },
});

view.when(() => {
  view.ui.add(
    new TaxMaps({
      view,
      taxMapsLayer,
      taxMapBoundaries,
    }),
    'top-right',
  );
  view.ui.add(
    new MadeWith({
      color: '#FFFFFF',
      size: '12px',
    }),
    'bottom-left',
  );
});

const app = new App({
  view,
  title: 'Tax Map Viewer',
  container: document.createElement('div'),
});

document.body.append(app.container);
