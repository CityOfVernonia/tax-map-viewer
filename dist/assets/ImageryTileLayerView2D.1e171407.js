import{b6 as S,bI as W,eR as H,e as n,y as u,n as R,eI as J,x as N,ee as F,w as X,bX as Y,ec as K,ed as Z,r as y,ag as z,aa as ee,eE as te,aV as T,s as I,au as L,dj as ie,c8 as se,ar as w,ep as re,c as D,t as ae,ah as O,eh as E,eH as le,as as oe}from"./index.3224a022.js";import{m as $}from"./multidimensionalUtils.2c544425.js";import{y as ne,d as he}from"./RasterVFDisplayObject.da25a565.js";import{y as ue,u as ce}from"./LayerView.5282a6c2.js";import{p as de,c as pe,d as ye}from"./WGLContainer.85a9794d.js";import{r as M,i as j}from"./TileContainer.a3cc4bfc.js";import{I as C}from"./Utils.162909bd.js";import{g as me,s as ge}from"./pixelUtils.a7f9a619.js";import{g as G,f as B,u as fe,a as be}from"./RawBlockCache.6a39d34e.js";import{U as we,i as _e,v as q,J as ve}from"./rasterProjectionHelper.85f10b38.js";import{r as A}from"./util.86aff75d.js";import{j as Pe}from"./dataUtils.da504af6.js";import{s as Te}from"./popupUtils.98357810.js";import{i as Ie}from"./RefreshableLayerView.488a4637.js";import"./VertexArrayObject.d81d1493.js";import"./Texture.8b5010fc.js";import"./enums.2d9e6f64.js";import"./VertexElementDescriptor.1fdca6da.js";import"./utils.918c3f1c.js";import"./MaterialKey.93985d90.js";import"./enums.0295eb81.js";import"./ProgramTemplate.93880f08.js";import"./StyleDefinition.d56936e4.js";import"./config.82550349.js";import"./GeometryUtils.51c4032a.js";import"./earcut.afc1d357.js";class Re extends M{constructor(t,i,s,r,a,l,o=null){super(t,i,s,r,a,l),this.bitmap=new de(o,null,null),this.bitmap.coordScale=[a,l],this.bitmap.once("isReady",()=>this.ready())}destroy(){super.destroy(),this.bitmap.destroy(),this.bitmap=null,this.stage=null}set stencilRef(t){this.bitmap.stencilRef=t}get stencilRef(){return this.bitmap.stencilRef}setTransform(t){super.setTransform(t),this.bitmap.transforms.dvs=this.transforms.dvs}_createTransforms(){return{dvs:S(),tileMat3:S()}}onAttach(){this.bitmap.stage=this.stage}onDetach(){this.bitmap.stage=null}}class xe extends j{constructor(){super(...arguments),this.isCustomTilingScheme=!1}createTile(t){const i=this._getTileBounds(t),[s,r]=this._tileInfoView.tileInfo.size,a=this._tileInfoView.getTileResolution(t.level);return new Re(t,a,i[0],i[3],s,r)}prepareRenderPasses(t){const i=t.registerRenderPass({name:"imagery (tile)",brushes:[pe.raster],target:()=>this.children.map(s=>s.bitmap),drawPhase:C.MAP});return[...super.prepareRenderPasses(t),i]}doRender(t){this.visible&&t.drawPhase===C.MAP&&super.doRender(t)}_getTileBounds(t){const i=this._tileInfoView.getTileBounds(W(),t);if(this.isCustomTilingScheme&&t.world){const{tileInfo:s}=this._tileInfoView,r=H(s.spatialReference);if(r){const{resolution:a}=s.lodAt(t.level),l=r/a%s.size[0],o=l?(s.size[0]-l)*a:0;i[0]-=o*t.world,i[2]-=o*t.world}}return i}}const Ve=[0,0];let p=class extends J{constructor(){super(...arguments),this._emptyTilePixelBlock=null,this._tileStrategy=null,this._tileInfoView=null,this._fetchQueue=null,this._blockCacheRegistryUrl=null,this._blockCacheRegistryId=null,this._srcResolutions=null,this.previousLOD=null,this._needBlockCacheUpdate=!1,this._globalSymbolizerParams=null,this._symbolizerParams=null,this._abortController=null,this._isCustomTilingScheme=!1,this._globalUpdateRequested=!1,this.attached=!1,this.container=null,this.layer=null,this.timeExtent=null,this.redrawOrRefetch=N((e,t)=>!this.previousLOD||this.layerView.suspended?Promise.resolve():e?this.updatingHandles.addPromise(this.doRefresh()):this.updatingHandles.addPromise(this._redrawImage(t)))}get useWebGLForProcessing(){var e;return(e=this._get("useWebGLForProcessing"))!=null?e:!0}set useWebGLForProcessing(e){this._set("useWebGLForProcessing",e)}get useProgressiveUpdate(){return this._get("useProgressiveUpdate")==null||this._get("useProgressiveUpdate")}set useProgressiveUpdate(e){if(this._tileStrategy&&this.useProgressiveUpdate!==e){this._tileStrategy.destroy(),this.container.removeAllChildren();const t=this._getCacheSize(e);this._tileStrategy=new F({cachePolicy:"purge",acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),cacheSize:t,tileInfoView:this._tileInfoView}),this._set("useProgressiveUpdate",e),this.layerView.requestUpdate()}}update(e){var a;this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume();const{extent:t,resolution:i,scale:s}=e.state,r=this._tileInfoView.getClosestInfoForScale(s);if(this.layer.raster){if(!this.useProgressiveUpdate||this._needBlockCacheUpdate){const l=this._srcResolutions[r.level],o=t.toJSON?t:X.fromJSON(t);G(this._blockCacheRegistryUrl,this._blockCacheRegistryId,o,i,l,this.layer.raster.ioConfig.sampling)}this._needBlockCacheUpdate=!1,((a=this.previousLOD)==null?void 0:a.level)!==r.level&&(this.previousLOD=r,this._symbolizerParams==null||this.layerView.hasTilingEffects||this._updateSymbolizerParams(),this._tileStrategy.updateCacheSize(0))}}moveEnd(){!this.layerView.hasTilingEffects&&this.useProgressiveUpdate||(this._abortController&&this._abortController.abort(),this._abortController=new AbortController,this._fetchQueue.length===0&&this._redrawImage(this._abortController.signal).then(()=>{this._globalUpdateRequested=!1,this.layerView.requestUpdate()}));const e=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy.updateCacheSize(e),this.layerView.requestUpdate()}get updating(){var e;return((e=this._fetchQueue)==null?void 0:e.updating)||this._globalUpdateRequested||!(!this.updatingHandles||!this.updatingHandles.updating)}attach(){Y("2d").supportsTextureFloat||(this.useWebGLForProcessing=!1),this._initializeTileInfo(),this._tileInfoView=new K(this.layerView.tileInfo,this.layerView.fullExtent);const e=this._computeFetchConcurrency();this._fetchQueue=new Z({tileInfoView:this._tileInfoView,concurrency:e,process:(i,s)=>this._fetchTile1(i,s)});const t=this._getCacheSize(this.useProgressiveUpdate);this._tileStrategy=new F({cachePolicy:"purge",acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),cacheSize:t,tileInfoView:this._tileInfoView}),this._updateBlockCacheRegistry()}detach(){this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null,B(this._blockCacheRegistryUrl,this._blockCacheRegistryId),this._blockCacheRegistryUrl=this._blockCacheRegistryId=null}acquireTile(e){const t=this.container.createTile(e);return this._enqueueTileFetch(t),this.layerView.requestUpdate(),this._needBlockCacheUpdate=!0,this._globalUpdateRequested=this.layerView.hasTilingEffects||!this.useProgressiveUpdate,t}releaseTile(e){this._fetchQueue.abort(e.key.id),this.container.removeChild(e),e.once("detach",()=>{e.destroy(),this.layerView.requestUpdate()}),this.layerView.requestUpdate()}createEmptyTilePixelBlock(e=null){const t=e==null||e.join(",")===this._tileInfoView.tileInfo.size.join(",");if(t&&y(this._emptyTilePixelBlock))return this._emptyTilePixelBlock;e=e||this._tileInfoView.tileInfo.size;const[i,s]=e,r=new me({width:i,height:s,pixels:[new Uint8Array(i*s)],mask:new Uint8Array(i*s),pixelType:"u8"});return t&&(this._emptyTilePixelBlock=r),r}_fetchTile1(e,t){const i=y(t)&&t.signal,s=this.canUseWebGLForProcessing(),{layerView:r}=this,a=!r.tileInfo.isWrappable&&y(we(r.view.spatialReference)),l={allowPartialFill:!0,datumTransformation:r.datumTransformation,interpolation:s?"nearest":this.layer.interpolation,registryId:this._blockCacheRegistryId,requestRawData:s,signal:z(i),srcResolution:this._srcResolutions[e.level],timeExtent:r.timeExtent,tileInfo:r.tileInfo,disableWrapAround:a};return this.fetchTile(e,l)}_getCacheSize(e){return e?40:0}_initializeTileInfo(){const e=this.layerView.view.spatialReference,t=new ee({x:this.layerView.fullExtent.xmin,y:this.layerView.fullExtent.ymax,spatialReference:e}),{scales:i,srcResolutions:s,isCustomTilingScheme:r}=_e(this.layer.rasterInfo,e),a=te.create({spatialReference:e,size:512,scales:i});(a.origin.x===0||a.origin.x>t.x)&&(a.origin=t),this._isCustomTilingScheme=r,this.layerView.set("tileInfo",a),this._srcResolutions=s!=null?s:[]}_computeFetchConcurrency(){const{blockBoundary:e}=this.layer.rasterInfo.storageInfo,t=e[e.length-1];return(t.maxCol-t.minCol+1)*(t.maxRow-t.minRow+1)>64?2:10}async _enqueueTileFetch(e,t){this.updatingHandles.addPromise(this._enqueueTileFetch1(e,t))}async _enqueueTileFetch1(e,t){if(!this._fetchQueue.has(e.key.id)){try{const i=await this._fetchQueue.push(e.key),{bandIds:s}=this.layer;let r=!this.useProgressiveUpdate||this.layerView.hasTilingEffects&&!this._globalSymbolizerParams;if(this._globalUpdateRequested&&!this.layerView.moving&&this._fetchQueue.length===0){r=!1;try{await this._redrawImage(this._abortController&&this._abortController.signal)}catch(o){T(o)&&I.getLogger(this.declaredClass).error(o)}this._globalUpdateRequested=!1}!this.canUseWebGLForProcessing()&&this.type!=="rasterVF"||this.layerView.hasTilingEffects||this._symbolizerParams!=null||this._updateSymbolizerParams();const a=this._tileInfoView.getTileCoords(Ve,e.key),l=this._tileInfoView.getTileResolution(e.key);await this.updateTileSource(e,{source:i,symbolizerParams:this._symbolizerParams,globalSymbolizerParams:this._globalSymbolizerParams,suspended:r,bandIds:s,coords:a,resolution:l}),e.once("attach",()=>this.layerView.requestUpdate()),this.container.addChild(e)}catch(i){T(i)||I.getLogger(this.declaredClass).error(i)}this.layerView.requestUpdate()}}async _redrawImage(e){if(this.container.children.length===0)return;await this.layer.updateRenderer(),this.layerView.hasTilingEffects?await this._updateGlobalSymbolizerParams(e):(this._updateSymbolizerParams(),this._globalSymbolizerParams=null);const t=this.container.children.map(async i=>this.updateTileSymbolizerParameters(i,{local:this._symbolizerParams,global:this._globalSymbolizerParams}));await L(t),this.container.requestRender()}async _updateGlobalSymbolizerParams(e){const t={srcResolution:this._srcResolutions[this.previousLOD.level],registryId:this._blockCacheRegistryId,signal:e},i=await this.layer.fetchPixels(this.layerView.view.extent,this.layerView.view.width,this.layerView.view.height,t);if(!i||!i.pixelBlock)return;const s=this.layer.symbolizer.generateWebGLParameters({pixelBlock:ge(i.pixelBlock,this.layer.bandIds),isGCS:this.layerView.view.spatialReference.isGeographic,resolution:{x:this.previousLOD.resolution,y:this.previousLOD.resolution},bandIds:this.layer.bandIds});!this.canUseWebGLForProcessing()&&s&&s.type==="stretch"&&this.layer.renderer&&this.layer.renderer.type==="raster-stretch"&&(s.factor=s.factor.map(r=>255*r),s.outMin=Math.round(255*s.outMin),s.outMax=Math.round(255*s.outMax)),this._globalSymbolizerParams=s}_updateSymbolizerParams(){this._symbolizerParams=this.layer.symbolizer.generateWebGLParameters({pixelBlock:null,isGCS:this.layerView.view.spatialReference.isGeographic,resolution:{x:this.previousLOD.resolution,y:this.previousLOD.resolution},bandIds:this.layer.bandIds})}_updateBlockCacheRegistry(e=!1){const{url:t,rasterInfo:i,raster:s}=this.layer,{multidimensionalDefinition:r}=this.layer.normalizeRasterFetchOptions({multidimensionalDefinition:this.layer.multidimensionalDefinition,timeExtent:this.layerView.timeExtent}),a=i!=null&&i.multidimensionalInfo?s.getSliceIndex(r):null,l=be(t,a);if(l!==this._blockCacheRegistryUrl){if(this._blockCacheRegistryUrl!=null&&B(this._blockCacheRegistryUrl,this._blockCacheRegistryId),this._blockCacheRegistryId=fe(l,this.layer.raster.rasterInfo),e){const o=this._tileInfoView.getClosestInfoForScale(this.layerView.view.scale),c=this._srcResolutions[o.level];G(l,this._blockCacheRegistryId,this.layerView.view.extent,this.layerView.view.resolution,c,this.layer.raster.ioConfig.sampling)}this._blockCacheRegistryUrl=l}}async doRefresh(){if(!this.attached)return;await this.layer.updateRenderer(),this.layerView.hasTilingEffects||this._updateSymbolizerParams(),this._updateBlockCacheRegistry(!0),this._fetchQueue.reset();const e=[];this._globalUpdateRequested=this.layerView.hasTilingEffects||!this.useProgressiveUpdate,this._tileStrategy.tiles.forEach(t=>e.push(this._enqueueTileFetch(t))),await L(e)}};n([u()],p.prototype,"_fetchQueue",void 0),n([u()],p.prototype,"_globalUpdateRequested",void 0),n([u()],p.prototype,"attached",void 0),n([u()],p.prototype,"container",void 0),n([u()],p.prototype,"layer",void 0),n([u()],p.prototype,"layerView",void 0),n([u()],p.prototype,"type",void 0),n([u()],p.prototype,"useWebGLForProcessing",null),n([u()],p.prototype,"useProgressiveUpdate",null),n([u()],p.prototype,"timeExtent",void 0),n([u()],p.prototype,"updating",null),p=n([R("esri.views.2d.layers.imagery.BaseImageryTileSubView2D")],p);let _=class extends p{constructor(){super(...arguments),this.container=null,this.layer=null,this.type="raster"}attach(){super.attach(),this.container=new xe(this._tileInfoView),this.container.isCustomTilingScheme=this._isCustomTilingScheme}detach(){super.detach(),this.container.removeAllChildren(),this.container=null}canUseWebGLForProcessing(){return this.useWebGLForProcessing&&this.layer.symbolizer.canRenderInWebGL&&!(this.layer.interpolation==="majority"&&A(this.layer))}fetchTile(e,t){return this.layer.fetchTile(e.level,e.row,e.col,t)}async updateTileSource(e,t){const{bandIds:i}=this.layer,s=this._getLayerInterpolation(),r=this.canUseWebGLForProcessing(),{source:a,globalSymbolizerParams:l,suspended:o,coords:c,resolution:d}=t,g=this.layerView.hasTilingEffects?l:t.symbolizerParams,{bitmap:h}=e;if([h.x,h.y]=c,h.resolution=d,a&&y(a)&&y(a.pixelBlock)){const m={extent:a.extent,pixelBlock:a.pixelBlock};if(h.rawPixelData=m,r)h.source=a.pixelBlock,h.isRendereredSource=!1;else{const b=await this.layer.applyRenderer(m,(l==null?void 0:l.type)==="stretch"?l:null);h.source=b,h.isRendereredSource=!0}h.symbolizerParameters=r?g:null,r?h.transformGrid||(h.transformGrid=a.transformGrid):h.transformGrid=null}else{const m=this.createEmptyTilePixelBlock();h.source=m,h.symbolizerParameters=r?g:null,h.transformGrid=null}h.bandIds=r?i:null,h.width=this._tileInfoView.tileInfo.size[0],h.height=this._tileInfoView.tileInfo.size[1],h.interpolation=s,h.suspended=o,h.invalidateTexture()}async updateTileSymbolizerParameters(e,t){const{local:i,global:s}=t,{bandIds:r}=this.layer,a=this._getLayerInterpolation(),l=this.canUseWebGLForProcessing(),{bitmap:o}=e,{rawPixelData:c}=o;!l&&y(c)?(o.source=await this.layer.applyRenderer(c,(s==null?void 0:s.type)==="stretch"?s:null),o.isRendereredSource=!0):(o.isRendereredSource&&y(c)&&(o.source=c.pixelBlock),o.isRendereredSource=!1),o.symbolizerParameters=l?this.layerView.hasTilingEffects?s:i:null,o.bandIds=l?r:null,o.interpolation=a,o.suspended=!1}_getLayerInterpolation(){const e=this.layer.renderer.type;if(e==="raster-colormap"||e==="unique-value"||e==="class-breaks")return"nearest";const{interpolation:t}=this.layer,{renderer:i}=this.layer;return i.type==="raster-stretch"&&i.colorRamp!=null?t==="bilinear"||t==="cubic"?"bilinear":"nearest":t}};n([u()],_.prototype,"container",void 0),n([u()],_.prototype,"layer",void 0),n([u()],_.prototype,"type",void 0),_=n([R("esri.views.2d.layers.imagery.ImageryTileView2D")],_);const Se=_;class Ce extends M{constructor(t,i,s,r,a,l,o=null){super(t,i,s,r,a,l),this.tileData=new ne(o),this.tileData.coordScale=[a,l],this.tileData.once("isReady",()=>this.ready())}destroy(){super.destroy(),this.tileData.destroy(),this.tileData=null,this.stage=null}set stencilRef(t){this.tileData.stencilRef=t}get stencilRef(){return this.tileData.stencilRef}_createTransforms(){return{dvs:S(),tileMat3:S()}}setTransform(t){super.setTransform(t);const i=this.resolution/(t.resolution*t.pixelRatio),s=this.transforms.tileMat3,[r,a]=this.tileData.offset,l=[this.x+r*this.resolution,this.y-a*this.resolution],[o,c]=t.toScreenNoRotation([0,0],l),{symbolTileSize:d}=this.tileData.symbolizerParameters,g=Math.round((this.width-this.tileData.offset[0])/d)*d,h=Math.round((this.height-this.tileData.offset[1])/d)*d,m=g/this.rangeX*i,b=h/this.rangeY*i;ie(s,m,0,0,0,b,0,o,c,1),se(this.transforms.dvs,t.displayViewMat3,s),this.tileData.transforms.dvs=this.transforms.dvs}onAttach(){this.tileData.stage=this.stage}onDetach(){this.tileData.stage=null}}class Ue extends j{constructor(){super(...arguments),this.isCustomTilingScheme=!1,this.symbolTypes=["triangle"]}createTile(t){const i=this._tileInfoView.getTileBounds(W(),t),[s,r]=this._tileInfoView.tileInfo.size,a=this._tileInfoView.getTileResolution(t.level);return new Ce(t,a,i[0],i[3],s,r)}prepareRenderPasses(t){const i=t.registerRenderPass({name:"imagery (vf tile)",brushes:[ye],target:()=>this.children.map(s=>s.tileData),drawPhase:C.MAP});return[...super.prepareRenderPasses(t),i]}doRender(t){this.visible&&t.drawPhase===C.MAP&&this.symbolTypes.forEach(i=>{t.renderPass=i,super.doRender(t)})}}let v=class extends p{constructor(){super(...arguments),this._handle=null,this.container=null,this.layer=null,this.type="rasterVF"}canUseWebGLForProcessing(){return!1}async fetchTile(e,t){t={...t,interpolation:"nearest",requestProjectedLocalDirections:!0};const i=await this.layer.fetchTile(e.level,e.row,e.col,t);return this.layer.rasterInfo.dataType==="vector-magdir"&&(i==null?void 0:i.pixelBlock)&&(i.pixelBlock=await this.layer.convertVectorFieldData(i.pixelBlock,t)),i}updateTileSource(e,t){const i=t.symbolizerParams,{tileData:s}=e;s.key=e.key,s.width=this._tileInfoView.tileInfo.size[0],s.height=this._tileInfoView.tileInfo.size[1];const{symbolTileSize:r}=i,{source:a}=t;if(s.offset=this._getTileSymbolOffset(s.key,r),y(a)&&y(a.pixelBlock)){const l={extent:a.extent,pixelBlock:a.pixelBlock};s.rawPixelData=l,s.symbolizerParameters=i,s.source=this._sampleVectorFieldData(a.pixelBlock,i,s.offset)}else{const l=[Math.round((this._tileInfoView.tileInfo[0]-s.offset[0])/r),Math.round((this._tileInfoView.tileInfo[1]-s.offset[1])/r)],o=this.createEmptyTilePixelBlock(l);s.source=o,s.symbolizerParameters=i}return s.invalidateVAO(),Promise.resolve(null)}updateTileSymbolizerParameters(e,t){var l;const i=t.local,{symbolTileSize:s}=i,{tileData:r}=e;r.offset=this._getTileSymbolOffset(r.key,s);const a=r.symbolizerParameters.symbolTileSize;return r.symbolizerParameters=i,y((l=r.rawPixelData)==null?void 0:l.pixelBlock)&&a!==s&&(r.source=this._sampleVectorFieldData(r.rawPixelData.pixelBlock,r.symbolizerParameters,r.offset)),Promise.resolve(null)}attach(){super.attach(),this.container=new Ue(this._tileInfoView),this.container.isCustomTilingScheme=this._isCustomTilingScheme,this._updateSymbolType(this.layer.renderer),this._handle=w(()=>this.layer.renderer,e=>this._updateSymbolType(e))}detach(){super.detach(),this.container.removeAllChildren(),this._handle.remove(),this._handle=null}_getTileSymbolOffset(e,t){const i=e.col*this._tileInfoView.tileInfo.size[0]%t,s=e.row*this._tileInfoView.tileInfo.size[1]%t;return[i>t/2?t-i:-i,s>t/2?t-s:-s]}_sampleVectorFieldData(e,t,i){const{symbolTileSize:s}=t;return Pe(e,"vector-uv",s,i)}_updateSymbolType(e){e.type==="vector-field"&&(this.container.symbolTypes=e.style==="wind-barb"?["scalar","triangle"]:e.style==="simple-scalar"?["scalar"]:["triangle"])}};n([u()],v.prototype,"container",void 0),n([u()],v.prototype,"layer",void 0),n([u()],v.prototype,"type",void 0),v=n([R("esri.views.2d.layers.imagery.VectorFieldTileView2D")],v);const ze=v,ke=e=>{let t=class extends e{constructor(){super(...arguments),this._rasterFieldPrefix="Raster.",this.layer=null,this.view=null,this.tileInfo=null}get fullExtent(){return this._getfullExtent()}_getfullExtent(){return this.projectFullExtent(this.view.spatialReference)}get hasTilingEffects(){return this.layer.renderer&&"dynamicRangeAdjustment"in this.layer.renderer&&this.layer.renderer.dynamicRangeAdjustment}get datumTransformation(){return q(z(this.layer.fullExtent),this.view.spatialReference,!0)}supportsSpatialReference(i){return!!this.projectFullExtent(i)}projectFullExtent(i){const s=z(this.layer.fullExtent),r=q(s,i,!1);return ve(s,i,r)}async fetchPopupFeatures(i,s){const{layer:r}=this;if(!i)throw new D("imageryTileLayerView:fetchPopupFeatures","Nothing to fetch without area",{layer:r});const{popupEnabled:a}=r,l=Te(r,s);if(!a||ae(l))throw new D("imageryTileLayerView:fetchPopupFeatures","Missing required popupTemplate or popupEnabled",{popupEnabled:a,popupTemplate:l});const o=[],{value:c,magdirValue:d}=await r.identify(i,{timeExtent:this.timeExtent});let g="";if(c&&c.length){g=r.type==="imagery-tile"&&r.hasStandardTime()&&c[0]!=null?c.map(U=>r.getStandardTimeValue(U)).join(", "):c.join(", ");const h={ObjectId:0};h["Raster.ServicePixelValue"]=g;const m=r.rasterInfo.attributeTable;if(y(m)){const{fields:U,features:Q}=m,k=U.find(({name:f})=>f.toLowerCase()==="value"),V=k?Q.find(f=>String(f.attributes[k.name])===g):null;if(V)for(const f in V.attributes)V.attributes.hasOwnProperty(f)&&(h[this._rasterFieldPrefix+f]=V.attributes[f])}const b=r.rasterInfo.dataType;b!=="vector-magdir"&&b!=="vector-uv"||(h["Raster.Magnitude"]=d==null?void 0:d[0],h["Raster.Direction"]=d==null?void 0:d[1]);const x=new O(this.fullExtent.clone(),null,h);x.layer=r,x.sourceLayer=x.layer,o.push(x)}return o}};return n([u()],t.prototype,"layer",void 0),n([u(re)],t.prototype,"timeExtent",void 0),n([u()],t.prototype,"view",void 0),n([u()],t.prototype,"fullExtent",null),n([u()],t.prototype,"tileInfo",void 0),n([u({readOnly:!0})],t.prototype,"hasTilingEffects",null),t=n([R("esri.views.layers.ImageryTileLayerView")],t),t};let P=class extends ke(Ie(ue(ce))){constructor(){super(...arguments),this._useWebGLForProcessing=!0,this._useProgressiveUpdate=!0,this.subview=null}get useWebGLForProcessing(){return this._useWebGLForProcessing}set useWebGLForProcessing(e){this._useWebGLForProcessing=e,this.subview&&"useWebGLForProcessing"in this.subview&&(this.subview.useWebGLForProcessing=e)}get useProgressiveUpdate(){return this._useWebGLForProcessing}set useProgressiveUpdate(e){this._useProgressiveUpdate=e,this.subview&&"useProgressiveUpdate"in this.subview&&(this.subview.useProgressiveUpdate=e)}update(e){this.subview.update(e),this.notifyChange("updating")}isUpdating(){return!this.subview||this.subview.updating}attach(){this.layer.increaseRasterJobHandlerUsage(),this._updateSubview(),this.handles.add([w(()=>{const{layer:e}=this;return{bandIds:e.bandIds,renderer:e.renderer,interpolation:e.interpolation,multidimensionalDefinition:e.multidimensionalDefinition,rasterFunction:e.type==="imagery-tile"?e.rasterFunction:null}},(e,t)=>{var o,c;const i=e.interpolation!==t.interpolation&&(e.interpolation==="majority"||t.interpolation==="majority")&&A(this.layer),s=e.renderer!==t.renderer&&((o=t.renderer)==null?void 0:o.type)!==((c=e.renderer)==null?void 0:c.type);s&&this._updateSubview();const r=e.multidimensionalDefinition!==t.multidimensionalDefinition,a=e.rasterFunction!==t.rasterFunction,l=r||i||s||a;this.subview.redrawOrRefetch(l).catch(d=>{T(d)||I.getLogger(this.declaredClass).error(d)}),this.notifyChange("updating")}),w(()=>{var e;return(e=this.layer.blendMode)!=null?e:"normal"},e=>{this.subview.container.blendMode=e},E),w(()=>{var e;return(e=this.layer.effect)!=null?e:null},e=>{this.subview.container.effect=e},E),w(()=>{var e;return(e=this.layer.multidimensionalSubset)!=null?e:null},(e,t)=>{const{multidimensionalDefinition:i}=this.layer;y(i)&&$(i,e)!==$(i,t)&&(this.subview.redrawOrRefetch(!0).catch(s=>{T(s)||I.getLogger(this.declaredClass).error(s)}),this.notifyChange("updating"))},le),w(()=>this.timeExtent,()=>{this.subview.timeExtent=this.timeExtent,this.subview.redrawOrRefetch(!0).catch(e=>{T(e)||I.getLogger(this.declaredClass).error(e)})},oe)],"attach")}detach(){var e;this.handles.remove("attach"),this.layer.decreaseRasterJobHandlerUsage(),this._detachSubview(this.subview),(e=this.subview)==null||e.destroy(),this.subview=null}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.subview.moveEnd()}async hitTest(e,t){return[{type:"graphic",layer:this.layer,mapPoint:e,graphic:new O({attributes:{},geometry:e.clone()})}]}doRefresh(){var e;return(e=this.subview)==null?void 0:e.doRefresh()}_updateSubview(){var s;const e=this.layer.renderer.type==="vector-field"?"rasterVF":this.layer.renderer.type==="flow"?"flow":"raster";if(this.subview){if(this.subview.type===e)return void this._attachSubview(this.subview);this._detachSubview(this.subview),(s=this.subview)==null||s.destroy(),this.subview=null}const{layer:t}=this;let i;i=e==="rasterVF"?new ze({layer:t,layerView:this}):e==="flow"?new he({layer:t,layerView:this}):new Se({layer:t,layerView:this}),"useWebGLForProcessing"in i&&(i.useWebGLForProcessing=this._useWebGLForProcessing),"useProgressiveUpdate"in i&&(i.useProgressiveUpdate=this._useProgressiveUpdate),"previousLOD"in i&&(i.previousLOD=this.subview&&"previousLOD"in this.subview&&this.subview.previousLOD),this._attachSubview(i),this.subview=i,this.requestUpdate()}_attachSubview(e){e&&!e.attached&&(e.attach(),e.attached=!0,this.container.addChildAt(e.container,0),e.container.blendMode=this.layer.blendMode,e.container.effect=this.layer.effect)}_detachSubview(e){e!=null&&e.attached&&(this.container.removeChild(e.container),e.detach(),e.attached=!1)}};n([u()],P.prototype,"subview",void 0),n([u()],P.prototype,"useWebGLForProcessing",null),n([u()],P.prototype,"useProgressiveUpdate",null),P=n([R("esri.views.2d.layers.ImageryTileLayerView2D")],P);const at=P;export{at as default};
