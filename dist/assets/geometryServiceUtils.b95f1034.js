import{ax as l,c as s,aq as c}from"./index.3224a022.js";import{a as g,n as m}from"./project.4c40b375.js";async function u(e=null,o){var a,r;if(l.geometryServiceUrl)return l.geometryServiceUrl;if(!e)throw new s("internal:geometry-service-url-not-configured");let t;t="portal"in e?e.portal||c.getDefault():e,await t.load({signal:o});const n=(r=(a=t.helperServices)==null?void 0:a.geometry)==null?void 0:r.url;if(!n)throw new s("internal:geometry-service-url-not-configured");return n}async function w(e,o,t=null,n){const a=await u(t,n),r=new g;r.geometries=[e],r.outSpatialReference=o;const i=await m(a,r,{signal:n});if(i&&Array.isArray(i)&&i.length===1)return i[0];throw new s("internal:geometry-service-projection-failed")}export{u as getGeometryServiceURL,w as projectGeometry};
