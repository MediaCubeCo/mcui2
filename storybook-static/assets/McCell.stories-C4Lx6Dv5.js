import{p as m,e as d,v as f,x as o,y as r,A as _,q as g,P as v,G as y,Q as M,M as C,u as S}from"./vue.esm-bundler-DcuF_pQ3.js";import{T as z,_ as V}from"./McTitle-BRys2FLH.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";var a=(e=>(e.S="s",e.M="m",e.L="l",e))(a||{});const b={class:"mc-cell__title"},x={class:"mc-cell__content"},p=m({__name:"McCell",props:{title:{type:String,default:""},size:{type:String,default:a.M},uppercase:{type:Boolean,default:!0},ellipsis:{type:Boolean,default:!0}},setup(e){const t=e,u=d(()=>({[`mc-cell--size-${t.size}`]:!!t.size}));return(l,B)=>(g(),f("section",{class:_(["mc-cell",u.value])},[o("div",b,[r(l.$slots,"title",{},()=>[v(V,{variation:S(z).Overline,uppercase:t.uppercase,ellipsis:t.ellipsis},{default:y(()=>[M(C(t.title),1)]),_:1},8,["variation","uppercase","ellipsis"])])]),o("div",x,[r(l.$slots,"default")])],2))}});p.__docgenInfo={exportName:"default",displayName:"McCell",description:"",tags:{},props:[{name:"title",description:"Заголовок",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"size",description:"Размеры отступов: 's, m, l'",type:{name:"String as () => CellSizesUnion"},defaultValue:{func:!1,value:"CellSizes.M"}},{name:"uppercase",description:"Заглавные буквы заголовка",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"ellipsis",description:"Три точки",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}}],slots:[{name:"title",description:"Слот заголовка"},{name:"default",description:"Слот контента"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/patterns/McCell/McCell.vue"]};const w={title:"McCell",component:p,tags:["autodocs"],argTypes:{title:{control:"text"},size:{control:"select",options:Object.values(a)},uppercase:{control:"boolean"},ellipsis:{control:"boolean"}},args:{title:"McCellTitle",default:"Cell content",size:a.M,ellipsis:!0,uppercase:!0},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},s={args:{}};var i,n,c;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {}
}`,...(c=(n=s.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const E=["Default"];export{s as Default,E as __namedExportsOrder,w as default};
