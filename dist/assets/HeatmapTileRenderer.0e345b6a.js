import{kL as a,e as m,n as l,cd as h}from"./index.3224a022.js";import{n as p}from"./BitmapTileContainer.683c304e.js";import{o as d}from"./BaseTileRenderer.e722877c.js";import"./Bitmap.28cd2352.js";import"./utils.918c3f1c.js";import"./Utils.162909bd.js";import"./enums.0295eb81.js";import"./enums.2d9e6f64.js";import"./Texture.8b5010fc.js";import"./VertexElementDescriptor.1fdca6da.js";import"./MaterialKey.93985d90.js";import"./TileContainer.a3cc4bfc.js";import"./WGLContainer.85a9794d.js";import"./pixelUtils.a7f9a619.js";import"./VertexArrayObject.d81d1493.js";import"./ProgramTemplate.93880f08.js";import"./StyleDefinition.d56936e4.js";import"./config.82550349.js";import"./GeometryUtils.51c4032a.js";import"./earcut.afc1d357.js";class c{constructor(){this.gradient=null,this.height=512,this.width=512}render(i){a(i,512,this.intensities,this.gradient,this.minDensity,this.maxDensity)}}let o=class extends d{constructor(t){super(t),this._intensityInfo={minDensity:0,maxDensity:0},this.type="heatmap",this.featuresView={attributeView:{initialize:()=>{},requestUpdate:()=>{}},requestRender:()=>{}},this._container=new p(t.tileInfoView)}createTile(t){const i=this._container.createTile(t);return this.tileInfoView.getTileCoords(i.bitmap,t),i.bitmap.resolution=this.tileInfoView.getTileResolution(t),i}onConfigUpdate(){const t=this.layer.renderer;if(t.type==="heatmap"){const{minDensity:i,maxDensity:n,colorStops:s}=t;this._intensityInfo.minDensity=i,this._intensityInfo.maxDensity=n,this._gradient=h(s),this.tiles.forEach(r=>{const e=r.bitmap.source;e&&(e.minDensity=i,e.maxDensity=n,e.gradient=this._gradient,r.bitmap.invalidateTexture())})}}hitTest(){return Promise.resolve([])}install(t){t.addChild(this._container)}uninstall(t){this._container.removeAllChildren(),t.removeChild(this._container)}disposeTile(t){this._container.removeChild(t),t.destroy()}supportsRenderer(t){return t&&t.type==="heatmap"}onTileData(t){const i=this.tiles.get(t.tileKey);if(!i)return;const n=t.intensityInfo,{minDensity:s,maxDensity:r}=this._intensityInfo,e=i.bitmap.source||new c;e.intensities=n&&n.matrix||null,e.minDensity=s,e.maxDensity=r,e.gradient=this._gradient,i.bitmap.source=e,this._container.addChild(i),this._container.requestRender(),this.requestUpdate()}onTileError(t){console.error(t)}lockGPUUploads(){}unlockGPUUploads(){}fetchResource(t,i){return console.error(t),Promise.reject()}};o=m([l("esri.views.2d.layers.features.tileRenderers.HeatmapTileRenderer")],o);const E=o;export{E as default};
