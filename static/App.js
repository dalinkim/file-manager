!function(e){function t(t){for(var r,l,i=t[0],u=t[1],c=t[2],s=0,p=[];s<i.length;s++)l=i[s],o[l]&&p.push(o[l][0]),o[l]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);for(f&&f(t);p.length;)p.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(a.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},o={0:0},a=[];function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var i=window.webpackJsonp=window.webpackJsonp||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var f=u;a.push([9,1]),n()}({9:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(1),l=n.n(a);n(3);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var p=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(r=c(t).call(this))||"object"!==i(r)&&"function"!=typeof r?s(n):r).handleSubmit=e.handleSubmit.bind(s(s(e))),e}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,o.a.Component),n=t,(r=[{key:"handleSubmit",value:function(e){e.preventDefault();var t=document.forms.pathSet;this.props.setPath({dirPath:t.url.value}),t.url.value=""}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("p",null,o.a.createElement("b",null,"Look Up Directory: "),o.a.createElement("br",null),"Enter an absolute or a relative directory path to display all the files inside.",o.a.createElement("br",null)),o.a.createElement("form",{name:"pathSet",onSubmit:this.handleSubmit},o.a.createElement("input",{type:"text",name:"url",placeholder:"Enter path"}),o.a.createElement("button",null,"Submit")))}}])&&u(n.prototype,r),a&&u(n,a),t}();function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return(b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var v=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(r=d(t).call(this))||"object"!==y(r)&&"function"!=typeof r?m(n):r).handleSubmit=e.handleSubmit.bind(m(m(e))),e}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&b(e,t)}(t,o.a.Component),n=t,(r=[{key:"handleSubmit",value:function(e){e.preventDefault();var t=document.forms.keyword;this.props.setKeyword({keyword:t.keyword.value,dirPath:this.props.dirPath}),t.keyword.value=""}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("p",null,o.a.createElement("b",null,"Organize by Keyword(s):"),o.a.createElement("br",null),"Enter a keyword to create a new directory and move the files that contain the keyword inside.",o.a.createElement("br",null)),o.a.createElement("form",{name:"keyword",onSubmit:this.handleSubmit},o.a.createElement("input",{type:"text",name:"keyword",placeholder:"Keyword to sort"}),o.a.createElement("button",null,"Submit")))}}])&&h(n.prototype,r),a&&h(n,a),t}();function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function O(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var P=function(e){return o.a.createElement("tr",null,o.a.createElement("td",null,e.file.dirPath),o.a.createElement("td",null,e.file.fileName),o.a.createElement("td",{style:{textAlign:"right"}},e.file.fileType),o.a.createElement("td",{style:{textAlign:"right"}},e.file.fileSize))},j=function(e){var t=e.files.map(function(e){return o.a.createElement(P,{key:e.filePath,file:e})});return o.a.createElement("div",null,o.a.createElement("p",null,o.a.createElement("b",null,"Display Content:"),o.a.createElement("br",null),"Table lists all files in the following directory path: ",e.path,o.a.createElement("br",null),o.a.createElement("small",null,"Note: Hidden files/directories are ignored.",o.a.createElement("br",null),"Note: Current working directory content should be displayed at the start of the server.")),o.a.createElement("table",{className:"bordered-table"},o.a.createElement("thead",null,o.a.createElement("tr",null,o.a.createElement("th",null,"Path"),o.a.createElement("th",null,"Name"),o.a.createElement("th",null,"Type"),o.a.createElement("th",null,"Size"))),o.a.createElement("tbody",null,t)))},k=function(e){function t(){var e,n,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(r=S(t).call(this))||"object"!==E(r)&&"function"!=typeof r?O(n):r).state={files:[],keyword:"",dirPath:""},e.setPath=e.setPath.bind(O(O(e))),e.setKeyword=e.setKeyword.bind(O(O(e))),e}var n,r,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(t,o.a.Component),n=t,(r=[{key:"componentDidMount",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;fetch("/api/files").then(function(t){t.ok?t.json().then(function(t){e.setState({files:t.records}),e.setState({dirPath:t.dirPath})}):t.json().then(function(e){alert("Failed to load data:\n"+e.message)})}).catch(function(e){alert("Error in fetching data from server:\n"+e.message)})}},{key:"setPath",value:function(e){var t=this;fetch("/api/path",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(n){n.ok?n.json().then(function(n){t.setState({dirPath:e.dirPath}),t.setState({files:n})}):n.json().then(function(e){alert("Failed to set path:\n"+e.message)})}).catch(function(e){alert("Error in sending data to server:\n"+e.message)})}},{key:"setKeyword",value:function(e){var t=this;fetch("/api/keyword",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(n){n.ok?n.json().then(function(n){t.setState({keyword:e.keyword}),t.setState({files:n})}):n.json().then(function(e){alert("Failed to sort by keyword: \n"+e.message)})}).catch(function(e){alert("Error in sending data to server: "+e.message)})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("hr",null),o.a.createElement(p,{setPath:this.setPath}),o.a.createElement("hr",null),o.a.createElement(v,{setKeyword:this.setKeyword,dirPath:this.state.dirPath}),o.a.createElement("hr",null),o.a.createElement(j,{files:this.state.files,dirPath:this.state.dirPath}))}}])&&w(n.prototype,r),a&&w(n,a),t}(),_=document.getElementById("contents");l.a.render(o.a.createElement(k,null),_)}});