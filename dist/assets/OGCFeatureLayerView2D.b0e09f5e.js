import{e as r,y as o,n as p}from"./index.3224a022.js";import m from"./FeatureLayerView2D.d10a6857.js";import"./utils.918c3f1c.js";import"./Utils.162909bd.js";import"./enums.0295eb81.js";import"./enums.2d9e6f64.js";import"./Texture.8b5010fc.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.93985d90.js";import"./LayerView.5282a6c2.js";import"./schemaUtils.9b3c03bc.js";import"./visualVariablesUtils.c23bd82f.js";import"./createSymbolSchema.a271dc61.js";import"./ExpandedCIM.f8b7394e.js";import"./BidiEngine.d8bba3fc.js";import"./Rect.95b0fd2e.js";import"./quantizationUtils.59e98773.js";import"./GeometryUtils.4f19e772.js";import"./floatRGBA.05859887.js";import"./util.86aff75d.js";import"./floorFilterUtils.05eb8c6a.js";import"./popupUtils.98357810.js";import"./RefreshableLayerView.488a4637.js";const s=t=>{let e=class extends t{get availableFields(){return this.layer.fieldsIndex.fields.map(a=>a.name)}};return r([o()],e.prototype,"layer",void 0),r([o({readOnly:!0})],e.prototype,"availableFields",null),e=r([p("esri.views.layers.OGCFeatureLayerView")],e),e};let i=class extends s(m){supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}};i=r([p("esri.views.2d.layers.OGCFeatureLayerView2D")],i);const I=i;export{I as default};
