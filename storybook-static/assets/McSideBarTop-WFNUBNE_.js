import{p as x,r as D,e as h,v as c,F as i,R as _,G as t,A as $,f as I,q as o,x as P,u as l,y as S,Q as d,M as m,B as s,P as r}from"./vue.esm-bundler-DcuF_pQ3.js";import{a as C,_ as M}from"./McDropdown-CzJ7rEm7.js";import{_ as V,a as T}from"./McButton-Cw3_qabT.js";import{_ as u}from"./McSvgIcon-Cq4_nq1C.js";import{_ as w}from"./McPreview-Dmn3-Ll-.js";import{T as L,_ as b}from"./McTitle-BRys2FLH.js";import{c as N}from"./useTooltip-C3VtZaBe.js";import{d as z,S as U}from"./sidebar-_fboGCRM.js";import{H}from"./Alignment-5IJBP4cy.js";import{W as k}from"./Weights-CEN83Yli.js";const O=["src","alt"],j=["src","alt"],E=["src"],F=x({__name:"McSideBarTop",props:{menuApps:{type:Array,default:()=>[]},logoTitle:{type:String,default:"Dashboard"},logoTitleVariation:{type:String,default:L.Subtitle},logoSrc:{type:String,default:""},logoIcon:{type:String,default:""},dropdownPosition:{type:String,default:C.Left},compact:{type:Boolean,default:!1}},setup(e){const B=N(),A=I("provideData",{}),p=e,f=D(!1),g=h(()=>A.currentThemeConfig||z[U.Black]),v=h(()=>B.isEmpty(p.menuApps)?null:p.menuApps.filter(n=>!Object.prototype.hasOwnProperty.call(n,"isVisible")||n.isVisible));return(n,y)=>(o(),c("div",{class:$(["mc-side-bar-top",`mc-side-bar-top--theme-${g.value.dropdownActivator}`])},[v.value?(o(),i(M,{key:1,modelValue:f.value,"onUpdate:modelValue":y[0]||(y[0]=a=>f.value=a),position:e.dropdownPosition,items:v.value},{activator:t(()=>[r(w,null,{left:t(()=>[e.logoSrc?(o(),c("img",{key:0,class:"mc-side-bar-top__img",src:e.logoSrc,width:"24",height:"24",alt:e.logoTitle},null,8,j)):e.logoIcon?(o(),i(u,{key:1,class:"rotate",name:e.logoIcon},null,8,["name"])):s("",!0)]),top:t(()=>[r(V,{variation:`${g.value.dropdownActivator}-link`,size:e.compact?l(T).LCompact:l(T).L,class:"mc-side-bar-top__activator-btn"},{"icon-append":t(()=>[r(u,{class:"rotate",name:"arrow_drop_down",color:"gray"})]),default:t(()=>[e.compact?s("",!0):(o(),i(b,{key:0,weight:l(k).SemiBold,variation:e.logoTitleVariation},{"icon-append":t(()=>[S(n.$slots,"title-append")]),default:t(()=>[d(m(e.logoTitle)+" ",1)]),_:3},8,["weight","variation"]))]),_:3},8,["variation","size"])]),_:3})]),item:t(({item:a})=>[r(V,{"full-width":"","text-align":l(H).Left,variation:"black-flat",href:a.href,to:a.to,target:a.target,"is-active":a.isActive,exact:a.exact},{"icon-prepend":t(()=>[a.icon?(o(),i(u,{key:0,name:a.icon},null,8,["name"])):a.image?(o(),c("img",{key:1,src:a.image,width:"24",height:"24",alt:"service image"},null,8,E)):s("",!0)]),default:t(()=>[d(" "+m(a.name),1)]),_:2},1032,["text-align","href","to","target","is-active","exact"])]),_:3},8,["modelValue","position","items"])):(o(),i(w,{key:0},_({top:t(()=>[e.compact?s("",!0):(o(),i(b,{key:0,weight:l(k).SemiBold,variation:e.logoTitleVariation},{"icon-append":t(()=>[S(n.$slots,"title-append")]),default:t(()=>[d(m(e.logoTitle)+" ",1)]),_:3},8,["weight","variation"]))]),_:2},[e.logoSrc?{name:"left",fn:t(()=>[P("img",{class:"mc-side-bar-top__img",src:e.logoSrc,width:"24",height:"24",alt:e.logoTitle},null,8,O)]),key:"0"}:void 0]),1024))],2))}});F.__docgenInfo={exportName:"default",displayName:"McSideBarTop",description:"",tags:{},props:[{name:"menuApps",description:"Меню приложений",type:{name:"ISideBarApp[]"},defaultValue:{func:!0,value:"() => []"}},{name:"logoTitle",description:"Название сервиса",type:{name:"string"},defaultValue:{func:!1,value:"'Dashboard'"}},{name:"logoTitleVariation",description:"Размер текста названия сервиса",type:{name:"String as () => TitleVariationsUnion"},defaultValue:{func:!1,value:"TitleVariations.Subtitle"}},{name:"logoSrc",description:"Путь до изображения",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"logoIcon",description:`Имя иконки
 заголовка`,type:{name:"String as () => IconsListUnion"},defaultValue:{func:!1,value:"''"}},{name:"dropdownPosition",type:{name:"String as () => DropdownPositionsUnion"},defaultValue:{func:!1,value:"DropdownPositions.Left"}},{name:"compact",description:"Компактный вид",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"title-append"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/patterns/McSideBar/McSideBarTop/McSideBarTop.vue"]};export{F as _};
