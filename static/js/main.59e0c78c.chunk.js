(this.webpackJsonptoken_holders_other_holdings=this.webpackJsonptoken_holders_other_holdings||[]).push([[0],{22:function(e,t,n){},42:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),c=n(3),s=n.n(c),a=(n(22),n(7)),d=n.n(a),i=n(9),l=n(4),j=n(6),h=n.n(j),b=(n(42),n(43),n(2)),u=n(1);var p=function(){var e=Object(r.useState)({loading:!1,tokenHolders:null}),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),s=Object(l.a)(c,2),a=s[0],j=s[1],p=Object(r.useState)(10),k=Object(l.a)(p,2),O=k[0],f=k[1],x=Object(r.useState)("EK-nYME2-u6tTYfo-L5LES"),m=Object(l.a)(x,2),g=m[0],I=m[1],w=Object(r.useState)(!1),v=Object(l.a)(w,2),y=v[0],E=v[1],H=Object(r.useState)(null),T=Object(l.a)(H,2),S=T[0],F=T[1],C=Object(r.useState)(),N=Object(l.a)(C,2),K=N[0],_=N[1],A=Object(r.useState)(!1),L=Object(l.a)(A,2),B=L[0],M=L[1],P=Object(r.useState)(!1),Y=Object(l.a)(P,2),$=Y[0],q=Y[1],D=Object(r.useState)(null),J=Object(l.a)(D,2),R=J[0],V=J[1];function U(e){var t=e.event.target.value;42==t.length?(_(!1),j(t)):_(!0)}function z(e){var t=e.event.target.value;I(t)}function G(e){var t=e.event.target.value;parseInt(t)>0&&parseInt(t)<=1e3?(M(!1),f(t)):M(!0)}function Q(e){q(!0),V(e),e.response?(console.log(e.response.data),console.log(e.response.status),console.log(e.response.headers)):e.request?console.log(e.request):console.log("Error",e.message),console.log(e.config)}function W(e){return Object(u.jsxs)(u.Fragment,{children:[e.addressError?Object(u.jsx)(b.a,{dark:!!y,type:"error",children:"Input Error : invalid Token Address input"}):"",e.limitError?Object(u.jsx)(b.a,{dark:!!y,type:"error",children:"Input Error : only integers between 1-1000 allowed for # of Top Holders"}):"",e.networkErrorHappened?Object(u.jsxs)(b.a,{dark:!!y,type:"error",children:["Network Error occured, Check Console ",null==e.networkErrorObject?"":e.networkErrorObject.message]}):""]})}function X(e){return e.tokenInfo?Object(u.jsx)(u.Fragment,{children:e.tokenInfo?Object(u.jsxs)(b.e,{dark:y,children:[Object(u.jsxs)(b.g,{children:[" ","".concat(e.tokenInfo.name," (").concat(e.tokenInfo.symbol,")")," "]}),Object(u.jsxs)(b.g,{children:[" Price: ",e.tokenInfo.price.rate?e.tokenInfo.price.rate.toFixed(2):"unknown price"," $"]}),Object(u.jsxs)(b.b,{children:["Owner: ",e.tokenInfo.owner]}),Object(u.jsxs)(b.b,{children:["Holders: ",e.tokenInfo.holdersCount]})]}):""}):""}function Z(e){return Object(u.jsx)(u.Fragment,{children:e.otherTokens.map((function(e,t){return Object(u.jsx)(b.h,{dark:y,active:!0,raised:!0,rounded:!0,className:"OtherTokenListItem-class",children:Object(u.jsx)(ee,{address:e.tokenInfo.address,name:e.tokenInfo.name,index:t,symbol:e.tokenInfo.symbol,balance:e.balance,decimals:e.tokenInfo.decimals>0?e.tokenInfo.decimals:1,price:e.tokenInfo.price.rate})},t)}))})}function ee(e){var t=(e.balance/Math.pow(10,e.decimals)).toFixed(5);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(b.g,{dark:y,children:Object(u.jsx)("a",{href:"https://etherscan.io/token/".concat(e.address),target:"_blank",children:"".concat(e.name," (").concat(e.symbol,")")})}),Object(u.jsxs)(b.g,{dark:y,children:["Tokens: ",t]}),Object(u.jsx)(b.g,{dark:y,children:e.price?"Value: ".concat((e.price*t).toFixed(2)," $"):"price rate unknown"})]})}function te(e){e.tokens.sort((function(e,t){return e.tokenInfo.price&&t.tokenInfo.price?t.balance/Math.pow(10,t.tokenInfo.decimals)*t.tokenInfo.price.rate-e.balance/Math.pow(10,e.tokenInfo.decimals)*e.tokenInfo.price.rate:e.tokenInfo.price&&!t.tokenInfo.price?-1:!e.tokenInfo.price&&t.tokenInfo.price?1:0}));return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(b.g,{dark:y,children:e.tokens.length>1?"".concat(e.tokens.length," other Tokens on this Holders address"):"".concat(e.tokens.length," other Token on this Holders address")}),Object(u.jsx)(Z,{otherTokens:e.tokens})]})}function ne(e){var t=Object(r.useState)(!1),n=Object(l.a)(t,2),o=n[0],c=n[1],s=Object(r.useState)(!1),a=Object(l.a)(s,2),j=a[0],p=a[1],k=Object(r.useState)(),O=Object(l.a)(k,2),f=O[0],x=O[1];Object(r.useEffect)((function(){var t=!0;if(o&&""!==!e.address&&e.address&&e.apiKey)return function(){n.apply(this,arguments)}(),function(){t=!1};function n(){return(n=Object(i.a)(d.a.mark((function n(){var r;return d.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r="https://api.ethplorer.io/getAddressInfo/".concat(e.address,"?apiKey=").concat(e.apiKey),n.next=3,h.a.get(r).then((function(e){t&&x(e.data)})).catch((function(e){Q(e)}));case 3:case"end":return n.stop()}}),n)})))).apply(this,arguments)}}),[o]);var m=(e.balance/Math.pow(10,e.decimals)).toFixed(2),g=(e.price*m).toFixed(2);return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(b.f,{dark:y,children:[" #",e.index+1," "]}),Object(u.jsxs)(b.f,{dark:y,children:[" Share: ",e.share," % "]}),Object(u.jsxs)(b.f,{dark:y,children:["Tokens: ",m]}),Object(u.jsxs)(b.f,{dark:y,children:[" Value: ",g," $ "]}),Object(u.jsxs)(b.f,{dark:y,children:["Address: ",Object(u.jsx)("a",{href:"https://etherscan.io/address/".concat(e.address),target:"_blank",children:e.address})]}),Object(u.jsx)(b.c,{className:"showOtherTokensButton",color:j?"var(--black)":"var(--white)",bgColor:j?"var(--primary-red)":"var(--primary)",dark:y,rounded:!0,onClick:function(e){c(!o),p(!j)},children:o?"Hide Holders other tokens":"Show Holders other tokens"}),f&&o?Object(u.jsx)(b.d,{flat:!0,width:400,className:"HoldersOtherHoldingsComponent-container",children:Object(u.jsx)(te,{tokens:f.tokens})}):""]})}function re(e){return null==e.holders||null==e.tokenInfo?"":Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(b.f,{className:"list-head",dark:y,children:["Tokens Top ",e.numHolders," Holders"]}),Object(u.jsx)(b.i,{rounded:!0,dark:y,raised:!0,children:e.holders.map((function(t,n){return Object(u.jsx)(b.h,{className:"ListItem-class",active:!0,dark:y,raised:!0,rounded:!0,children:Object(u.jsx)(ne,{index:n,decimals:e.tokenInfo.decimals?e.tokenInfo.decimals:"18 ",price:e.tokenInfo.price.rate?e.tokenInfo.price.rate:"1 ",address:t.address,balance:t.balance,share:t.share,apiKey:e.apiKey},t.address+n)},n)}))})]})}return Object(r.useEffect)((function(){if(void 0!==K&&!K&&!B)return o({loading:!0}),function(){e.apply(this,arguments)}(),function(){o({loading:!1})};function e(){return(e=Object(i.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t="https://api.ethplorer.io/getTopTokenHolders/".concat(a,"?apiKey=").concat(g,"&limit=").concat(O),n="https://api.ethplorer.io/getAddressInfo/".concat(a,"?apiKey=").concat(g),h.a.all([h.a.get(t),h.a.get(n)]).then(h.a.spread((function(e,t){o({loading:!1,tokenHolders:e.data.holders}),F(t.data.tokenInfo)}))).catch((function(e){Q(e)}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}),[a,g,O]),Object(u.jsxs)(b.d,{className:"App",dark:y,children:[Object(u.jsxs)(b.d,{dark:y,rounded:!0,width:700,className:"UserInput-container",children:[Object(u.jsx)("h1",{children:"Tokenholders Other Holdings"}),Object(u.jsx)(b.c,{onClick:function(e){E(!y)},rounded:!0,depressed:!0,color:y?"var(--white)":"var(--primary)",children:y?"light-mode":"dark-mode"}),Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h2",{children:" ERC20 Token Address "}),Object(u.jsx)(b.j,{rounded:!0,width:500,type:"text",onChange:U}),Object(u.jsxs)("p",{children:[" ",n.tokenHolders?"":"Ex.: 0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30"]})]}),Object(u.jsx)(b.d,{dark:y,rounded:!0,flat:!0,width:500,className:"InputComponent-container",children:Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h2",{children:"API-Key"}),Object(u.jsx)(b.j,{rounded:!0,type:"text",placeholder:g,onChange:z}),Object(u.jsxs)("p",{children:[" ",n.tokenHolders?"":"Ex.: EK-nYME2-u6tTYfo-L5LES"]})]})}),Object(u.jsx)(b.d,{dark:y,rounded:!0,flat:!0,width:500,className:"InputComponent-container",children:Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h2",{children:" # of Top Holders "}),Object(u.jsx)(b.j,{rounded:!0,width:100,type:"text",placeholder:"10",onChange:G}),Object(u.jsxs)("p",{children:[" ",n.tokenHolders?"":"1-1000"]})]})}),Object(u.jsx)(b.d,{dark:y,width:200,className:"TokenInfoComponent-container",children:Object(u.jsx)(X,{tokenInfo:S})}),Object(u.jsx)(b.d,{dark:y,width:300,className:"ErrorComponent-container",children:Object(u.jsx)(W,{addressError:K,limitError:B,networkErrorHappened:$,networkErrorObject:R})})]}),Object(u.jsx)(b.d,{dark:y,rounded:!0,width:700,className:"HolderListComponent-container",children:Object(u.jsx)(re,{holders:n.tokenHolders,numHolders:O,tokenInfo:S,apiKey:g})}),Object(u.jsx)("footer",{children:Object(u.jsxs)(b.d,{dark:y,className:"footer",children:[Object(u.jsxs)("p",{children:["Built with \ud83d\udc9a by ",Object(u.jsx)("a",{href:"https://github.com/SimRunBot",target:"_blank",children:"Simon"})]}),Object(u.jsxs)("p",{children:["powered by ",Object(u.jsx)("a",{href:"https://Ethplorer.io",target:"_blank",children:"Ethplorer.io"})]})]})})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,51)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),o(e),c(e),s(e)}))};s.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(p,{})}),document.getElementById("root")),k()}},[[48,1,2]]]);
//# sourceMappingURL=main.59e0c78c.chunk.js.map