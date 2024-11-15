import{p as h,e as s,q as n,v as i,x as N,F as c,B as l,y as o,z as m,u as r,P as u,G as V,Q as I,M as Y,X as x,A as w}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as A,T as f}from"./McTitle-BRys2FLH.js";import{_ as C}from"./McSvgIcon-Cq4_nq1C.js";import{_ as L}from"./McButton-Cw3_qabT.js";import{H as g}from"./Alignment-5IJBP4cy.js";import{W as M}from"./Weights-CEN83Yli.js";const b="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABQCAYAAABh05mTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIwSURBVHgB7dzBTRtBFMbxN0OQOLoEVxCziYi0RBG4hFQQd5B0gNNB0oFTASXgKIeNHJLBqWBLyBEJdl5m1ogDB/xW+gBp+H4Hs0I7svbvsQ9r64kQEREREdGDcENODiGMLq/9J/HyQVTGUpgU4yKqfDs8mHwZuM6mCWHsOn+qIvtSvnZvJ1bJP8vJL8Qq7pyoaA7Yqnezw1cvv0thVn/+HnWqi/wuu+zcafrX1LLOtBNXq7DfeR/SYStXcVrXVSuFyu847XxIYUbXGqfvDqrltjVeDKL3R5sjXZYcMKurqvVOFvl41/mJZY0pojoZ9QfOtfIMpM/9/rPw9rq3MEWk+zEiACMCMCIAIwIwIgAjAjAiACMCMCIAIwIwIgAjAjAigP3OdqYyb87XcymdDjudOxFg2E50Mq9fTz7LI2l+r0/y7n+y5zXiTgRgRABGBGBEAEYEYEQARgRgRABGBGBEAEYEYEQARgRgRABGBGBEAEYEMP3wfeid3mIY76hzJwLwO5b7nteIOxGAEQEYEYARARgRgBEBGBGAEQEYEYARARgRgBEBGBGAEQFMEZ1uZiLkCR3yLLhx/3hz3dvYBmloXOe/UWXWNGEsBcsjXdIVH+fjLkbT7B9TxLqfDeOW/U7c9Wc/foVjKVCTryv6s80IL128fVNdWNaZx1z1c8KiDyXOCLsrzwzTq/jeOgNo0MC17Of5+mN6lWYqrryZYU7a9LjY8/GrdU4YERERERE9oP9txaCZu8fa7wAAAABJRU5ErkJggg==",k={class:"mc-no-data__wrapper"},G=["src"],S={key:3,class:"mc-no-data__text"},q={key:4,class:"mc-no-data__actions"},Q=h({__name:"McNoData",props:{img:{type:String,default:b},icon:{type:String,default:null},title:{type:String,default:""},text:{type:String,default:""},href:{type:String,default:""},btnName:{type:String,default:""},noAction:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},variation:{type:String,default:"small"}},emits:["click"],setup(t,{emit:d}){const B=d,e=t,v=s(()=>({class:"mt-200",loading:e.loading,...e.href?{href:e.href}:{}})),y=s(()=>e.href?{}:{click:()=>R()}),E=s(()=>e.variation==="large"?{variation:f.Subtitle,weight:M.SemiBold}:{}),p=s(()=>({"mc-no-data":!0,[`mc-no-data--variation-${e.variation}`]:!!e.variation})),R=()=>{B("click")};return(a,X)=>(n(),i("div",k,[N("section",{class:w(p.value)},[e.icon?(n(),c(C,{key:0,weight:.5,name:e.icon,size:"1000",color:"outline-gray"},null,8,["name"])):l("",!0),e.img?(n(),i("img",{key:1,src:e.img,alt:"no_entity"},null,8,G)):l("",!0),t.title||a.$slots.title?o(a.$slots,"title",{key:2},()=>[e.title?(n(),c(A,m({key:0},E.value,{color:"gray","text-align":r(g).Center,"html-data":e.title}),null,16,["text-align","html-data"])):l("",!0)]):l("",!0),t.text||a.$slots.text?(n(),i("div",S,[o(a.$slots,"text",{},()=>[u(A,{color:"gray",variation:r(f).Article,"text-align":r(g).Center,"html-data":t.text},null,8,["variation","text-align","html-data"])])])):l("",!0),t.btnName&&!t.noAction||a.$slots.action?(n(),i("div",q,[o(a.$slots,"action",{},()=>[u(L,m(v.value,x(y.value)),{default:V(()=>[I(Y(t.btnName),1)]),_:1},16)])])):l("",!0)],2)]))}});Q.__docgenInfo={exportName:"default",displayName:"McNoData",description:"",tags:{},props:[{name:"img",type:{name:"string"},defaultValue:{func:!1,value:"noTableDataImg"}},{name:"icon",type:{name:"String as () => IconsListUnion"},defaultValue:{func:!1,value:"null"}},{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"text",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"href",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"btnName",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"noAction",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loading",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"variation",description:`Вариант блока
small - стандартный, небольшие отступы
large - большие отступы (напр. для табов в админке) + немного меняются дефолтные шрифты тайтла`,values:["small","large"],type:{name:"string"},defaultValue:{func:!1,value:"'small'"}}],events:[{name:"click"}],slots:[{name:"title"},{name:"text"},{name:"action"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/elements/McNodata/McNoData.vue"]};export{Q as _,b as n};
