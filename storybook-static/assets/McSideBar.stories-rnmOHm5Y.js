import{p as O,r as c,e as i,o as U,D as j,w as u,Y as L,m as R,v as q,x as h,A as B,E as T,N as k,P as v,G as C,q as F,y as V}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as G}from"./McSideBarTop-WFNUBNE_.js";import{_ as H}from"./McSideBarCenter-CN-Q3Q9S.js";import{_ as P}from"./McSideBarBottom-BEjUlpJg.js";import{S as M,d as x,m as Y,a as J}from"./sidebar-_fboGCRM.js";import{T as K,_ as Q}from"./McTitle-BRys2FLH.js";import"./McDropdown-CzJ7rEm7.js";import"./vue-router-XxfYOQaO.js";import"./index-DRQZTcpU.js";import"./McButton-Cw3_qabT.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";import"./useTooltip-C3VtZaBe.js";import"./McSvgIcon-Cq4_nq1C.js";import"./Sizes-ByFfI8jG.js";import"./McPreview-Dmn3-Ll-.js";import"./Alignment-5IJBP4cy.js";import"./Weights-CEN83Yli.js";import"./McSideBarButton-DtgN5QRv.js";import"./McChip-DqO1iODX.js";import"./McSeparator-DNYl-E5K.js";import"./Spaces-DiQ1o4ZA.js";import"./McSlideUpDown-CguhuDbm.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";const X={class:"mc-side-bar__scrollable-container"},g=O({__name:"McSideBar",props:{logoTitle:{type:String,default:"Dashboard"},logoTitleVariation:{type:String,default:K.Subtitle},logoSrc:{type:String,default:""},logoIcon:{type:String,default:""},menuMainTitle:{type:String,default:""},menuMain:{type:Array,default:()=>[]},counts:{type:Object,default:()=>({})},menuApps:{type:Array,default:()=>[]},chatraConfig:{type:Object,default:null},hideText:{type:String,default:""},compact:{type:Boolean,default:!1},variable:{type:String,default:M.Black},width:{type:String,default:"216px"},compactWidth:{type:String,default:"56px"},absoluteBreakpoint:{type:Number,default:null},hiddenBreakpoint:{type:Number,default:null}},emits:["absolute-mode","hidden-mode","compact","chatraClick"],setup(a,{emit:N}){const l=N,e=a,p=c(!1),r=c(e.compact),n=c(e.compact),s=c(0),z=i(()=>({"mc-side-bar--compact":n.value,[y.value.className]:!0})),A=i(()=>({overflow:`${p.value?"hidden":"visible"}`,width:n.value?e.compactWidth:e.width})),D=i(()=>{const t=m.value&&n.value?{position:"absolute",left:`-${e.compactWidth}`}:{};let o={width:n.value?e.compactWidth:e.width};return b.value&&(o.width=e.compactWidth),m.value&&(o.width="0px"),{...o,...t}}),W=i(()=>({"mc-side-bar-wrapper__backdrop--full-width":!n.value&&s.value<e.absoluteBreakpoint})),b=i(()=>!!e.absoluteBreakpoint&&s.value<e.absoluteBreakpoint),m=i(()=>!!e.hiddenBreakpoint&&s.value<e.hiddenBreakpoint),y=i(()=>S.value[e.variable]||S.value[M.Black]),S=i(()=>({black:x.black,white:x.white}));U(()=>{(e.absoluteBreakpoint||e.hiddenBreakpoint&&window)&&(f(),window.addEventListener("resize",f))}),j(()=>{window.removeEventListener("resize",f)});const w=()=>{n.value=!n.value,l("compact",n.value)},E=()=>{n.value=!1,l("compact",n.value)},f=()=>{s.value=window.innerWidth};return u(()=>n.value,t=>{t?setTimeout(()=>{r.value=t},280):r.value=t,p.value=!0,setTimeout(()=>{p.value=!1},280)}),u(()=>e.compact,t=>{n.value=t}),u(()=>b.value,t=>{l("absolute-mode",t)},{immediate:!0}),u(()=>m.value,t=>{l("hidden-mode",t)},{immediate:!0}),L("provideData",R({currentThemeConfig:y.value})),(t,o)=>(F(),q("article",{ref:"sidebar-wrapper",class:"mc-side-bar-wrapper",style:T(D.value)},[h("section",{class:B(["mc-side-bar-wrapper__backdrop",W.value]),onClick:k(w,["stop","prevent"])},[h("div",{ref:"sidebar",class:B(["mc-side-bar",z.value]),style:T(A.value),onClick:o[1]||(o[1]=k(()=>{},["stop"]))},[v(G,{"logo-title":a.logoTitle,"logo-title-variation":a.logoTitleVariation,"logo-src":a.logoSrc,"logo-icon":a.logoIcon,compact:r.value,"menu-apps":a.menuApps},{"title-append":C(()=>[V(t.$slots,"title-append")]),_:3},8,["logo-title","logo-title-variation","logo-src","logo-icon","compact","menu-apps"]),h("section",X,[v(H,{title:a.menuMainTitle,"menu-main":a.menuMain,counts:a.counts,"chatra-config":a.chatraConfig,compact:r.value,onHandlerChatraClick:o[0]||(o[0]=Z=>l("chatraClick")),onOpenSideBar:E},null,8,["title","menu-main","counts","chatra-config","compact"]),v(P,{"hide-text":a.hideText,compact:r.value,"hidden-mode":m.value,"sidebar-width":a.width,onToggleSize:w},{"bottom-message":C(()=>[V(t.$slots,"bottom-message")]),_:3},8,["hide-text","compact","hidden-mode","sidebar-width"])])],6)],2)],4))}});g.__docgenInfo={exportName:"default",displayName:"McSideBar",description:"",tags:{},props:[{name:"logoTitle",description:"Название сервиса",type:{name:"string"},defaultValue:{func:!1,value:"'Dashboard'"}},{name:"logoTitleVariation",description:"Размер текста названия сервиса",type:{name:"String as () => TitleVariationsUnion"},defaultValue:{func:!1,value:"TitleVariations.Subtitle"}},{name:"logoSrc",description:"Путь до изображения",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"logoIcon",description:`Имя иконки
 заголовка`,type:{name:"String as () => IconsListUnion"},defaultValue:{func:!1,value:"''"}},{name:"menuMainTitle",description:`Заголовок
 центрального блока`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"menuMain",description:"Центральное меню",type:{name:"ISideBarMenuItem[]"},defaultValue:{func:!0,value:"() => []"}},{name:"counts",description:`Каунты для пунктов меню
 вставляются в пункты с ключем 'count_key'`,type:{name:"Record<string, number | null>"},defaultValue:{func:!0,value:"() => ({})"}},{name:"menuApps",description:"Меню приложений",type:{name:"ISideBarApp[]"},defaultValue:{func:!0,value:"() => []"}},{name:"chatraConfig",description:"Id чатры",type:{name:"object"},defaultValue:{func:!1,value:"null"}},{name:"hideText",description:`Текст кнопки
 сворачивания меню`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"compact",description:"Компактный вид",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"variable",description:"Цветовая схема",type:{name:"SidebarTheme"},defaultValue:{func:!1,value:"SidebarTheme.Black"}},{name:"width",description:"Ширина сайдбара",type:{name:"string"},defaultValue:{func:!1,value:"'216px'"}},{name:"compactWidth",description:"Ширина компактного сайдбара",type:{name:"string"},defaultValue:{func:!1,value:"'56px'"}},{name:"absoluteBreakpoint",description:`Брейкпоинт после которого
сайдбар становится абсолютным и появляется затемненный бэкдроп`,type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"hiddenBreakpoint",description:`Брейкпоинт после которого
сайдбар полностью прячется`,type:{name:"number"},defaultValue:{func:!1,value:"null"}}],events:[{name:"absolute-mode",type:{names:["boolean"]}},{name:"hidden-mode",type:{names:["boolean"]}},{name:"compact",type:{names:["boolean"]}},{name:"chatraClick"}],slots:[{name:"title-append"},{name:"bottom-message"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/patterns/McSideBar/McSideBar.vue"]};const Ve={title:"McSideBar",component:g,tags:["autodocs"],argTypes:{},args:{},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},d={render(){return{data(){return{compact:!1}},components:{McSideBar:g,McTitle:Q},computed:{menu(){return Y},apps(){return J}},methods:{handleCompact(){console.log("handleCompact")}},template:`
        <mc-side-bar :compact="compact" :menu-main="menu" :menu-apps="apps" logo-icon="mc_dashboard" hide-text="Collapse me" @compact="handleCompact">
          <template #bottom-message>
            <mc-title color="white">bottom-message slot</mc-title>
          </template>
        </mc-side-bar>
            `}}};var _,I,$;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          compact: false
        };
      },
      components: {
        McSideBar,
        McTitle
      },
      computed: {
        menu() {
          return menu;
        },
        apps() {
          return apps;
        }
      },
      methods: {
        handleCompact() {
          console.log('handleCompact');
        }
      },
      template: \`
        <mc-side-bar :compact="compact" :menu-main="menu" :menu-apps="apps" logo-icon="mc_dashboard" hide-text="Collapse me" @compact="handleCompact">
          <template #bottom-message>
            <mc-title color="white">bottom-message slot</mc-title>
          </template>
        </mc-side-bar>
            \`
    };
  }
}`,...($=(I=d.parameters)==null?void 0:I.docs)==null?void 0:$.source}}};const Me=["Default"];export{d as Default,Me as __namedExportsOrder,Ve as default};
