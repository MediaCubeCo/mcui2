import{p as T,r as C,e as n,w as V,q as N,v as $,x as q,P as B,G as s,y as r,E as h,u as E}from"./vue.esm-bundler-DcuF_pQ3.js";import{u as j,a as z,b as L}from"./index-BmsK2qgO.js";import{C as P}from"./Colors-CDVZRUyv.js";import{_ as O}from"./McPreview-Dmn3-Ll-.js";import{u as U}from"./index-DRQZTcpU.js";import{_ as A}from"./McSvgIcon-Cq4_nq1C.js";import"./Sizes-ByFfI8jG.js";const m=T({__name:"McDraggable",props:{variation:{type:String,default:"purple"},initial:{type:Object,default:()=>({x:0,y:0})},cardId:{type:[String,Number]},savePosition:{type:Boolean,default:!1},storageType:{type:String,default:"session"}},setup(k){const i=j("McDraggable",{}),u=z("McDraggable",{}),g=C(null),w=U(e=>{e()},100),a=k,t=n(()=>a.cardId),d=n(()=>a.storageType==="session"),y=n(()=>a.storageType==="local"),v=n(()=>{let e=a.initial.x||0,o=a.initial.y||0;if(a.savePosition&&!t.value&&console.warn("cardId prop required, if savePosition = true"),!t.value||!a.savePosition)return{x:e,y:o};if(d.value){const{x:c,y:p}=u.value[t.value]||{};e=c,o=p}if(y.value){const{x:c,y:p}=i.value[t.value]||{};e=c,o=p}return{x:e||0,y:o||0}}),{x:f,y:b,style:_}=L(g,{initialValue:{x:v.value.x,y:v.value.y}}),I=n(()=>({"--mc-draggable-color":P[a.variation]})),M=()=>{t.value&&(d.value&&(u.value={...u.value,[t.value]:{x:f.value,y:b.value}}),y.value&&(i.value={...i.value,[t.value]:{x:f.value,y:b.value}}))};return V(()=>_.value,()=>{a.savePosition&&w(M)}),(e,o)=>(N(),$("div",{ref_key:"draggable_el",ref:g,class:"mc-draggable",style:h([E(_),{position:"fixed"}])},[q("div",{class:"mc-draggable__inner",style:h(I.value)},[B(O,null,{left:s(()=>[r(e.$slots,"left")]),top:s(()=>[r(e.$slots,"top")]),bottom:s(()=>[r(e.$slots,"bottom")]),right:s(()=>[r(e.$slots,"right")]),_:3})],4)],4))}});m.__docgenInfo={exportName:"default",displayName:"McDraggable",description:"",tags:{},props:[{name:"variation",description:`Дизайн:
purple, red, orange и т.д.`,type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"'purple'"}},{name:"initial",type:{name:"DraggableInitPayload"},defaultValue:{func:!0,value:`() =>
  (({
    x: 0,
    y: 0
  }) as DraggableInitPayload)`}},{name:"cardId",description:"Key for save position to storage (**required**, if savePosition = true)",type:{name:"CardIdType"}},{name:"savePosition",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"storageType",type:{name:"StorageTypeUnion"},defaultValue:{func:!1,value:"'session'"}}],slots:[{name:"left"},{name:"top"},{name:"bottom"},{name:"right"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/elements/McDraggable/McDraggable.vue"]};const H={title:"McDraggable",component:m,tags:["autodocs"],argTypes:{variation:{control:"select",options:Object.keys(P)},initial:{control:"object"},cardId:{control:"text"},savePosition:{control:"boolean"},storageType:{control:"select",options:["session","local"]}},args:{variation:"black",initial:{x:10,y:10},savePosition:!1,storageType:"session"},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},l={render(){return{components:{McDraggable:m,McSvgIcon:A},template:`
              <div>
                  <a href="https://mcpay.io/auth/sign-up" target="_blank">https://mcpay.io/auth/sign-up</a>
                  <mc-draggable :initial="{ x: 10, y: 10 }" variation="black">
                      <template #left>
                          <mc-svg-icon name="mc_pay_app" size="500" />
                      </template>
                      <template #top>Drag me and know how you boost you revenues</template>
                      <template #bottom>Just drag me to right or bottom</template>
                  </mc-draggable>
              </div>
            `}}};var x,S,D;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McDraggable,
        McSvgIcon
      },
      template: \`
              <div>
                  <a href="https://mcpay.io/auth/sign-up" target="_blank">https://mcpay.io/auth/sign-up</a>
                  <mc-draggable :initial="{ x: 10, y: 10 }" variation="black">
                      <template #left>
                          <mc-svg-icon name="mc_pay_app" size="500" />
                      </template>
                      <template #top>Drag me and know how you boost you revenues</template>
                      <template #bottom>Just drag me to right or bottom</template>
                  </mc-draggable>
              </div>
            \`
    };
  }
}`,...(D=(S=l.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};const Q=["Default"];export{l as Default,Q as __namedExportsOrder,H as default};
