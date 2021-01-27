interface PrintResult extends Object {
  state: string;
  url: null | string;
}

import app = __app;

import { whenOnce } from '@arcgis/core/core/watchUtils';

import { property, subclass } from '@arcgis/core/core/accessorSupport/decorators';

import { renderable, tsx } from '@arcgis/core/widgets/support/widget';

import Widget from '@arcgis/core/widgets/Widget';

import TaxMapPopup from './TaxMapPopup';

import PrintViewModel from '@arcgis/core/widgets/Print/PrintViewModel';
import PrintTemplate from '@arcgis/core/tasks/support/PrintTemplate';

import { intersects } from '@arcgis/core/geometry/geometryEngine';

import { filePdf16 } from '@esri/calcite-ui-icons/js/filePdf16';
import { fileImage16 } from '@esri/calcite-ui-icons/js/fileImage16';
import { print16 } from '@esri/calcite-ui-icons/js/print16';

const CSS = {
  base: 'tax-maps-widget esri-widget',
  label: 'tax-maps-widget--label',
  button: 'esri-button',
  select: 'esri-select',
  slider: 'tax-map-widget--slider',
  sliderLabels: 'tax-map-widget--slider--labels',
  buttonRow: 'tax-maps-widget--button-row',
  printResults: 'tax-maps-widget--print-results',
  printResult: 'tax-maps-widget--print-result',
  printError: 'tax-maps-widget--print-error',
  icons: {
    printing: 'esri-icon-loading-indicator esri-rotating',
    download: 'esri-icon-download',
    error: 'esri-icon-error',
  },
};

let KEY = 0;

@subclass('app.widgets.TaxMaps')
export default class TaxMaps extends Widget {
  @property()
  view!: esri.MapView;

  @property()
  taxMapsLayer!: esri.MapImageLayer;

  @property()
  taxMapBoundaries!: esri.FeatureLayer;

  @property()
  private _initError = false;

  @property()
  private _options = [
    <option key={KEY++} selected={true} value="none,0,0,0">
      None
    </option>,
  ];

  @property()
  @renderable()
  private _selectedTaxMap: string[] | null = null;

  @property()
  private _extents: {
    [key: string]: esri.Extent;
  } = {};

  @property()
  private _printer = new PrintViewModel({
    printServiceUrl:
      'https://gisportal.vernonia-or.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
  });

  @property()
  @renderable()
  private _printResults: Array<PrintResult> = [];

  constructor(properties?: app.TaxMapsProperties) {
    super(properties);
    whenOnce(this, 'taxMapBoundaries.loaded', this._init.bind(this));
  }

  private async _init(): Promise<void> {
    const { taxMapBoundaries, _options, _printer, view } = this;

    taxMapBoundaries
      .queryFeatures({
        where: '1 = 1',
        returnGeometry: false,
        outFields: ['*'],
      })
      .then((results: esri.FeatureSet) => {
        results.features.forEach((feature: esri.Graphic) => {
          const {
            attributes: { name, alias, taxmap, filename },
          } = feature;

          _options.push(
            <option key={KEY++} value={`${name},${alias},${taxmap},${filename}`}>
              {alias}
            </option>,
          );
        });
      })
      .catch((): void => {
        this._initError = true;
      });

    taxMapBoundaries.popupTemplate = new TaxMapPopup();

    _printer.view = view;
  }

  private _selectTaxMap(evt: Event): void {
    const {
      view,
      taxMapBoundaries,
      taxMapsLayer: { sublayers },
      _extents,
    } = this;

    let value: string | string[] = (evt.target as HTMLSelectElement).value;
    value = value.split(',');
    const [name, , , filename] = value;

    if (name === 'none') {
      sublayers.getItemAt(0).sublayers.forEach((sublayer: esri.Sublayer) => (sublayer.visible = false));
      this._selectedTaxMap = null;
      return;
    }

    this._selectedTaxMap = value;

    sublayers.getItemAt(0).sublayers.forEach((sublayer: esri.Sublayer) => {
      sublayer.visible = sublayer.title === filename;
    });

    taxMapBoundaries
      .queryExtent({
        where: `name = '${name}'`,
        outSpatialReference: {
          wkid: 102100,
        },
      })
      .then((extent: esri.Extent) => {
        view.goTo(extent);
        if (!_extents[name]) {
          _extents[name] = extent;
        }
      })
      .catch();
  }

  private _changeOpacity(evt: Event): void {
    this.taxMapsLayer.opacity = parseFloat((evt.target as HTMLInputElement).value);
  }

  private _download(type: string): void {
    const [, , taxmap] = this._selectedTaxMap as string[];
    window.open(`./tax-maps/${type}/${taxmap}.${type}`, '_blank');
  }

  private _print() {
    const { _printer, _extents, view, _printResults } = this;
    const [name] = this._selectedTaxMap as string[];

    if (!intersects(view.extent, _extents[name].extent) || view.scale > 50000) {
      return;
    }

    const printResult: PrintResult = {
      state: 'printing',
      url: null,
    };
    _printResults.push(printResult);

    _printer
      .print(
        new PrintTemplate({
          format: 'pdf',
          layout: 'letter-ansi-a-landscape',
        }),
      )
      .then((result: any): void => {
        console.log(result);
        printResult.state = 'printed';
        printResult.url = result.url;
      })
      .catch((error: any): void => {
        console.log(error);
        printResult.state = 'error';
      })
      .then(this.scheduleRender.bind(this));
  }

  render(): tsx.JSX.Element {
    const { _options, _initError, _selectedTaxMap, _printResults } = this;

    const disabled = _selectedTaxMap === null;

    if (_initError) {
      return (
        <p>
          Something has gone horribly wrong.
          <br />
          Try reloading the page.
        </p>
      );
    }

    return (
      <div class={CSS.base}>
        <span class={CSS.label}>Select Tax Map</span>
        <select class={CSS.select} bind={this} onchange={this._selectTaxMap}>
          {_options}
        </select>
        <span class={CSS.label}>Layer Transparency</span>
        <input
          class={CSS.slider}
          type="range"
          min="0.2"
          max="1"
          step="0.1"
          disabled={disabled}
          bind={this}
          value={this.taxMapsLayer.opacity}
          onchange={this._changeOpacity}
        />
        <div class={CSS.sliderLabels}>
          <span>Transparent</span>
          <span>Opaque</span>
        </div>
        <span class={CSS.label}>Download/Print Tax Map</span>
        <div class={CSS.buttonRow}>
          <button
            class={CSS.button}
            title="Download PDF"
            disabled={disabled}
            bind={this}
            onclick={this._download.bind(this, 'pdf')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d={filePdf16} />
            </svg>
          </button>
          <button
            class={CSS.button}
            title="Download TIFF"
            disabled={disabled}
            bind={this}
            onclick={this._download.bind(this, 'tiff')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d={fileImage16} />
            </svg>
          </button>
          <button class={CSS.button} title="Print Map" disabled={disabled} bind={this} onclick={this._print}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path d={print16} />
            </svg>
          </button>
        </div>
        <div>
          {_printResults.map(
            (pr: PrintResult, index: number): tsx.JSX.Element => {
              const label = `Tax Map Print ${index + 1}`;
              switch (pr.state) {
                case 'printing':
                  return (
                    <div key={KEY++} class={CSS.printResult}>
                      <span class={CSS.icons.printing}></span>
                      <span>{label}</span>
                    </div>
                  );
                case 'printed':
                  return (
                    <div key={KEY++} class={CSS.printResult}>
                      <a href={pr.url} target="_blank">
                        <span class={CSS.icons.download}></span>
                        <span>{label}</span>
                      </a>
                    </div>
                  );
                case 'error':
                  return (
                    <div key={KEY++} class={this.classes(CSS.printResult, CSS.printError)}>
                      <span class={CSS.icons.error}></span>
                      <span>{label}</span>
                    </div>
                  );
                default:
                  return <div key={KEY++}></div>;
              }
            },
          )}
        </div>
      </div>
    );
  }
}
