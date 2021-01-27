import app = __app;

import { property, subclass } from '@arcgis/core/core/accessorSupport/decorators';

import { tsx } from '@arcgis/core/widgets/support/widget';

import Widget from '@arcgis/core/widgets/Widget';

import PopupTemplate from '@arcgis/core/PopupTemplate';

import CustomContent from '@arcgis/core/popup/content/CustomContent';

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
  }

  render(): tsx.JSX.Element {
    return (
      <div>
      </div>
    );
  }
}

@subclass('app.widgets.TaxMapPopup')
export default class TaxMapPopup extends PopupTemplate {
  @property()
  title = `{alias}`;

  @property()
  outFields = ['*'];

  @property()
  taxMapsLayer!: esri.MapImageLayer;

  constructor(properties?: app.TaxMapPopupProperties) {
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
