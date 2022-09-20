"use strict";(self.webpackChunkmithril_doc=self.webpackChunkmithril_doc||[]).push([[301],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),p=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,d=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),g=p(n),k=r,u=g["".concat(d,".").concat(k)]||g[k]||s[k]||l;return n?a.createElement(u,i(i({ref:t},m),{},{components:n})):a.createElement(u,i({ref:t},m))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=g;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},4024:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>s,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const l={sidebar_position:1},i="Mithril Aggregator Node",o={unversionedId:"manual/developer-docs/nodes/mithril-aggregator",id:"manual/developer-docs/nodes/mithril-aggregator",title:"Mithril Aggregator Node",description:"This is the node of the Mithril Network responsible for collecting individual signatures from the Mithril Signers and aggregate them into a multi-signature. The Mithril Aggregator uses this ability to provide certified snapshots of the Cardano blockchain.",source:"@site/root/manual/developer-docs/nodes/mithril-aggregator.md",sourceDirName:"manual/developer-docs/nodes",slug:"/manual/developer-docs/nodes/mithril-aggregator",permalink:"/doc/manual/developer-docs/nodes/mithril-aggregator",draft:!1,editUrl:"https://github.com/input-output-hk/mithril/edit/main/docs/root/manual/developer-docs/nodes/mithril-aggregator.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"docSideBar",previous:{title:"Mithril Network Nodes",permalink:"/doc/category/mithril-network-nodes"},next:{title:"Mithril Signer Node",permalink:"/doc/manual/developer-docs/nodes/mithril-signer"}},d={},p=[{value:"Resources",id:"resources",level:2},{value:"Pre-requisites",id:"pre-requisites",level:2},{value:"Download source",id:"download-source",level:2},{value:"Development test and build",id:"development-test-and-build",level:2},{value:"Release build and run binary &#39;serve&#39; command",id:"release-build-and-run-binary-serve-command",level:2},{value:"Release build and run binary &#39;genesis&#39; command",id:"release-build-and-run-binary-genesis-command",level:2},{value:"Build and run Docker container",id:"build-and-run-docker-container",level:2},{value:"Subcommands",id:"subcommands",level:2},{value:"Configuration parameters",id:"configuration-parameters",level:2}],m={toc:p};function s(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"mithril-aggregator-node"},"Mithril Aggregator Node"),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"This is the node of the ",(0,r.kt)("strong",{parentName:"p"},"Mithril Network")," responsible for collecting individual signatures from the ",(0,r.kt)("strong",{parentName:"p"},"Mithril Signers")," and aggregate them into a multi-signature. The ",(0,r.kt)("strong",{parentName:"p"},"Mithril Aggregator")," uses this ability to provide certified snapshots of the ",(0,r.kt)("strong",{parentName:"p"},"Cardano")," blockchain.")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"For more information about the ",(0,r.kt)("strong",{parentName:"p"},"Mithril Network"),", please refer to the ",(0,r.kt)("a",{parentName:"p",href:"/doc/mithril/mithril-network/architecture"},"Architecture")," page.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"For more information about the ",(0,r.kt)("strong",{parentName:"p"},"Mithril Aggregator"),", please refer to the ",(0,r.kt)("a",{parentName:"p",href:"/doc/mithril/mithril-network/aggregator"},"Aggregator Node")," page.")))),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("a",{parentName:"p",href:"/doc/manual/developer-docs/references#mithril-networks"},"Mithril test networks")," are:"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"preview"),": Test network with magic id ",(0,r.kt)("inlineCode",{parentName:"li"},"2"),", implemented on the IOG hosted Mithril Aggregator"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"preprod"),": Test network with magic id ",(0,r.kt)("inlineCode",{parentName:"li"},"1"),", not implemented yet on the IOG hosted Mithril Aggregator"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"testnet"),": Legacy test network with magic id ",(0,r.kt)("inlineCode",{parentName:"li"},"1097911063"),", used to be on the IOG hosted Mithril Aggregator, now deprecated")),(0,r.kt)("p",{parentName:"admonition"},"In this documentation, we use the generic ",(0,r.kt)("inlineCode",{parentName:"p"},"testnet")," identifier, but you need to replace it with the identifier of the network that runs on your Cardano node")),(0,r.kt)("h2",{id:"resources"},"Resources"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"center"},"Node"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Source Repository"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Rust Documentation"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Docker Packages"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("strong",{parentName:"td"},"Mithril Aggregator")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/input-output-hk/mithril/tree/main/mithril-aggregator"},"\u2197\ufe0f")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("a",{parentName:"td",href:"https://mithril.network/mithril-aggregator/doc/mithril_aggregator/index.html"},"\u2197\ufe0f")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("a",{parentName:"td",href:"https://github.com/input-output-hk/mithril/pkgs/container/mithril-aggregator"},"\u2197\ufe0f"))))),(0,r.kt)("h2",{id:"pre-requisites"},"Pre-requisites"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Install a ",(0,r.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/learn/get-started"},"correctly configured")," Rust toolchain (latest stable version)")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Install OpenSSL development libraries, for example on Ubuntu/Debian/Mint run ",(0,r.kt)("inlineCode",{parentName:"p"},"apt install libssl-dev")))),(0,r.kt)("h2",{id:"download-source"},"Download source"),(0,r.kt)("p",null,"Download from Github (HTTPS)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/input-output-hk/mithril.git\n")),(0,r.kt)("p",null,"Or (SSH)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone git@github.com:input-output-hk/mithril.git\n")),(0,r.kt)("p",null,"Change directory"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd mithril/mithril-aggregator\n")),(0,r.kt)("h2",{id:"development-test-and-build"},"Development test and build"),(0,r.kt)("p",null,"Run tests"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make test\n")),(0,r.kt)("p",null,"Create the help menu"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make help\n")),(0,r.kt)("p",null,"Generate the Rust documentation"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make doc\n")),(0,r.kt)("p",null,"Run in debug mode with default configuration"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make debug\n")),(0,r.kt)("h2",{id:"release-build-and-run-binary-serve-command"},"Release build and run binary 'serve' command"),(0,r.kt)("p",null,"Build and run in release with default configuration"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make run\n")),(0,r.kt)("p",null,"Or, build only in release"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make build\n")),(0,r.kt)("p",null,"Display the help menu"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator --help\n")),(0,r.kt)("p",null,"You should see"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mithril-aggregator \nNode args\n\nUSAGE:\n    mithril-aggregator [OPTIONS] <SUBCOMMAND>\n\nOPTIONS:\n        --db-directory <DB_DIRECTORY>\n            Directory to snapshot [default: /db]\n\n    -h, --help\n            Print help information\n\n    -r, --run-mode <RUN_MODE>\n            Run Mode [default: dev]\n\n        --server-ip <SERVER_IP>\n            Server listening IP [default: 0.0.0.0]\n\n        --server-port <SERVER_PORT>\n            Server listening port [default: 8080]\n\n        --snapshot-directory <SNAPSHOT_DIRECTORY>\n            Directory to store snapshot Defaults to work folder [default: .]\n\n    -v, --verbose\n            Verbosity level\n\nSUBCOMMANDS:\n    genesis    Aggregator runs in Genesis tools mode\n    help       Print this message or the help of the given subcommand(s)\n    serve      Aggregator runs in Serve mode\n")),(0,r.kt)("p",null,"Run 'serve' command in release with default configuration"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator serve\n")),(0,r.kt)("p",null,"Run 'serve' command in release with a specific mode"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator serve -r testnet\n")),(0,r.kt)("p",null,"Run 'serve' command in release with a custom configuration via env vars"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"GENESIS_VERIFICATION_KEY=$(wget -q -O - https://raw.githubusercontent.com/input-output-hk/mithril/main/TEST_ONLY_genesis.vkey) RUN_INTERVAL=60000 NETWORK=testnet ./mithril-aggregator serve\n")),(0,r.kt)("h2",{id:"release-build-and-run-binary-genesis-command"},"Release build and run binary 'genesis' command"),(0,r.kt)("p",null,"Build in release with default configuration"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make build\n")),(0,r.kt)("p",null,"Display the help menu"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator genesis --help\n")),(0,r.kt)("p",null,"You should see"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mithril-aggregator-genesis \nAggregator runs in Genesis tools mode\n\nUSAGE:\n    mithril-aggregator genesis <SUBCOMMAND>\n\nOPTIONS:\n    -h, --help    Print help information\n\nSUBCOMMANDS:\n    bootstrap    Bootstrap a genesis certificate Test only usage\n    export       Export payload to sign with genesis secret key\n    help         Print this message or the help of the given subcommand(s)\n    import       Import payload signed with genesis secret key and create & import a genesis certificate\n")),(0,r.kt)("p",null,"Run 'genesis bootstrap' command in release with default configuration, ",(0,r.kt)("strong",{parentName:"p"},"only in test mode"),".\nThis allows the Mithril Aggregator node to bootstrap a ",(0,r.kt)("inlineCode",{parentName:"p"},"Genesis Certificate"),". After this operation, the Mithril Aggregator will be able to produce new snapshots and certificates."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator genesis bootstrap\n")),(0,r.kt)("p",null,"Or with a specific ",(0,r.kt)("inlineCode",{parentName:"p"},"Genesis Secret Key"),", ",(0,r.kt)("strong",{parentName:"p"},"only in test mode"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator genesis bootstrap --genesis-secret-key **YOUR_SECRET_KEY**\n")),(0,r.kt)("p",null,"Run 'genesis export' command in release with default configuration.\nThis allows the Mithril Aggregator node to export the ",(0,r.kt)("inlineCode",{parentName:"p"},"Genesis Payload")," that needs to be signed (and later reimported) of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Genesis Certificate"),". The signature of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Genesis Payload")," must be done manually with the owner of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Genesis Secret Key"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator genesis export\n")),(0,r.kt)("p",null,"Or with a custom export path (to override the default value ",(0,r.kt)("inlineCode",{parentName:"p"},"./mithril-genesis-payload.txt"),")"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator genesis export --target-path **YOUR_TARGET_PATH**\n")),(0,r.kt)("p",null,"Run 'genesis import' command in release with default configuration.\nThis allows the Mithril Aggregator node to import the signed payload of the ",(0,r.kt)("inlineCode",{parentName:"p"},"Genesis Certificate")," and create it in the store. After this operation, the Mithril Aggregator will be able to produce new snapshots and certificates."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator genesis import\n")),(0,r.kt)("p",null,"Or with a custom export path (to override the default value ",(0,r.kt)("inlineCode",{parentName:"p"},"./mithril-genesis-signed-payload.txt"),")"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mithril-aggregator genesis import --signed-payload-path **YOUR_SIGNED_PAYLOAD_PATH**\n")),(0,r.kt)("p",null,"Run 'genesis import' command in release with a custom configuration via env vars"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"GENESIS_VERIFICATION_KEY=$(wget -q -O - https://raw.githubusercontent.com/input-output-hk/mithril/main/TEST_ONLY_genesis.vkey) RUN_INTERVAL=60000 NETWORK=testnet ./mithril-aggregator genesis import\n")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If you want to dig deeper, you can get access to several level of logs from the Mithril Aggregators:"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Add ",(0,r.kt)("inlineCode",{parentName:"li"},"-v")," for some logs (WARN)"),(0,r.kt)("li",{parentName:"ul"},"Add ",(0,r.kt)("inlineCode",{parentName:"li"},"-vv")," for more logs (INFO)"),(0,r.kt)("li",{parentName:"ul"},"Add ",(0,r.kt)("inlineCode",{parentName:"li"},"-vvv")," for even more logs (DEBUG)"),(0,r.kt)("li",{parentName:"ul"},"Add ",(0,r.kt)("inlineCode",{parentName:"li"},"-vvvv")," for all logs (TRACE)"))),(0,r.kt)("h2",{id:"build-and-run-docker-container"},"Build and run Docker container"),(0,r.kt)("p",null,"Build a local Docker image"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make docker-build\n")),(0,r.kt)("p",null,"Run a local Docker container"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"make docker-run\n")),(0,r.kt)("h2",{id:"subcommands"},"Subcommands"),(0,r.kt)("p",null,"Here are the subcommands available:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Subcommand"),(0,r.kt)("th",{parentName:"tr",align:null},"Performed action"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"serve")),(0,r.kt)("td",{parentName:"tr",align:null},"Aggregator runs its HTTP server in nominal mode and orchestrates multi signatures production")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"help")),(0,r.kt)("td",{parentName:"tr",align:null},"Print this message or the help of the given subcommand(s)")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"genesis export")),(0,r.kt)("td",{parentName:"tr",align:null},"Export genesis payload to sign with genesis secret key")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"genesis import")),(0,r.kt)("td",{parentName:"tr",align:null},"Import genesis signature (payload signed with genesis secret key) and create & import a genesis certificate in the store")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},"genesis bootstrap")),(0,r.kt)("td",{parentName:"tr",align:null},"Bootstrap a genesis certificate (test only usage)")))),(0,r.kt)("h2",{id:"configuration-parameters"},"Configuration parameters"),(0,r.kt)("p",null,"The configuration parameters are set either:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"In a configuration file (depending on the ",(0,r.kt)("inlineCode",{parentName:"li"},"--run-mode")," parameter). If runtime mode is ",(0,r.kt)("inlineCode",{parentName:"li"},"testnet")," the file is located in ",(0,r.kt)("inlineCode",{parentName:"li"},"./conf/testnet.json"),"."),(0,r.kt)("li",{parentName:"ul"},"The value can be overridden by an environment variable whose name is the parameter name uppercased.")),(0,r.kt)("p",null,"Here is a list of the available parameters:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Command Line (long)"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Command Line (short)"),(0,r.kt)("th",{parentName:"tr",align:null},"Environment Variable"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,r.kt)("th",{parentName:"tr",align:null},"Example"),(0,r.kt)("th",{parentName:"tr",align:"center"},"Mandatory"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"server_ip")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"--server-ip")),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"SERVER_IP")),(0,r.kt)("td",{parentName:"tr",align:null},"Listening server IP"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"0.0.0.0")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"server_port")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"--server-port")),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"SERVER_PORT")),(0,r.kt)("td",{parentName:"tr",align:null},"Listening server port"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"8080")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"verbose")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"--verbose")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"-v")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"VERBOSE")),(0,r.kt)("td",{parentName:"tr",align:null},"Verbosity level"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"Parsed from number of occurrences: ",(0,r.kt)("inlineCode",{parentName:"td"},"-v")," for ",(0,r.kt)("inlineCode",{parentName:"td"},"Warning"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"-vv")," for ",(0,r.kt)("inlineCode",{parentName:"td"},"Info"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"-vvv")," for ",(0,r.kt)("inlineCode",{parentName:"td"},"Debug")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"-vvvv")," for ",(0,r.kt)("inlineCode",{parentName:"td"},"Trace")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"run_mode")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"--run-mode")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("inlineCode",{parentName:"td"},"-r")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"RUN_MODE")),(0,r.kt)("td",{parentName:"tr",align:null},"Runtime mode"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"dev")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"db_directory")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"--db-directory")),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"DB_DIRECTORY")),(0,r.kt)("td",{parentName:"tr",align:null},"Directory to snapshot from the ",(0,r.kt)("strong",{parentName:"td"},"Cardano Node")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/db")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"snapshot_directory")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"--snapshot-directory")),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"SNAPSHOT_DIRECTORY")),(0,r.kt)("td",{parentName:"tr",align:null},"Directory to store local snapshots of the ",(0,r.kt)("strong",{parentName:"td"},"Cardano Node")),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},".")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"network")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"NETWORK")),(0,r.kt)("td",{parentName:"tr",align:null},"Cardano network"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"testnet")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"mainnet")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"devnet")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"network_magic")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"NETWORK_MAGIC")),(0,r.kt)("td",{parentName:"tr",align:null},"Cardano Network Magic number (for ",(0,r.kt)("inlineCode",{parentName:"td"},"testnet")," and ",(0,r.kt)("inlineCode",{parentName:"td"},"devnet"),")"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"1097911063")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"42")),(0,r.kt)("td",{parentName:"tr",align:"center"},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"protocol_parameters")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"PROTOCOL_PARAMETERS__K"),", ",(0,r.kt)("inlineCode",{parentName:"td"},"PROTOCOL_PARAMETERS__M"),", and ",(0,r.kt)("inlineCode",{parentName:"td"},"PROTOCOL_PARAMETERS__PHI_F")),(0,r.kt)("td",{parentName:"tr",align:null},"Mithril Protocol Parameters"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"{ k: 5, m: 100, phi_f: 0.65 }")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"snapshot_store_type")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"SNAPSHOT_STORE_TYPE")),(0,r.kt)("td",{parentName:"tr",align:null},"Type of snapshot store to use"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"gcp")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"local")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"snapshot_uploader_type")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"SNAPSHOT_UPLOADER_TYPE")),(0,r.kt)("td",{parentName:"tr",align:null},"Type of snapshot uploader to use"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"gcp")," or ",(0,r.kt)("inlineCode",{parentName:"td"},"local")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"run_interval")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"RUN_INTERVAL")),(0,r.kt)("td",{parentName:"tr",align:null},"Interval between two runtime cycles in ms"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"60000")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"data_stores_directory")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"data_stores_directory")),(0,r.kt)("td",{parentName:"tr",align:null},"Directory to store Aggregator data (Certificates, Snapshots, Protocol Parameters, ...)"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"./mithril-aggregator/stores")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"cardano_cli_path")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"CARDANO_CLI_PATH")),(0,r.kt)("td",{parentName:"tr",align:null},"Cardano CLI tool path"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"cardano-cli")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"cardano_node_socket_path")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"CARDANO_NODE_SOCKET_PATH")),(0,r.kt)("td",{parentName:"tr",align:null},"Path of the socket used by the Cardano CLI tool to communicate with the Cardano node"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/tmp/cardano.sock")),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"url_snapshot_manifest")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"URL_SNAPSHOT_MANIFEST")),(0,r.kt)("td",{parentName:"tr",align:null},"Snapshots manifest location"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"Only if ",(0,r.kt)("inlineCode",{parentName:"td"},"snapshot_store_type")," is ",(0,r.kt)("inlineCode",{parentName:"td"},"gcp"),", else it should be ``"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"genesis_verification_key")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"GENESIS_VERIFICATION_KEY")),(0,r.kt)("td",{parentName:"tr",align:null},"Genesis verification key"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"\u2714\ufe0f")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"genesis_secret_key")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"GENESIS_SECRET_KEY")),(0,r.kt)("td",{parentName:"tr",align:null},"Genesis secret key, \u26a0\ufe0f for test only"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"store_retention_limit")),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-"),(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"STORE_RETENTION_LIMIT")),(0,r.kt)("td",{parentName:"tr",align:null},"Maximum number of records in stores. If not set, no limit is set."),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:"center"},"-")))))}s.isMDXComponent=!0}}]);