import esri = __esri;
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import { SimpleRenderer } from '@arcgis/core/renderers';
import { SimpleFillSymbol, TextSymbol } from '@arcgis/core/symbols';
import LabelClass from '@arcgis/core/layers/support/LabelClass';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Color from '@arcgis/core/Color';
import SearchViewModel from '@arcgis/core/widgets/Search/SearchViewModel';
import LayerSearchSource from '@arcgis/core/widgets/Search/LayerSearchSource';

export const cityLimits = new FeatureLayer({
  portalItem: {
    id: '5e1e805849ac407a8c34945c781c1d54',
  },
});

export const taxLots = new FeatureLayer({
  portalItem: {
    id: 'a0837699982f41e6b3eb92429ecdb694',
  },
  outFields: ['*'],
  popupTemplate: new PopupTemplate({
    title: '{TAXLOT_ID}',
    content: (event: { graphic: esri.Graphic }): HTMLElement => {
      const { TAXLOT_ID, ACCOUNT_IDS, TAXMAP, ADDRESS, OWNER, ACRES, SQ_FEET } = event.graphic.attributes;

      const address = ADDRESS
        ? `
        <tr>
          <th>Address (Primary Situs)</th>
          <td>${ADDRESS}</td>
        </tr>
      `
        : '';

      const accounts = ACCOUNT_IDS.split(',').map((account: string): string => {
        return `
          <calcite-link href="https://propertyquery.columbiacountyor.gov/columbiaat/MainQueryDetails.aspx?AccountID=${account}&QueryYear=2023&Roll=R" target="_blank">${account}</calcite-link>
        `;
      });

      const taxLotUrl = location.hostname === 'localhost' ? `/tax-lot/?id=${TAXLOT_ID}` : `/tax-lot/${TAXLOT_ID}/`;

      const el = new DOMParser().parseFromString(
        `<table class="esri-widget__table">
          <tr>
            <th>Tax lot</th>
            <td>
              <calcite-link href=${taxLotUrl} target="_blank">${TAXLOT_ID}</calcite-link>
            </td>
          </tr>
          <tr>
            <th>Tax map</th>
            <td>
              <calcite-link href="https://gis.columbiacountymaps.com/TaxMaps/${TAXMAP}.pdf" target="_blank">${TAXMAP}</calcite-link>
            </td>
          </tr>
          <tr>
            <th>Owner</th>
            <td>${OWNER}</td>
          </tr>
          ${address}
          <tr>
            <th>Area</th>
            <td>${ACRES} acres&nbsp;&nbsp;${(SQ_FEET as number).toLocaleString()} sq ft</td>
          </tr>
          <tr>
            <th>Tax account(s)</th>
            <td>
              ${accounts.join('&nbsp;')}
            </td>
          </tr>
        </table>`,
        'text/html',
      );

      return el.body.firstChild as HTMLTableElement;
    },
  }),
});

taxLots.when((): void => {
  const tlr = taxLots.renderer as esri.SimpleRenderer;
  const tls = tlr.symbol as esri.SimpleFillSymbol;
  tls.outline.color = new Color([246, 213, 109, 0.5]);
});

export const searchViewModel = new SearchViewModel({
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
    }),
    new LayerSearchSource({
      layer: taxLots,
      outFields: ['*'],
      searchFields: ['OWNER'],
      suggestionTemplate: '{OWNER}',
      placeholder: 'Tax lot by owner',
      name: 'Tax lot by owner',
    }),
    new LayerSearchSource({
      layer: taxLots,
      outFields: ['*'],
      searchFields: ['ACCOUNT_IDS'],
      suggestionTemplate: '{ACCOUNT_IDS}',
      placeholder: 'Tax lot by tax account',
      name: 'Tax lot by tax account',
    }),
    new LayerSearchSource({
      layer: taxLots,
      outFields: ['*'],
      searchFields: ['TAXLOT_ID'],
      suggestionTemplate: '{TAXLOT_ID}',
      placeholder: 'Tax lot by map and lot',
      name: 'Tax lot by map and lot',
    }),
  ],
});

export const taxMaps = new GeoJSONLayer({
  url: 'https://cityofvernonia.github.io/vernonia-tax-maps/TaxMapBoundaries.geojson',
  outFields: ['*'],
  renderer: new SimpleRenderer({
    symbol: new SimpleFillSymbol({
      color: [0, 0, 0, 0],
      outline: {
        color: 'yellow',
        width: 0.75,
      },
    }),
  }),
  labelingInfo: [
    new LabelClass({
      labelExpressionInfo: {
        expression: '$feature.MAP_NAME',
      },
      symbol: new TextSymbol({
        color: 'yellow',
        haloColor: [0, 0, 0, 0.5],
        haloSize: 1.25,
      }),
    }),
  ],
});

/**
 * Return extents for view.
 * @returns extent and constraint geometry
 */
export const extents = async (): Promise<{ extent: esri.Extent; constraintGeometry: esri.Extent }> => {
  await cityLimits.load();
  const extent = cityLimits.fullExtent.clone();
  return {
    extent,
    constraintGeometry: extent.clone().expand(3),
  };
};
