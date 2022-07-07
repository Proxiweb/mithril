"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[6846],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),d=a,h=u["".concat(s,".").concat(d)]||u[d]||m[d]||o;return r?n.createElement(h,i(i({ref:t},p),{},{components:r})):n.createElement(h,i({ref:t},p))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},1585:function(e,t,r){r.r(t),r.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return m}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],l={sidebar_position:2},s="API References",c={unversionedId:"manual/developer-docs/references",id:"manual/developer-docs/references",title:"API References",description:"Welcome to the Mithril references docs!",source:"@site/root/manual/developer-docs/references.md",sourceDirName:"manual/developer-docs",slug:"/manual/developer-docs/references",permalink:"/doc/manual/developer-docs/references",editUrl:"https://github.com/input-output-hk/mithril/tree/main/docs/root/root/manual/developer-docs/references.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"docSideBar",previous:{title:"Mithril Client Node",permalink:"/doc/manual/developer-docs/architecture/client"}},p={},m=[{value:"REST API References",id:"rest-api-references",level:2},{value:"Rust Dependencies References",id:"rust-dependencies-references",level:2}],u={toc:m};function d(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"api-references"},"API References"),(0,o.kt)("p",null,"Welcome to the Mithril references docs!"),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This page gathers the developer documentations available for Mithril. They are intended for a technical audience only."))),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"tip")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"For more information about the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Protocol"),", please refer to the ",(0,o.kt)("a",{parentName:"p",href:"/doc/mithril/intro"},"About Mithril")," section."))),(0,o.kt)("h2",{id:"rest-api-references"},"REST API References"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"/aggregator-api"},(0,o.kt)("strong",{parentName:"a"},"Mithril Aggregator - API Reference")," \ud83d\udd17"),":")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"the node of the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Network")," responsible for collecting individual signatures from the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Signers")," and aggregate them into a multisignature. The ",(0,o.kt)("strong",{parentName:"p"},"Mithril Aggregator")," uses this ability to provide certified snapshots of the ",(0,o.kt)("strong",{parentName:"p"},"Cardano")," blockchain.")),(0,o.kt)("h2",{id:"rust-dependencies-references"},"Rust Dependencies References"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://mithril.network/mithril-aggregator/doc/mithril_aggregator/index.html"},(0,o.kt)("strong",{parentName:"a"},"Mithril Aggregator - Rust Documentation")," \ud83d\udd17"),":")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"the node of the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Network")," responsible for collecting individual signatures from the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Signers")," and aggregate them into a multisignature. The ",(0,o.kt)("strong",{parentName:"p"},"Mithril Aggregator")," uses this ability to provide certified snapshots of the ",(0,o.kt)("strong",{parentName:"p"},"Cardano")," blockchain.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://mithril.network/mithril-client/doc/mithril_client/index.html"},(0,o.kt)("strong",{parentName:"a"},"Mithril Client - Rust Documentation")," \ud83d\udd17"))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"the node of the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Network")," responsible for restoring the ",(0,o.kt)("strong",{parentName:"p"},"Cardano")," blockchain on an empty node from a certified snapshot.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://mithril.network/mithril-common/doc/mithril_common/index.html"},(0,o.kt)("strong",{parentName:"a"},"Mithril Common - Rust Documentation")," \ud83d\udd17"))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"this is the ",(0,o.kt)("strong",{parentName:"p"},"common")," library that is used by the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Network")," nodes.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://mithril.network/mithril-core/doc/mithril/index.html"},(0,o.kt)("strong",{parentName:"a"},"Mithril Core - Rust Documentation")," \ud83d\udd17"))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"the ",(0,o.kt)("strong",{parentName:"p"},"core")," library that implements ",(0,o.kt)("strong",{parentName:"p"},"Mithril")," protocol cryptographic engine.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://mithril.network/mithril-signer/doc/mithril_signer/index.html"},(0,o.kt)("strong",{parentName:"a"},"Mithril Signer - Rust Documentation")," \ud83d\udd17"))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"the node of the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Network")," responsible for producing individual signatures that are collected and aggregated by the ",(0,o.kt)("strong",{parentName:"p"},"Mithril Aggregator"),".")))}d.isMDXComponent=!0}}]);