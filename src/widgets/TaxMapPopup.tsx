import app = __app;

import { property, subclass } from '@arcgis/core/core/accessorSupport/decorators';

import { tsx } from '@arcgis/core/widgets/support/widget';

import Widget from '@arcgis/core/widgets/Widget';

import PopupTemplate from '@arcgis/core/PopupTemplate';

import CustomContent from '@arcgis/core/popup/content/CustomContent';

interface ContentProperties extends esri.WidgetProperties {
  graphic: esri.Graphic;
}

const CSS = {
  base: 'esri-widget__table',
  th: 'esri-feature__field-header',
  td: 'esri-feature__field-data',
};

@subclass('app.widgets.TaxMapPopup.Content')
class Content extends Widget {
  @property()
  graphic!: esri.Graphic;

  private _download(type: string, evt: Event): void {
    evt.preventDefault();
    window.open(`./tax-maps/${type}/${this.graphic.attributes.taxmap}.${type}`, '_blank');
  }

  private _show(attributes: any, evt: Event) {
    evt.preventDefault();
    this.emit('show-tax-map', attributes);
  }

  constructor(properties: ContentProperties) {
    super(properties);
  }

  render(): tsx.JSX.Element {
    const {
      graphic: { attributes },
    } = this;

    const parts = attributes.alias.split(' ');

    return (
      <table class={CSS.base}>
        <tr>
          <th class={CSS.th}>Township</th>
          <td class={CSS.td}>{parts[0]}</td>
        </tr>
        <tr>
          <th class={CSS.th}>Range</th>
          <td class={CSS.td}>{parts[1]}</td>
        </tr>
        <tr>
          <th class={CSS.th}>Section</th>
          <td class={CSS.td}>{parts[2]}</td>
        </tr>
        {parts[3] ? (
          <tr>
            <th class={CSS.th}>1/4 and 1/16 Sections</th>
            <td class={CSS.td}>{parts[3]}</td>
          </tr>
        ) : null}
        <tr>
          <td colspan="2" class={CSS.td}>
            <div style="display:flex; flex-flow:row; justify-content:space-around; width:100%;">
              <a href="#" bind={this} onclick={this._show.bind(this, attributes)}>
                Show Tax Map
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="#" bind={this} onclick={this._download.bind(this, 'pdf')}>
                Download PDF
              </a>
              &nbsp;&nbsp;&nbsp;
              <a href="#" bind={this} onclick={this._download.bind(this, 'tiff')}>
                Download TIFF
              </a>
            </div>
          </td>
        </tr>
      </table>
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
  showTaxMap = (_attributes: any) => {};

  constructor(properties?: app.TaxMapPopupProperties) {
    super(properties);
  }

  @property()
  customContent = new CustomContent({
    outFields: ['*'],
    creator: (evt: any): Widget => {
      const content = new Content({
        graphic: evt.graphic,
      });
      content.on('show-tax-map', (attributes: any) => {
        this.showTaxMap(attributes);
      });
      return content;
    },
  });

  @property()
  content = [this.customContent];
}
