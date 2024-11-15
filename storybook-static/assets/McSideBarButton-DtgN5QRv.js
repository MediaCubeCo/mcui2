import{p as v,U as b,f as h,e as l,q as t,F as s,R as g,G as o,A as S,Q as c,M as u,B as i,v as f,K as B,V as C,W as V}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as k,a as d}from"./McButton-Cw3_qabT.js";import{_ as w}from"./McSvgIcon-Cq4_nq1C.js";import{_ as x}from"./McChip-DqO1iODX.js";import{d as T,S as I}from"./sidebar-_fboGCRM.js";import{T as M}from"./useTooltip-C3VtZaBe.js";import{H as A}from"./Alignment-5IJBP4cy.js";const z={key:1,class:"mc-side-bar-button__dot"},L=v({__name:"McSideBarButton",props:{to:{type:Object,default:null},href:{type:String,default:null},icon:{type:String,default:""},iconColor:{type:String,default:"currentColor"},title:{type:String,default:""},compact:{type:Boolean,default:!1},variation:{type:String},secondaryColor:{type:String},withTooltip:{type:Boolean,default:!1},withIndicator:{type:Boolean,default:!1},isActive:{type:Boolean,default:!1},info:{type:[String,Number],default:""},exact:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},setup(e){const r=b(),m=h("provideData",{}),a=e,n=l(()=>m.currentThemeConfig||T[I.Black]),p=l(()=>({"mc-side-bar-button":!0,[`mc-side-bar--${n.value.mode||"black"}__button`]:!0,"purple-hover":!a.secondaryColor&&n.value.mainMenuLinks.variable==="black-flat",[r.class]:!0})),y=l(()=>({...r,variation:a.variation||n.value.mainMenuLinks.variable,secondaryColor:a.secondaryColor||n.value.mainMenuLinks.secondaryColor,class:p.value,"text-align":A.Left,"full-width":!0,size:a.compact?d.SCompact:d.S,href:a.href,to:a.to,exact:a.exact,disabled:a.disabled,"is-active":a.isActive,tooltip:a.compact&&a.withTooltip?a.title:"",tooltipPlacement:M.Right}));return(N,D)=>(t(),s(k,C(V(y.value)),g({"icon-prepend":o(()=>[e.icon?(t(),s(w,{key:0,fill:e.iconColor,class:"mc-side-bar-button__icon",name:e.icon},null,8,["fill","name"])):i("",!0),e.icon&&e.compact&&(e.info||e.withIndicator)?(t(),f("span",z)):i("",!0)]),default:o(()=>[e.compact?i("",!0):(t(),f(B,{key:0},[c(u(e.title),1)],64))]),_:2},[e.compact?void 0:{name:"icon-append",fn:o(()=>[e.info||e.withIndicator?(t(),s(x,{key:0,variation:"purple",class:S(["mc-side-bar-button__chip",{indicator:e.withIndicator}])},{default:o(()=>[c(u(e.withIndicator?"":e.info),1)]),_:1},8,["class"])):i("",!0)]),key:"0"}]),1040))}});L.__docgenInfo={exportName:"default",displayName:"McSideBarButton",description:"",tags:{},props:[{name:"to",description:"Если нужна ссылка внутри приложения:\n`{name: 'test', params: { id: test.id }}`",type:{name:"IRoute"},defaultValue:{func:!1,value:"null"}},{name:"href",description:"Если нужна обычная ссылка:\n`https://mcpay.io/`",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"icon",description:"Если нужна иконка",type:{name:"String as () => IconsListUnion"},defaultValue:{func:!1,value:"''"}},{name:"iconColor",description:`Если нужен конкретный
 цвет иконки`,type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"'currentColor'"}},{name:"title",description:"Тайтл кнопки",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"compact",description:"Compact size",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"variation",description:"Дизайн:\n `purple, red, purple-outline, purple-invert, purple-flat и т.д.`",type:{name:"String as () => ButtonVariationUnion"}},{name:"secondaryColor",description:"Если нужен другой цвет при взаимодействии",type:{name:"String as () => ColorTypes"}},{name:"withTooltip",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"withIndicator",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isActive",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"info",description:"Additional info",type:{name:"string | number | null"},defaultValue:{func:!1,value:"''"}},{name:"exact",description:"Exact",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Отключенное состояние",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/patterns/McSideBar/McSideBarButton/McSideBarButton.vue"]};export{L as _};
