"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[5968],{3905:(t,e,r)=>{r.d(e,{Zo:()=>c,kt:()=>d});var i=r(7294);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function l(t,e){if(null==t)return{};var r,i,n=function(t,e){if(null==t)return{};var r,i,n={},a=Object.keys(t);for(i=0;i<a.length;i++)r=a[i],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(i=0;i<a.length;i++)r=a[i],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var s=i.createContext({}),p=function(t){var e=i.useContext(s),r=e;return t&&(r="function"==typeof t?t(e):o(o({},e),t)),r},c=function(t){var e=p(t.components);return i.createElement(s.Provider,{value:e},t.children)},h={inlineCode:"code",wrapper:function(t){var e=t.children;return i.createElement(i.Fragment,{},e)}},m=i.forwardRef((function(t,e){var r=t.components,n=t.mdxType,a=t.originalType,s=t.parentName,c=l(t,["components","mdxType","originalType","parentName"]),m=p(r),d=n,u=m["".concat(s,".").concat(d)]||m[d]||h[d]||a;return r?i.createElement(u,o(o({ref:e},c),{},{components:r})):i.createElement(u,o({ref:e},c))}));function d(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var a=r.length,o=new Array(a);o[0]=m;var l={};for(var s in e)hasOwnProperty.call(e,s)&&(l[s]=e[s]);l.originalType=t,l.mdxType="string"==typeof t?t:n,o[1]=l;for(var p=2;p<a;p++)o[p]=r[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1650:(t,e,r)=>{r.r(e),r.d(e,{assets:()=>s,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var i=r(7462),n=(r(7294),r(3905));const a={sidebar_position:4,sidebar_label:"Mithril Client"},o="Mithril Client Node",l={unversionedId:"mithril/mithril-network/client",id:"mithril/mithril-network/client",title:"Mithril Client Node",description:"Welcome to the Mithril Client Node guide!",source:"@site/root/mithril/mithril-network/client.md",sourceDirName:"mithril/mithril-network",slug:"/mithril/mithril-network/client",permalink:"/doc/mithril/mithril-network/client",draft:!1,editUrl:"https://github.com/input-output-hk/mithril/edit/main/docs/root/mithril/mithril-network/client.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,sidebar_label:"Mithril Client"},sidebar:"mithrilSideBar",previous:{title:"Mithril Signer",permalink:"/doc/mithril/mithril-network/signer"}},s={},p=[{value:"Introduction",id:"introduction",level:2},{value:"Usecases",id:"usecases",level:2},{value:"Snapshot Artifacts Retrieval",id:"snapshot-artifacts-retrieval",level:2},{value:"Snapshot Verification",id:"snapshot-verification",level:2},{value:"Snapshot Restoration",id:"snapshot-restoration",level:2}],c={toc:p};function h(t){let{components:e,...r}=t;return(0,n.kt)("wrapper",(0,i.Z)({},c,r,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"mithril-client-node"},"Mithril Client Node"),(0,n.kt)("p",null,"Welcome to the Mithril Client Node guide!"),(0,n.kt)("h2",{id:"introduction"},"Introduction"),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"The ",(0,n.kt)("strong",{parentName:"p"},"Mithril Client")," node is used to restore a ",(0,n.kt)("strong",{parentName:"p"},"Cardano full node")," by retrieving, from a ",(0,n.kt)("strong",{parentName:"p"},"Mithril Aggregator"),", a remote snapshot, its certificate chain and by verifying their validity thanks to the Mithril cryptographic primitives.")),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("ul",{parentName:"admonition"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"For more information about the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Protocol"),", please refer to the ",(0,n.kt)("a",{parentName:"p",href:"/doc/mithril/mithril-protocol/protocol"},"Protocol in depth")," page.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"For more information about the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Client"),", please refer to the ",(0,n.kt)("a",{parentName:"p",href:"/doc/manual/developer-docs/nodes/mithril-client"},"Developer Documentation")," page.")))),(0,n.kt)("h2",{id:"usecases"},"Usecases"),(0,n.kt)("p",null,"At a first glance, a ",(0,n.kt)("strong",{parentName:"p"},"Mithril Client")," can be used by any user that needs to restore and bootstrap rapidly a ",(0,n.kt)("strong",{parentName:"p"},"Cardano full node"),":"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"A full node wallet such as ",(0,n.kt)("strong",{parentName:"li"},"Daedalus")),(0,n.kt)("li",{parentName:"ul"},"A node operator (SPO, Exchange, Dapp)")),(0,n.kt)("p",null,"On the long run, the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Client")," is intended to be incorporated in ",(0,n.kt)("strong",{parentName:"p"},"Light Clients")," and ",(0,n.kt)("strong",{parentName:"p"},"Wallets"),"."),(0,n.kt)("h2",{id:"snapshot-artifacts-retrieval"},"Snapshot Artifacts Retrieval"),(0,n.kt)("p",null,"The first operation that a ",(0,n.kt)("strong",{parentName:"p"},"Mithril Client")," does is to retrieve snapshot artifacts from a remote source."),(0,n.kt)("p",null,"The ",(0,n.kt)("strong",{parentName:"p"},"Mithril Aggregator")," is used as a provider for the ",(0,n.kt)("strong",{parentName:"p"},"Snapshots")," (at least their locations)."),(0,n.kt)("p",null,"This is done upon a manual action of a user that has previously selected the snapshot to use (if multiple are available)."),(0,n.kt)("p",null,"These artifacs are stored locally on a temporary location, are uncompressed if necessary and used to compute the message that should have been computed and signed by the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Signers"),"."),(0,n.kt)("h2",{id:"snapshot-verification"},"Snapshot Verification"),(0,n.kt)("p",null,"Along with the snapshot artifacts, the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Client")," will download the associated ",(0,n.kt)("strong",{parentName:"p"},"Certificate Chain")," and for each ",(0,n.kt)("strong",{parentName:"p"},"Mithril Certificate")," verify that (in the following order):"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"The certificate is not tampered (by computing its hash and verifying that is is the same as the one used for downloading it)."),(0,n.kt)("li",{parentName:"ol"},"The locally computed ",(0,n.kt)("strong",{parentName:"li"},"message")," is the same as in the certificate."),(0,n.kt)("li",{parentName:"ol"},"The ",(0,n.kt)("strong",{parentName:"li"},"multi signature")," of the certificate is valid and computed with the certificate ",(0,n.kt)("strong",{parentName:"li"},"message"),"."),(0,n.kt)("li",{parentName:"ol"},"The stake distribution used to compute the multi signature is signed:",(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Into a multi signature of a previous certificate of the chain (if there is one available)."),(0,n.kt)("li",{parentName:"ul"},"Or by a valid ",(0,n.kt)("strong",{parentName:"li"},"Genesis Certificate")," (in case this is the first certificate of the chain).")))),(0,n.kt)("p",null,"The ",(0,n.kt)("strong",{parentName:"p"},"Mithril Aggregator")," is used as a provider for the ",(0,n.kt)("strong",{parentName:"p"},"Certificate Chain"),"."),(0,n.kt)("admonition",{type:"tip"},(0,n.kt)("p",{parentName:"admonition"},"For more information about the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Certificate Chain"),", please refer to the ",(0,n.kt)("a",{parentName:"p",href:"/doc/mithril/mithril-protocol/certificates"},"Certificate Chain")," page.")),(0,n.kt)("h2",{id:"snapshot-restoration"},"Snapshot Restoration"),(0,n.kt)("p",null,"Once the snapshot artifacts are verified, the ",(0,n.kt)("strong",{parentName:"p"},"Mithril Client")," node will move them from the temporary location to the final (user specified) location."),(0,n.kt)("p",null,"At this point, the ",(0,n.kt)("strong",{parentName:"p"},"Cardano Node")," will take over, start using the artifacts. and hopefully start addng new blocks to the ledger!"))}h.isMDXComponent=!0}}]);