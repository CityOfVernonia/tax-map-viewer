import './main.scss';

import esri = __esri;
import esriConfig from '@arcgis/core/config';
import { watch } from '@arcgis/core/core/watchUtils';
import Color from '@arcgis/core/Color';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Basemap from '@arcgis/core/Basemap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import SearchViewModel from '@arcgis/core/widgets/Search/SearchViewModel';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';
import LocatorSearchSource from '@arcgis/core/widgets/Search/LocatorSearchSource';

import Layout from '@vernonia/core/dist/Layout';
import '@vernonia/core/dist/Layout.css';

import TaxLotPopup from '@vernonia/core/dist/popups/TaxLotPopup';

import TaxMaps from '@vernonia/core/dist/widgets/TaxMaps';
// import '@vernonia/core/dist/widgets/TaxMaps.css';

import PrintSnapshot from '@vernonia/core/dist/widgets/PrintSnapshot';
import '@vernonia/core/dist/widgets/Snapshot.css';

// config portal and auth
esriConfig.portalUrl = 'https://gis.vernonia-or.gov/portal';

// app config and init loading screen
const title = 'Tax Map Viewer';

// basemaps
const basemap = new Basemap({
  portalItem: {
    id: '6e9f78f3a26f48c89575941141fd4ac3',
  },
});

const nextBasemap = new Basemap({
  portalItem: {
    id: '2622b9aecacd401583981410e07d5bb9',
  },
});

const taxLots = new FeatureLayer({
  portalItem: {
    id: 'a0837699982f41e6b3eb92429ecdb694',
  },
  popupTemplate: TaxLotPopup,
});
taxLots.when(() => {
  watch(view, 'map.basemap', (basemap: esri.Basemap) => {
    const tlr = taxLots.renderer as esri.SimpleRenderer;
    const tls = tlr.symbol as esri.SimpleFillSymbol;
    tls.outline.color = basemap === nextBasemap ? new Color([246, 213, 109, 0.5]) : new Color([152, 114, 11, 0.5]);
  });
});

// tax maps
const taxMapBoundaries = new FeatureLayer({
  portalItem: {
    id: '4dfaa44bbaab459cbff5469e8d4b775c',
  },
});
const taxMaps = new MapImageLayer({
  portalItem: {
    id: '19b05d5b4f8545b4acc6c3d0ca900c51',
  },
  opacity: 0.4,
  listMode: 'hide',
  legendEnabled: false,
});

// view
const view = new MapView({
  map: new Map({
    basemap,
    layers: [
      taxMaps,
      taxLots,
      // city limits
      new FeatureLayer({
        portalItem: {
          id: '5e1e805849ac407a8c34945c781c1d54',
        },
      }),
      taxMapBoundaries,
    ],
    ground: 'world-elevation',
  }),
  zoom: 15,
  center: [-123.18291178267039, 45.8616094153766],
  constraints: {
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

new Layout({
  view,
  loaderOptions: {
    title,
  },
  includeDisclaimer: true,
  mapHeadingOptions: {
    logoUrl: 'city_logo_small_white.svg',
    searchViewModel: new SearchViewModel({
      searchAllEnabled: false,
      includeDefaultSources: false,
      locationEnabled: false,
      sources: [
        new LayerSearchSource({
          layer: taxLots,
          outFields: ['*'],
          searchFields: ['ADDRESS'],
          suggestionTemplate: '{ADDRESS}',
          placeholder: 'Tax lot by address',
          name: 'Tax lot by address',
          zoomScale: 3000,
        }),
        new LayerSearchSource({
          layer: taxLots,
          outFields: ['*'],
          searchFields: ['OWNER'],
          suggestionTemplate: '{OWNER}',
          placeholder: 'Tax lot by owner',
          name: 'Tax lot by owner',
          zoomScale: 3000,
        }),
        new LayerSearchSource({
          layer: taxLots,
          outFields: ['*'],
          searchFields: ['ACCOUNT_IDS'],
          suggestionTemplate: '{ACCOUNT_IDS}',
          placeholder: 'Tax lot by tax account',
          name: 'Tax lot by tax account',
          zoomScale: 3000,
        }),
        new LayerSearchSource({
          layer: taxLots,
          outFields: ['*'],
          searchFields: ['TAXLOT_ID'],
          suggestionTemplate: '{TAXLOT_ID}',
          placeholder: 'Tax lot by map and lot',
          name: 'Tax lot by map and lot',
          zoomScale: 3000,
        }),
        new LocatorSearchSource({
          url: 'https://gis.vernonia-or.gov/server/rest/services/LandUse/Vernonia_Address_Locator/GeocodeServer',
          placeholder: 'Vernonia addresses',
          name: 'Vernonia addresses',
        }),
      ],
    }),
  },
  nextBasemap,
  uiWidgets: [
    {
      widget: new TaxMaps({
        view,
        layer: taxMapBoundaries,
        imagery: taxMaps,
      }),
      text: 'Tax Maps',
      icon: 'map',
      active: true,
    },
    {
      widget: new PrintSnapshot({
        view,
        printServiceUrl:
          'https://gis.vernonia-or.gov/server/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
      }),
      text: 'Print',
      icon: 'print',
    },
  ],
});

// view.when(() => { });
