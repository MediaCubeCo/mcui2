import{p as L,r as l,e as n,w as U,v as b,x as D,A as z,E as d,N as p,y as E,P as g,B as j,q as C}from"./vue.esm-bundler-DcuF_pQ3.js";import{c as V,T as _}from"./index-BmsK2qgO.js";import{_ as S}from"./McSvgIcon-Cq4_nq1C.js";import{_ as Q}from"./McDrawerContentTemplate-tQnJcLvy.js";import{_ as q}from"./McButton-Cw3_qabT.js";import{_ as F}from"./McTitle-BRys2FLH.js";import{i as X}from"./icons-CCDgBq90.js";import"./index-DRQZTcpU.js";import"./Sizes-ByFfI8jG.js";import"./Colors-CDVZRUyv.js";import"./Weights-CEN83Yli.js";import"./FontWeights-CHR9KMRI.js";import"./useTooltip-C3VtZaBe.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";var a=(t=>(t.Left="left",t.Right="right",t))(a||{});const w=L({__name:"McDrawer",props:{modelValue:{type:Boolean,default:!1},duration:{type:Number,default:300},position:{type:String,default:a.Right},closeVisible:{type:Boolean,default:!0},showOverlay:{type:Boolean,default:!0},iconClose:{type:String,default:"close"},width:{type:Number,default:300}},emits:["toggle","open","close","update:modelValue"],setup(t,{emit:N}){const r=N,e=t,f=l(0),B=l(100),i=n(()=>e.position===a.Right),x=n(()=>i.value?100:-100),P=n(()=>({[i.value?a.Right:a.Left]:0})),o=l(f.value),c=l(x.value),R=V(c,{duration:e.duration,transition:_.easeOutQuart}),v=V(o,{duration:e.duration,transition:_.easeOutQuart}),h=n(()=>({visibility:v.value?"visible":"hidden",zIndex:v.value?1:-1})),T=n(()=>({transform:`translateX(${R.value}%)`,width:`${e.width}px`,[e.position]:0,...P.value})),$=n(()=>({"mc-drawer__overlay":!0,"mc-drawer__overlay--hidden":!e.showOverlay})),A=()=>{o.value=B.value,c.value=o.value===0?100:0,e.modelValue||(r("update:modelValue",!0),r("open"))},m=()=>{o.value=f.value,c.value=o.value===0?i.value?100:-100:0,e.modelValue&&(r("update:modelValue",!1),r("close"))},I=()=>{e.showOverlay&&m()};return U(()=>e.modelValue,u=>{u?A():m()},{immediate:!0}),(u,y)=>(C(),b("div",{class:"mc-drawer__wrapper",style:d(h.value)},[D("div",{class:z($.value),style:d(h.value),onClick:p(I,["stop"])},null,6),D("div",{class:"mc-drawer",style:d(T.value),onClick:y[0]||(y[0]=p(()=>{},["stop"]))},[E(u.$slots,"default"),t.closeVisible?(C(),b("button",{key:0,type:"button",class:"mc-drawer__btn-close",onClick:p(m,["prevent"])},[g(S,{class:"mc-drawer__icon-close",name:t.iconClose},null,8,["name"]),g(S,{class:"mc-drawer__icon-close--small",name:t.iconClose,size:"200"},null,8,["name"])])):j("",!0)],4)],4))}});w.__docgenInfo={exportName:"default",displayName:"McDrawer",description:"",tags:{},props:[{name:"modelValue",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"duration",type:{name:"number"},defaultValue:{func:!1,value:"300"}},{name:"position",type:{name:"String as () => DrawerPositionsUnion"},defaultValue:{func:!1,value:"DrawerPositions.Right"}},{name:"closeVisible",description:`Нужна ли кнопка
закрытия в шапке`,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showOverlay",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"iconClose",description:`Тип иконки
закрытия в шапке`,type:{name:"String as () => IconsListUnion"},defaultValue:{func:!1,value:"'close'"}},{name:"width",type:{name:"number"},defaultValue:{func:!1,value:"300"}}],events:[{name:"toggle",type:{names:["boolean"]}},{name:"open"},{name:"close"},{name:"update:modelValue",type:{names:["boolean"]}}],slots:[{name:"default"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/templates/McDrawer/McDrawer.vue"]};const G=Object.keys(X),me={title:"McDrawer",component:w,tags:["autodocs"],argTypes:{position:{control:"select",options:Object.values(a)},modelValue:{control:"none"},duration:{control:"number"},width:{control:"number"},closeVisible:{control:"boolean"},showOverlay:{control:"boolean"},iconClose:{control:"select",options:G}},args:{position:a.Right,duration:300,width:300,closeVisible:!0,showOverlay:!0,iconClose:"close"},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},s={args:{},render(){return{data(){return{showDrawer:!1}},components:{McButton:q,McDrawer:w,McTitle:F,McDrawerContentTemplate:Q},methods:{openDrawer(){this.showDrawer=!this.showDrawer},handleClose(){this.showDrawer=!1}},template:`
                <div style="height: 500px">
                  <mc-button @click.prevent="openDrawer">Show Drawer</mc-button>
                  <mc-drawer v-model="showDrawer">
                    <mc-drawer-content-template title="McDrawer">
                      <mc-title v-for="num in 5" :key="num" class="mt-300">
                        Этот пример демонстрирует как использовать 1 дровер.
                        <br />
                        <br />
                        Если нужно использование несколько дроверов без их явной вставки на странице/в компоненте:
                        <ol>
                          <li>Необходимо создать компонент, рутовым узлом которого будет mc-drawer-content-template (опционально, для типовой разметки)</li>
                          <li>при использовании ДС, передать все компоненты в drawerComponents (<code>app.use(MediacubeUI, { drawerComponents: {...} })</code>)</li>
                          <li>открывать дроверы в любом месте вашего проекта используя метод showDrawer из useDrawer</li>
                        </ol>
                      </mc-title>

                      <template #footer>
                        <mc-button @click.prevent="handleClose">Close</mc-button>
                      </template>
                    </mc-drawer-content-template>
                  </mc-drawer>
                </div>
            
            `}}};var M,k,O;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {},
  render() {
    return {
      data() {
        return {
          showDrawer: false
        };
      },
      components: {
        McButton,
        McDrawer,
        McTitle,
        McDrawerContentTemplate
      },
      methods: {
        openDrawer() {
          this.showDrawer = !this.showDrawer;
        },
        handleClose() {
          this.showDrawer = false;
        }
      },
      template: \`
                <div style="height: 500px">
                  <mc-button @click.prevent="openDrawer">Show Drawer</mc-button>
                  <mc-drawer v-model="showDrawer">
                    <mc-drawer-content-template title="McDrawer">
                      <mc-title v-for="num in 5" :key="num" class="mt-300">
                        Этот пример демонстрирует как использовать 1 дровер.
                        <br />
                        <br />
                        Если нужно использование несколько дроверов без их явной вставки на странице/в компоненте:
                        <ol>
                          <li>Необходимо создать компонент, рутовым узлом которого будет mc-drawer-content-template (опционально, для типовой разметки)</li>
                          <li>при использовании ДС, передать все компоненты в drawerComponents (<code>app.use(MediacubeUI, { drawerComponents: {...} })</code>)</li>
                          <li>открывать дроверы в любом месте вашего проекта используя метод showDrawer из useDrawer</li>
                        </ol>
                      </mc-title>

                      <template #footer>
                        <mc-button @click.prevent="handleClose">Close</mc-button>
                      </template>
                    </mc-drawer-content-template>
                  </mc-drawer>
                </div>
            
            \`
    };
  }
}`,...(O=(k=s.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};const ue=["Default"];export{s as Default,ue as __namedExportsOrder,me as default};
