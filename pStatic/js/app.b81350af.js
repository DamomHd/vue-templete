!function(i){function e(e){for(var n,t,c=e[0],r=e[1],o=e[2],u=0,a=[];u<c.length;u++)t=c[u],l[t]&&a.push(l[t][0]),l[t]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(i[n]=r[n]);for(h&&h(e);a.length;)a.shift()();return d.push.apply(d,o||[]),f()}function f(){for(var e,n=0;n<d.length;n++){for(var t=d[n],c=!0,r=1;r<t.length;r++){var o=t[r];0!==l[o]&&(c=!1)}c&&(d.splice(n--,1),e=p(p.s=t[0]))}return e}var t={},s={app:0},l={app:0},d=[];function p(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return i[e].call(n.exports,n,n.exports,p),n.l=!0,n.exports}p.e=function(d){var e=[];s[d]?e.push(s[d]):0!==s[d]&&{"chunk-1f14e6ca":1,"chunk-1f30d4a6":1,"chunk-c60c0e18":1,"chunk-55e7d696":1,"chunk-e5d5a0ce":1,"chunk-389a09b3":1,"chunk-5accd3d2":1,"chunk-6c10f4cc":1,"chunk-76d2beac":1,"chunk-bd4efce0":1,"chunk-c967a6ea":1}[d]&&e.push(s[d]=new Promise(function(e,c){for(var n="css/"+({}[d]||d)+"."+{"chunk-1f14e6ca":"c7ce0b52","chunk-1f30d4a6":"bf68290a","chunk-31c62071":"31d6cfe0","chunk-c60c0e18":"94644b31","chunk-55e7d696":"4282ca05","chunk-e5d5a0ce":"4af3a6ca","chunk-389a09b3":"1d80133a","chunk-5accd3d2":"a59efa5a","chunk-6c10f4cc":"90e65203","chunk-76d2beac":"71d50ddf","chunk-bd4efce0":"537fe322","chunk-c967a6ea":"b1d829bb"}[d]+".css",r=p.p+n,t=document.getElementsByTagName("link"),o=0;o<t.length;o++){var u=(i=t[o]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(u===n||u===r))return e()}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){var i;if((u=(i=a[o]).getAttribute("data-href"))===n||u===r)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var n=e&&e.target&&e.target.src||r,t=new Error("Loading CSS chunk "+d+" failed.\n("+n+")");t.code="CSS_CHUNK_LOAD_FAILED",t.request=n,delete s[d],f.parentNode.removeChild(f),c(t)},f.href=r,document.getElementsByTagName("head")[0].appendChild(f)}).then(function(){s[d]=0}));var t=l[d];if(0!==t)if(t)e.push(t[2]);else{var n=new Promise(function(e,n){t=l[d]=[e,n]});e.push(t[2]=n);var c,o=document.createElement("script");o.charset="utf-8",o.timeout=120,p.nc&&o.setAttribute("nonce",p.nc),o.src=function(e){return p.p+"js/"+({}[e]||e)+"."+{"chunk-1f14e6ca":"226f4e8b","chunk-1f30d4a6":"ec159f65","chunk-31c62071":"df7d047e","chunk-c60c0e18":"e533d15b","chunk-55e7d696":"a316b625","chunk-e5d5a0ce":"4f84e17e","chunk-389a09b3":"a045ffae","chunk-5accd3d2":"f70cce71","chunk-6c10f4cc":"64e0606c","chunk-76d2beac":"4b782526","chunk-bd4efce0":"072c5d61","chunk-c967a6ea":"3b2ca894"}[e]+".js"}(d),c=function(e){o.onerror=o.onload=null,clearTimeout(u);var n=l[d];if(0!==n){if(n){var t=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src,r=new Error("Loading chunk "+d+" failed.\n("+t+": "+c+")");r.type=t,r.request=c,n[1](r)}l[d]=void 0}};var u=setTimeout(function(){c({type:"timeout",target:o})},12e4);o.onerror=o.onload=c,document.head.appendChild(o)}return Promise.all(e)},p.m=i,p.c=t,p.d=function(e,n,t){p.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(n,e){if(1&e&&(n=p(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(p.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var c in n)p.d(t,c,function(e){return n[e]}.bind(null,c));return t},p.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(n,"a",n),n},p.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},p.p="/pStatic/",p.oe=function(e){throw e};var n=window.webpackJsonp=window.webpackJsonp||[],c=n.push.bind(n);n.push=e,n=n.slice();for(var r=0;r<n.length;r++)e(n[r]);var h=c;d.push([0,"chunk-vendors"]),f()}({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var c=t("85ec");t.n(c).a},"0d79":function(e,n,t){"use strict";t.r(n);t("96cf");var o=t("3b8d");n.default={namespaced:!0,state:{info:{}},actions:{set:function(e,t){var c=e.state,r=e.dispatch;return new Promise(function(){var n=Object(o.a)(regeneratorRuntime.mark(function e(n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return c.info=t,e.next=3,r("d2admin/db/set",{dbName:"sys",path:"user.info",value:t,user:!0},{root:!0});case 3:n();case 4:case"end":return e.stop()}},e)}));return function(e){return n.apply(this,arguments)}}())},load:function(e){var t=e.state,c=e.dispatch;return new Promise(function(){var n=Object(o.a)(regeneratorRuntime.mark(function e(n){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c("d2admin/db/get",{dbName:"sys",path:"user.info",defaultValue:{},user:!0},{root:!0});case 2:t.info=e.sent,n();case 4:case"end":return e.stop()}},e)}));return function(e){return n.apply(this,arguments)}}())}}}},"32fd":function(e,n,t){"use strict";t.r(n);var a=t("cebc"),c=t("5a0c"),i=t.n(c),f=t("2ef0");t("c276");n.default={namespaced:!0,state:{log:[]},getters:{length:function(e){return e.log.length},lengthError:function(e){return e.log.filter(function(e){return"danger"===e.type}).length}},actions:{push:function(e,n){e.rootState;var t=e.commit,c=n.message,r=n.type,o=void 0===r?"info":r,u=n.meta;t("push",{message:c,type:o,time:i()().format("YYYY-MM-DD HH:mm:ss"),meta:Object(a.a)({url:Object(f.get)(window,"location.href","")},u)})}},mutations:{push:function(e,n){e.log.push(n)},clean:function(e){e.log=[]}}}},3811:function(e,n,t){},4360:function(e,n,t){"use strict";var c=t("2b0e"),r=t("2f62"),o=(t("a481"),t("ac6a"),t("64e3")),u={};o.keys().forEach(function(e){u[e.replace(/(\.\/|\.js)/g,"")]=o(e).default});var a={namespaced:!0,modules:u};c.a.use(r.a);n.a=new r.a.Store({modules:{Vincent:a}})},"56d7":function(e,n,c){"use strict";c.r(n);c("cadf"),c("551c"),c("f751"),c("097d");var t=c("2b0e"),r={name:"app",data:function(){return{}},created:function(){document.body.addEventListener("touchstart",function(){})}},o=(c("034f"),c("2877")),u=Object(o.a)(r,function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},[],!1,null,null,null).exports,a=c("8c4f"),i=c("c276"),f=c("e36f"),d=[{path:"/",name:"index",meta:{auth:!0,title:"商品详情"},component:f("product/index.vue")},{path:"/test",name:"productDetail",meta:{auth:!0,title:"测试"},component:f("product/index.vue")},{path:"/study",name:"study",meta:{auth:!0,title:"组件传参学习"},component:f("study/component-communication/index")}],s=[].concat(d);t.a.use(a.a);var l=new a.a({routes:s});l.afterEach(function(e){i.a.title(e.meta.title)});var p=l,h=c("4360"),m=(c("4391"),c("58e6")),v=(c("87d0"),c("e41f")),k=(c("cea6"),c("28a2")),g=(c("456d"),c("ac6a"),c("5cfb"),c("fa6d"),c("1f54"),c("14b9"),c("a481"),c("28a5"),c("c5f6"),{format:function(e,n){var t=1<arguments.length&&void 0!==n?n:"YYYY-MM-DD HH:mm:ss";return c("5a0c")(e).format(t)},roundPrice:function(e){return Math.round(100*e)/100},moneyTwo:function(e){return Number(e).toFixed(2)},moneyInt:function(e){return parseInt(Number(e))},moneyFloat:function(e){return Number(e).toFixed(2).split(".")[1]},trim:function(e,n){var t=1<arguments.length&&void 0!==n?n:"ALL";return e.replace({ALL:/\s+/g,LEFT:/^\s*/,RIGHT:/(\s*$)/g,BETWEEN:/^\s+|\s+$/g}[t],"")},compareTime:function(e,n){function t(e){return new Date(e.replace(/-/g,"/")).getTime()}var c=t(e),r=t(n),o=new Date,u=t(o.getFullYear()+"-"+(o.getMonth()+1)+"-"+o.getDate()+" "+o.getHours()+":"+o.getMinutes());return!(u<c||r<u)},nameCode:function(e){return e.substr(0,1)+"*".repeat(e.length-1)},toNumber:function(e){return Number(e)}});c("7520"),c("3811");t.a.component("vc-swiper",function(){return c.e("chunk-389a09b3").then(c.bind(null,"c991"))});var b={install:function(n){n.config.productionTip=!1,n.prototype.$env="production",n.prototype.$baseUrl="/pStatic/",n.prototype.$version="0.1.0",n.prototype.$buildTime="2019-11-7 17:26:30",n.prototype.$isFromApp=-1!=navigator.userAgent.indexOf("healthsource-b2b-app"),Object.keys(g).forEach(function(e){n.filter(e,g[e])}),n.prototype.$toast=i.a.toast,n.use(m.a).use(v.a).use(k.a)}};t.a.use(b),t.a.mixin({data:function(){return{}},methods:{}}),new t.a({router:p,store:h.a,render:function(e){return e(u)}}).$mount("#app")},"64e3":function(e,n,t){var c={"./log.js":"32fd","./user.js":"0d79"};function r(e){var n=o(e);return t(n)}function o(e){var n=c[e];if(n+1)return n;var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}r.keys=function(){return Object.keys(c)},r.resolve=o,(e.exports=r).id="64e3"},7520:function(e,n,t){},"85ec":function(e,n,t){},c276:function(e,n,t){"use strict";t("433b");var c=t("d399"),r=t("a78e"),o=t.n(r),u={set:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"default",n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"",t=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},c={expires:1};Object.assign(c,t),o.a.set("".concat("Vincent pro","-").concat("0.1.0","-").concat(e),n,c)},get:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"default";return o.a.get("".concat("Vincent pro","-").concat("0.1.0","-").concat(e))},getAll:function(){return o.a.get()},remove:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"default";return o.a.remove("".concat("Vincent pro","-").concat("0.1.0","-").concat(e))}},a=u,i=t("75fc"),f={};function d(e){var n="";switch(0<arguments.length&&void 0!==e?e:"default"){case"default":n="#35495E";break;case"primary":n="#3488ff";break;case"success":n="#43B883";break;case"warning":n="#e6a23c";break;case"danger":n="#f56c6c"}return n}f.capsule=function(e,n){},f.colorful=function(e){var n;(n=console).log.apply(n,["%c".concat(e.map(function(e){return e.text||""}).join("%c"))].concat(Object(i.a)(e.map(function(e){return"color: ".concat(d(e.type),";")}))))},f.default=function(e){f.colorful([{text:e}])},f.primary=function(e){f.colorful([{text:e,type:"primary"}])},f.success=function(e){f.colorful([{text:e,type:"success"}])},f.warning=function(e){f.colorful([{text:e,type:"warning"}])},f.danger=function(e){f.colorful([{text:e,type:"danger"}])};var s={log:f,cookies:a,title:function(e){window.document.title="".concat("Vincent pro").concat(e?" | ".concat(e):"")},toast:function(e){Object(c.a)(e)}};s.debounce=function(c,o,e){var u,a,r,i,f,d,s=0,l=!1,p=!1,n=!0,t=!o&&0!==o&&"function"==typeof root.requestAnimationFrame;if("function"!=typeof c)throw new TypeError("Expected a function");function h(e,n){return t?(root.cancelAnimationFrame(f),root.requestAnimationFrame(e)):setTimeout(e,n)}function m(){var e=Date.now();if(g(e))return v(e);f=h(m,function(e){var n=e-s,t=o-(e-d);return p?Math.min(t,r-n):t}(e))}function v(e){return f=void 0,n&&u?k(e):(u=a=void 0,i)}function k(e){var n=u,t=a;return u=a=void 0,s=e,i=c.apply(t,n)}function g(e){var n=e-d;return void 0===d||o<=n||n<0||p&&r<=e-s}function b(){for(var e=Date.now(),n=g(e),t=arguments.length,c=new Array(t),r=0;r<t;r++)c[r]=arguments[r];if(u=c,a=this,d=e,n){if(void 0===f)return function(e){return s=e,f=h(m,o),l?k(e):i}(d);if(p)return f=h(m,o),k(d)}return void 0===f&&(f=h(m,o)),i}return o=+o||0,isObject(e)&&(l=!!e.leading,r=(p="maxWait"in e)?Math.max(+e.maxWait||0,o):r,n="trailing"in e?!!e.trailing:n),b.cancel=function(){void 0!==f&&function(e){if(t)return root.cancelAnimationFrame(e);clearTimeout(e)}(f),u=d=a=f=void(s=0)},b.flush=function(){return void 0===f?i:v(Date.now())},b.pending=function(){return void 0!==f},b};n.a=s},d56a:function(e,n,c){var r={"./index":["4f46",9,"chunk-31c62071","chunk-e5d5a0ce"],"./index/":["4f46",9,"chunk-31c62071","chunk-e5d5a0ce"],"./index/index":["4f46",9,"chunk-31c62071","chunk-e5d5a0ce"],"./index/index.vue":["4f46",9,"chunk-31c62071","chunk-e5d5a0ce"],"./product":["4c4c",9,"chunk-31c62071","chunk-c60c0e18"],"./product/":["4c4c",9,"chunk-31c62071","chunk-c60c0e18"],"./product/Package":["2e5b",9,"chunk-1f30d4a6"],"./product/Package.vue":["2e5b",9,"chunk-1f30d4a6"],"./product/header":["b809",9,"chunk-c967a6ea"],"./product/header.vue":["b809",9,"chunk-c967a6ea"],"./product/index":["4c4c",9,"chunk-31c62071","chunk-c60c0e18"],"./product/index.js":["4c4c",9,"chunk-31c62071","chunk-c60c0e18"],"./product/index.less":["2544",7,"chunk-76d2beac"],"./product/index.vue":["4118",9,"chunk-31c62071","chunk-c60c0e18","chunk-55e7d696"],"./study/component-communication":["39ad",9,"chunk-6c10f4cc"],"./study/component-communication/":["39ad",9,"chunk-6c10f4cc"],"./study/component-communication/b":["2c33",9,"chunk-1f14e6ca"],"./study/component-communication/b.vue":["2c33",9,"chunk-1f14e6ca"],"./study/component-communication/c":["28dc",9,"chunk-bd4efce0"],"./study/component-communication/c.vue":["28dc",9,"chunk-bd4efce0"],"./study/component-communication/index":["39ad",9,"chunk-6c10f4cc"],"./study/component-communication/index.vue":["39ad",9,"chunk-6c10f4cc"],"./test":["c29f",9,"chunk-5accd3d2"],"./test/":["c29f",9,"chunk-5accd3d2"],"./test/index":["c29f",9,"chunk-5accd3d2"],"./test/index.vue":["c29f",9,"chunk-5accd3d2"]};function t(n){var t=r[n];return t?Promise.all(t.slice(2).map(c.e)).then(function(){var e=t[0];return c.t(e,t[1])}):Promise.resolve().then(function(){var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e})}t.keys=function(){return Object.keys(r)},t.id="d56a",e.exports=t},e36f:function(e,n,t){e.exports=function(e){return function(){return t("d56a")("./"+e)}}}});