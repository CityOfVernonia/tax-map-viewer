import{e as s,y as i,n as m,a4 as S,aI as n,ab as d,ac as h,ae as g,af as y,aJ as J}from"./index.3224a022.js";let r=class extends S{constructor(o){super(o),this.geometries=null,this.outSpatialReference=null,this.transformation=null,this.transformForward=null}toJSON(){const o=this.geometries.map(a=>a.toJSON()),t=this.geometries[0],e={};return e.outSR=this.outSpatialReference.wkid||JSON.stringify(this.outSpatialReference.toJSON()),e.inSR=t.spatialReference.wkid||JSON.stringify(t.spatialReference.toJSON()),e.geometries=JSON.stringify({geometryType:n(t),geometries:o}),this.transformation&&(e.transformation=this.transformation.wkid||JSON.stringify(this.transformation)),this.transformForward!=null&&(e.transformForward=this.transformForward),e}};s([i()],r.prototype,"geometries",void 0),s([i({json:{read:{source:"outSR"}}})],r.prototype,"outSpatialReference",void 0),s([i()],r.prototype,"transformation",void 0),s([i()],r.prototype,"transformForward",void 0),r=s([m("esri.rest.support.ProjectParameters")],r);const R=r,N=d(R);async function w(o,t,e){t=N(t);const a=h(o),f={...a.query,f:"json",...t.toJSON()},p=t.outSpatialReference,c=n(t.geometries[0]),u=g(f,e);return y(a.path+"/project",u).then(({data:{geometries:l}})=>J(l,c,p))}export{R as a,w as n};
