const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DocsRenderer-PKQXORMH-CbOMZxFp.js","./iframe-9UevJZ-V.js","./_commonjsHelpers-Cpj98o6Y.js","./index-D-8MO0q_.js","./toString-D6rXdIBz.js","./index-DMvR0JbP.js","./index-DrFu-skq.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./iframe-9UevJZ-V.js";import"../sb-preview/runtime.js";const{global:s}=__STORYBOOK_MODULE_GLOBAL__;var _=Object.entries(s.TAGS_OPTIONS??{}).reduce((e,r)=>{let[t,o]=r;return o.excludeFromDocsStories&&(e[t]=!0),e},{}),n={docs:{renderer:async()=>{let{DocsRenderer:e}=await a(()=>import("./DocsRenderer-PKQXORMH-CbOMZxFp.js").then(r=>r.ak),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url);return new e},stories:{filter:e=>{var r;return(e.tags||[]).filter(t=>_[t]).length===0&&!((r=e.parameters.docs)!=null&&r.disable)}}}};export{n as parameters};
