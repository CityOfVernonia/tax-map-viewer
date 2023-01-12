import{gk as m,r as l,h}from"./index.3224a022.js";import{k as u}from"./georeference.786ea08f.js";import"./mat4f64.ff2a477c.js";import"./quat.28baf938.js";import"./quatf64.4ae3e6f1.js";import"./BufferView.1dff48e3.js";import"./vec33.c626d63c.js";class T{async createIndex(t,o){const r=new Array;if(!t.vertexAttributes||!t.vertexAttributes.position)return new m;const a=this._createMeshData(t),n=l(o)?await o.invoke("createIndexThread",a,{transferList:r}):this.createIndexThread(a).result;return this._createPooledRBush().fromJSON(n)}createIndexThread(t){const o=new Float64Array(t.position),r=this._createPooledRBush();return t.components?this._createIndexComponentsThread(r,o,t.components.map(a=>new Uint32Array(a))):this._createIndexAllThread(r,o)}_createIndexAllThread(t,o){const r=new Array(o.length/9);let a=0;for(let n=0;n<o.length;n+=9)r[a++]=c(o,n+0,n+3,n+6);return t.load(r),{result:t.toJSON()}}_createIndexComponentsThread(t,o,r){let a=0;for(const s of r)a+=s.length/3;const n=new Array(a);let p=0;for(const s of r)for(let i=0;i<s.length;i+=3)n[p++]=c(o,3*s[i+0],3*s[i+1],3*s[i+2]);return t.load(n),{result:t.toJSON()}}_createMeshData(t){const o=(t.transform?u({position:t.vertexAttributes.position,normal:null,tangent:null},t.transform,t.spatialReference).position:t.vertexAttributes.position).buffer;return!t.components||t.components.some(r=>!r.faces)?{position:o}:{position:o,components:t.components.map(r=>r.faces)}}_createPooledRBush(){return new m(9,h("esri-csp-restrictions")?t=>t:[".minX",".minY",".maxX",".maxY"])}}function c(e,t,o,r){return{minX:Math.min(e[t+0],e[o+0],e[r+0]),maxX:Math.max(e[t+0],e[o+0],e[r+0]),minY:Math.min(e[t+1],e[o+1],e[r+1]),maxY:Math.max(e[t+1],e[o+1],e[r+1]),p0:[e[t+0],e[t+1],e[t+2]],p1:[e[o+0],e[o+1],e[o+2]],p2:[e[r+0],e[r+1],e[r+2]]}}export{T as default};
