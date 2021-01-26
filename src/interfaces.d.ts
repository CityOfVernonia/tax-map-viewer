import esri = __esri;

declare namespace __app {
  export interface AppViewModelProperties extends Object {
    /**
     * Esri map or scene view.
     */
    view?: esri.MapView | esri.SceneView;
  }

  export class AppViewModel extends esri.Accessor {
    view: esri.MapView | esri.SceneView;
  }

  export interface AppProperties extends esri.WidgetProperties {
    /**
     * App view model.
     */
    viewModel?: AppViewModel;

    /**
     * Esri map or scene view.
     */
    view: esri.MapView | esri.SceneView;

    /**
     * Title to display in header.
     */
    title?: string;
  }

  export class App extends esri.Widget {
    constructor(properties: AppProperties);
    viewModel: AppViewModel;
    view: esri.MapView | esri.SceneView;
    title: string;
  }

  export interface TaxMapPopupProperties extends esri.PopupTemplateProperties {
    /**
     * Layer with tax map images.
     */
    taxMapsLayer: esri.MapImageLayer;
  }

  export class TaxMapPopup extends esri.PopupTemplate {
    constructor(properties: TaxMapPopupProperties);
    taxMapsLayer: esri.MapImageLayer;
  }

  export interface TaxMapsProperties extends esri.WidgetProperties {
    view: esri.MapView;
    taxMapsLayer: esri.MapImageLayer;
    taxMapBoundaries: esri.FeatureLayer;
  }

  export class TaxMaps extends esri.Widget {
    constructor(properties: TaxMapsProperties);
    view: esri.MapView;
    taxMapsLayer: esri.MapImageLayer;
    taxMapBoundaries: esri.FeatureLayer;
  }
}

declare module 'app/App' {
  import App = __app.App;
  export = App;
}

declare module 'app/App/AppViewModel' {
  import AppViewModel = __app.AppViewModel;
  export = AppViewModel;
}

declare module 'app/widgets/TaxMapPopup' {
  import TaxMapPopup = __app.TaxMapPopup;
  export = TaxMapPopup;
}

declare module 'app/widgets/TaxMaps' {
  import TaxMaps = __app.TaxMaps;
  export = TaxMaps;
}
