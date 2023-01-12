import{V as h,P as d,Y as l,w as F,E as m,t as A,e as v,am as c,y as i}from"./arcadeUtils.e872d917.js";import{WhereClause as g}from"./WhereClause.44dc656f.js";import"./index.3224a022.js";import"./number.1cb05492.js";async function o(t,r,a,n,u,e){if(n.length===1){if(l(n[0]))return c(t,n[0],i(n[1],-1));if(m(n[0]))return c(t,n[0].toArray(),i(n[1],-1))}else if(n.length===2){if(l(n[0]))return c(t,n[0],i(n[1],-1));if(m(n[0]))return c(t,n[0].toArray(),i(n[1],-1));if(d(n[0])){const s=await n[0].load(),f=await y(g.create(n[1],s.getFieldsIndex()),e,u);return n[0].calculateStatistic(t,f,i(n[2],1e3),r.abortSignal)}}else if(n.length===3&&d(n[0])){const s=await n[0].load(),f=await y(g.create(n[1],s.getFieldsIndex()),e,u);return n[0].calculateStatistic(t,f,i(n[2],1e3),r.abortSignal)}return c(t,n,-1)}async function y(t,r,a){const n=t.getVariables();if(n.length>0){const u=[];for(let s=0;s<n.length;s++){const f={name:n[s]};u.push(await r.evaluateIdentifier(a,f))}const e={};for(let s=0;s<n.length;s++)e[n[s]]=u[s];return t.parameters=e,t}return t}function b(t){t.mode==="async"&&(t.functions.stdev=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>o("stdev",n,u,e,r,t))},t.functions.variance=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>o("variance",n,u,e,r,t))},t.functions.average=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>o("mean",n,u,e,r,t))},t.functions.mean=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>o("mean",n,u,e,r,t))},t.functions.sum=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>o("sum",n,u,e,r,t))},t.functions.min=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>o("min",n,u,e,r,t))},t.functions.max=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>o("max",n,u,e,r,t))},t.functions.count=function(r,a){return t.standardFunctionAsync(r,a,(n,u,e)=>{if(h(e,1,1,r,a),d(e[0]))return e[0].count(n.abortSignal);if(l(e[0])||F(e[0]))return e[0].length;if(m(e[0]))return e[0].length();throw new A(r,v.InvalidParameter,a)})})}export{b as registerFunctions};
