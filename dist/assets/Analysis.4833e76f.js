import{j2 as a,fe as o,a3 as l,r as n,e,y as s,n as p,al as y}from"./index.3224a022.js";let d=0,t=class extends a(o(l(y))){constructor(r){super(r),this.id=`${Date.now().toString(16)}-analysis-${d++}`,this.title=null}get parent(){return this._get("parent")}set parent(r){const i=this.parent;if(n(i))switch(i.type){case"line-of-sight":case"dimension":i.releaseAnalysis(this);break;case"2d":case"3d":i.analyses.includes(this)&&i.analyses.remove(this)}this._set("parent",r)}get isEditable(){return this.requiredPropertiesForEditing.every(n)}};e([s({type:String,constructOnly:!0,clonable:!1})],t.prototype,"id",void 0),e([s({type:String})],t.prototype,"title",void 0),e([s({constructOnly:!0})],t.prototype,"type",void 0),e([s({clonable:!1,value:null})],t.prototype,"parent",null),e([s({readOnly:!0})],t.prototype,"isEditable",null),e([s({readOnly:!0})],t.prototype,"requiredPropertiesForEditing",void 0),t=e([p("esri.analysis.Analysis")],t);const u=t;export{u as c};
