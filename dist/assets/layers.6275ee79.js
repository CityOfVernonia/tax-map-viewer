import{Z as i,k as T,l as x,p as y,S as w,j as g,m as f}from"./index.3224a022.js";import A from"./GeoJSONLayer.7f7847ff.js";import{t as D,n as a}from"./SearchViewModel.b4c4186c.js";import"./clientSideDefaults.ff3eaa9c.js";import"./QueryEngineCapabilities.78217f95.js";import"./scaleUtils.cab68ced.js";import"./commonProperties.c3e6b3aa.js";import"./geolocationUtils.12f08bfe.js";import"./project.4c40b375.js";const s=new i({portalItem:{id:"5e1e805849ac407a8c34945c781c1d54"}}),t=new i({portalItem:{id:"a0837699982f41e6b3eb92429ecdb694"},outFields:["*"],popupTemplate:new T({title:"{TAXLOT_ID}",content:e=>{const{TAXLOT_ID:o,ACCOUNT_IDS:c,TAXMAP:l,ADDRESS:r,OWNER:d,ACRES:p,SQ_FEET:m}=e.graphic.attributes,u=r?`
        <tr>
          <th>Address (Primary Situs)</th>
          <td>${r}</td>
        </tr>
      `:"",h=c.split(",").map(n=>`
          <calcite-link href="https://propertyquery.columbiacountyor.gov/columbiaat/MainQueryDetails.aspx?AccountID=${n}&QueryYear=2023&Roll=R" target="_blank">${n}</calcite-link>
        `),b=location.hostname==="localhost"?`/tax-lot/?id=${o}`:`/tax-lot/${o}/`;return new DOMParser().parseFromString(`<table class="esri-widget__table">
          <tr>
            <th>Tax lot</th>
            <td>
              <calcite-link href=${b} target="_blank">${o}</calcite-link>
            </td>
          </tr>
          <tr>
            <th>Tax map</th>
            <td>
              <calcite-link href="https://gis.columbiacountymaps.com/TaxMaps/${l}.pdf" target="_blank">${l}</calcite-link>
            </td>
          </tr>
          <tr>
            <th>Owner</th>
            <td>${d}</td>
          </tr>
          ${u}
          <tr>
            <th>Area</th>
            <td>${p} acres&nbsp;&nbsp;${m.toLocaleString()} sq ft</td>
          </tr>
          <tr>
            <th>Tax account(s)</th>
            <td>
              ${h.join("&nbsp;")}
            </td>
          </tr>
        </table>`,"text/html").body.firstChild}})});t.when(()=>{const o=t.renderer.symbol;o.outline.color=new x([246,213,109,.5])});const R=new D({searchAllEnabled:!1,includeDefaultSources:!1,locationEnabled:!1,sources:[new a({layer:t,outFields:["*"],searchFields:["ADDRESS"],suggestionTemplate:"{ADDRESS}",placeholder:"Tax lot by address",name:"Tax lot by address"}),new a({layer:t,outFields:["*"],searchFields:["OWNER"],suggestionTemplate:"{OWNER}",placeholder:"Tax lot by owner",name:"Tax lot by owner"}),new a({layer:t,outFields:["*"],searchFields:["ACCOUNT_IDS"],suggestionTemplate:"{ACCOUNT_IDS}",placeholder:"Tax lot by tax account",name:"Tax lot by tax account"}),new a({layer:t,outFields:["*"],searchFields:["TAXLOT_ID"],suggestionTemplate:"{TAXLOT_ID}",placeholder:"Tax lot by map and lot",name:"Tax lot by map and lot"})]}),L=new A({url:"https://cityofvernonia.github.io/vernonia-tax-maps/TaxMapBoundaries.geojson",outFields:["*"],renderer:new y({symbol:new w({color:[0,0,0,0],outline:{color:"yellow",width:.75}})}),labelingInfo:[new g({labelExpressionInfo:{expression:"$feature.MAP_NAME"},symbol:new f({color:"yellow",haloColor:[0,0,0,.5],haloSize:1.25})})]}),N=async()=>{await s.load();const e=s.fullExtent.clone();return{extent:e,constraintGeometry:e.clone().expand(3)}};export{s as cityLimits,N as extents,R as searchViewModel,t as taxLots,L as taxMaps};
