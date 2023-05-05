import './main.scss';

// esri config and auth
import esriConfig from '@arcgis/core/config';

// map, view and layers
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Basemap from '@arcgis/core/Basemap';

// application layout
import MapApplication from '@vernonia/map-application/dist/MapApplication';

// widgets
import TaxMaps from '@vernonia/core/dist/widgets/TaxMaps';
import PrintSnapshot from '@vernonia/core/dist/widgets/PrintSnapshot';

// config portal and auth
esriConfig.portalUrl = 'https://gis.vernonia-or.gov/portal';

const load = async () => {
  // layers and friends
  const { extents, cityLimits, taxLots, searchViewModel, taxMaps } = await import('./layers');
  const { extent, constraintGeometry } = await extents();

  // view
  const view = new MapView({
    map: new Map({
      basemap: new Basemap({
        portalItem: {
          id: '2622b9aecacd401583981410e07d5bb9',
        },
      }),
      layers: [taxLots, taxMaps, cityLimits],
    }),
    extent,
    constraints: {
      geometry: constraintGeometry,
      minScale: 40000,
      rotationEnabled: false,
    },
    popup: {
      dockEnabled: true,
      dockOptions: {
        position: 'bottom-left',
        breakpoint: false,
      },
    },
  });

  new MapApplication({
    contentBehind: true,
    title: 'Tax Map Viewer',
    panelPosition: 'end',
    panelWidgets: [
      {
        widget: new TaxMaps({
          view,
          layer: taxMaps,
          imageUrlTemplate: 'https://cityofvernonia.github.io/vernonia-tax-maps/tax-maps/jpg/{taxmap}.jpg',
          titleAttributeField: 'name',
          fileAttributeField: 'taxmap',
          urlAttributeField: 'county_url',
          showSwitch: false,
        }),
        text: 'Tax Maps',
        icon: 'tile-layer',
        type: 'calcite-panel',
        open: true,
      },
      {
        widget: new PrintSnapshot({ view, printServiceUrl: '' }),
        text: 'Print',
        icon: 'print',
        type: 'calcite-panel',
      },
    ],
    searchViewModel,
    view,
  });
};

load();
