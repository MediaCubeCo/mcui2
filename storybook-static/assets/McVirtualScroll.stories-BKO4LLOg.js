import{p as q,r as a,e as O,o as I,n as x,w as $,q as m,v as u,K as N,L as T,E as p,y as z,x as B}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as D}from"./McPreview-Dmn3-Ll-.js";import{_ as E}from"./McSvgIcon-Cq4_nq1C.js";import{s as i}from"./selectOptions-Ba3A5BLq.js";import"./Sizes-ByFfI8jG.js";import"./Colors-CDVZRUyv.js";const d=q({__name:"McVirtualScroll",props:{items:{type:Array,default:()=>[],required:!0},containerHeight:{type:Number,required:!0},itemHeight:{type:Number,default:20,required:!0},buffer:{type:Number,default:1}},setup(V){const e=V,s=a(null),o=a(0),f=a([]),g=a(0),w=O(()=>({height:`${e.containerHeight}px`,overflowY:"auto",position:"relative"})),h=()=>{g.value=e.items.length*e.itemHeight},c=()=>{var b;const t=((b=s.value)==null?void 0:b.clientHeight)||0,v=Math.floor(o.value/e.itemHeight),n=Math.min(e.items.length-1,Math.floor((o.value+t)/e.itemHeight)),y=e.buffer||5,_=[];for(let r=Math.max(0,v-y);r<=Math.min(n+y,e.items.length-1);r++)_.push({key:r,data:e.items[r],index:r,top:r*e.itemHeight});f.value=_},k=()=>{var t;o.value=((t=s.value)==null?void 0:t.scrollTop)||0,requestAnimationFrame(c)};return I(()=>{h(),x(c)}),$(()=>e.items,()=>{h(),x(c)}),(t,v)=>(m(),u("div",{class:"mc-virtual-scroll",ref_key:"containerRef",ref:s,onScroll:k,style:p(w.value)},[(m(!0),u(N,null,T(f.value,n=>(m(),u("div",{key:`mc-virtual-scroll__item-${n.key}`,class:"mc-virtual-scroll__item",style:p({top:`${n.top}px`})},[z(t.$slots,"item",{item:n.data,index:n.index})],4))),128)),B("div",{style:p({height:`${g.value}px`})},null,4)],36))}});d.__docgenInfo={exportName:"default",displayName:"McVirtualScroll",description:"",tags:{},props:[{name:"items",description:"Массив данных для рендеринга",type:{name:"any[]"},required:!0,defaultValue:{func:!0,value:"() => []"}},{name:"containerHeight",description:"Высота контейнера скролла",type:{name:"number"},required:!0},{name:"itemHeight",description:"Высота 1 элемента списка",type:{name:"number"},required:!0,defaultValue:{func:!1,value:"20"}},{name:"buffer",description:"Буфер для подгрузки дополнительных элементов вне видимой области",type:{name:"number"},defaultValue:{func:!1,value:"1"}}],slots:[{name:"item",scoped:!0,bindings:[{name:"item",title:"binding"},{name:"index",title:"binding"}]}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/templates/McVirtualScroll/McVirtualScroll.vue"]};const K={title:"McVirtualScroll",component:d,tags:["autodocs"],argTypes:{containerHeight:{control:"number"},itemHeight:{control:"number"},buffer:{control:"number"}},args:{containerHeight:500,itemHeight:40,buffer:1},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},l={render(){return{components:{McVirtualScroll:d,McPreview:D,McSvgIcon:E},computed:{items(){return[...i,...i,...i,...i,...i,...i]}},template:`
      <mc-virtual-scroll :items="items" :item-height="40" :container-height="500">
        <template #item="{ item, index }">
          <mc-preview>
            <template #left>
              <mc-svg-icon name="mc_pay_app" size="400" />
            </template>
            <template #top>{{ item.title }}</template>
          </mc-preview>
        </template>
      </mc-virtual-scroll>
      `}}};var H,M,S;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McVirtualScroll,
        McPreview,
        McSvgIcon
      },
      computed: {
        items() {
          return [...selectOptions, ...selectOptions, ...selectOptions, ...selectOptions, ...selectOptions, ...selectOptions];
        }
      },
      template: \`
      <mc-virtual-scroll :items="items" :item-height="40" :container-height="500">
        <template #item="{ item, index }">
          <mc-preview>
            <template #left>
              <mc-svg-icon name="mc_pay_app" size="400" />
            </template>
            <template #top>{{ item.title }}</template>
          </mc-preview>
        </template>
      </mc-virtual-scroll>
      \`
    };
  }
}`,...(S=(M=l.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};const U=["Default"];export{l as Default,U as __namedExportsOrder,K as default};
