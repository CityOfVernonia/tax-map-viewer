import app = __app;

import { property, subclass } from '@arcgis/core/core/accessorSupport/decorators';

import { tsx } from '@arcgis/core/widgets/support/widget';

import Widget from '@arcgis/core/widgets/Widget';

import PopupTemplate from '@arcgis/core/PopupTemplate';

import CustomContent from '@arcgis/core/popup/content/CustomContent';

import { watch } from '@arcgis/core/core/watchUtils';

interface ContentProperties extends esri.WidgetProperties {
  graphic: esri.Graphic;
  taxMapsLayer: esri.MapImageLayer;
}

const CSS = {
  buttonRow: 'cov-form--button-row',
  button: 'esri-button',
};

@subclass('app.widgets.TaxMapPopup.Content')
class Content extends Widget {
  @property()
  graphic!: esri.Graphic;

  @property()
  taxMapsLayer!: esri.MapImageLayer;

  constructor(properties: ContentProperties) {
    super(properties);
  }

  postInitialize(): void {
    watch(this, 'graphic.layer.visible', (value: boolean) => {
      if (value === false) this._hide();
    });
  }

  private _show(): void {
    const {
      graphic: {
        attributes: { FILE_NAME },
      },
      taxMapsLayer,
    } = this;

    taxMapsLayer.sublayers
      .getItemAt(0)
      .sublayers.forEach(
        (sublayer: esri.Sublayer) => (sublayer.visible = sublayer.title.replace('.tiff', '') === FILE_NAME),
      );
  }

  private _download(): void {
    const {
      graphic: {
        attributes: { FILE_NAME },
      },
    } = this;

    window.open(`http://65.122.151.216/geomoose2/taxlots_map_images/${FILE_NAME}`, '_blank');
  }

  private _hide(): void {
    const { taxMapsLayer } = this;

    taxMapsLayer.sublayers.getItemAt(0).sublayers.forEach((sublayer: esri.Sublayer) => (sublayer.visible = false));
  }

  render(): tsx.JSX.Element {
    return (
      <div class={CSS.buttonRow}>
        <button class={CSS.button} bind={this} onclick={() => this._show()}>
          Show
        </button>
        <button class={CSS.button} bind={this} onclick={() => this._download()}>
          Download
        </button>
        <button class={CSS.button} bind={this} onclick={() => this._hide()}>
          Hide
        </button>
      </div>
    );
  }
}

@subclass('app.widgets.TaxMapPopup')
export default class TaxMapPopup extends PopupTemplate {
  @property()
  title = `{MAP_NAME}`;

  @property()
  outFields = ['*'];

  @property()
  taxMapsLayer!: esri.MapImageLayer;

  constructor(properties: app.TaxMapPopupProperties) {
    super(properties);
  }

  @property()
  customContent = new CustomContent({
    outFields: ['*'],
    creator: (evt: any): Widget => {
      return new Content({
        graphic: evt.graphic,
        taxMapsLayer: this.taxMapsLayer,
      });
    },
  });

  @property()
  content = [this.customContent];
}
