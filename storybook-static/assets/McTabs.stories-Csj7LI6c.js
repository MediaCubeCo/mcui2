import{p as E,r as N,e as r,o as O,$ as H,w as P,v as d,x as c,P as j,G as F,y as U,A as k,E as z,Y as L,q as l,K as q,L as G,C as K,T as Y,F as _,B as C,M as J,n as Q}from"./vue.esm-bundler-DcuF_pQ3.js";import{C as p}from"./Colors-CDVZRUyv.js";import{a as X}from"./vue-router-XxfYOQaO.js";import{_ as Z}from"./McWrapScroll-BhYpeBq1.js";import{_ as T}from"./McSvgIcon-Cq4_nq1C.js";import{_ as ee}from"./McTab-CfP3KPVO.js";import"./McGridRow-TGd0ufJ2.js";import"./Spaces-DiQ1o4ZA.js";import"./Sizes-ByFfI8jG.js";var f=(o=>(o.Body="body",o.Captions="caption",o.Overline="overline",o))(f||{});const ae={class:"tabs-component"},ne=["aria-controls","aria-selected","href","onClick"],te={class:"tabs-component-tab__tab-name"},oe={class:"tabs-component-panels"},b=E({__name:"McTabs",props:{modelValue:{type:String,default:null},tabVariation:{type:String,default:f.Captions},color:{type:String,default:"black"},accentColor:{type:String,default:"purple"},uppercase:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},sticky:{type:Boolean,default:!1}},emits:["update:modelValue","tab-changed","clicked"],setup(o,{emit:D}){const h=D,y=X(),t=o,s=N([]),S=r(()=>({"mc-tabs":!0,[`mc-tabs--tab-variation-${t.tabVariation}`]:!!t.tabVariation,"mc-tabs--uppercase":!!t.uppercase,"mc-tabs--sticky":!!t.sticky})),M=r(()=>({"--mc-tabs-color":p[t.color],"--mc-tabs-accent-color":p[t.accentColor]})),W=r({get(){return t.modelValue},set(e){h("update:modelValue",e)}}),v=r(()=>s.value.filter(e=>e.visible&&!e.isDisabled));O(()=>{g()}),H(()=>{setTimeout(()=>{R()},10)});const A=e=>{s.value.forEach(n=>{n.isActive=n.computedId===e,n.isActive?n.showTab():n.hideTab()})},B=e=>{s.value.push(e)},g=()=>{let[e]=v.value;const n=s.value.find(a=>a.computedId===t.modelValue);n&&!n.isDisabled&&(e=n),e&&m(e)},I=e=>{h("tab-changed",{tab:e})},R=()=>{var a;if(t.loading)return;const e=(a=s.value)==null?void 0:a.find(u=>u.isActive);if(!(e!=null&&e.isDisabled))return;const[n]=v.value;m(n)},m=(e,n)=>{if(n==null||n.preventDefault(),!e.isDisabled){if(e.onClick&&typeof e.onClick=="function")return e.onClick(e);if(e.href){window.open(e.href,"_blank");return}if(e.to&&y){y.push(e.to);return}I(e),A(e.computedId),W.value=e.computedId}};return P(()=>t.loading,(e,n)=>{!e&&n&&Q(()=>{g()})}),L("selfRegisterTabMethod",B),(e,n)=>(l(),d("div",{class:k(S.value),style:z(M.value)},[c("div",ae,[j(Z,{"tag-name":"ul",role:"tablist",scrollable:"",class:"tabs-component-tabs"},{default:F(()=>[(l(!0),d(q,null,G(s.value,(a,u)=>K((l(),d("li",{key:u,class:k([{"is-active":a.isActive,"is-disabled":a.isDisabled},"tabs-component-tab"]),role:"presentation"},[c("a",{"aria-controls":a.hash,"aria-selected":a.isActive,href:a.to||a.href||a.hash,class:"tabs-component-tab-a",role:"tab",onClick:$=>m(a,$)},[c("span",te,[a.iconPrepend?(l(),_(T,{key:0,name:a.iconPrepend,color:a.iconPrependColor},null,8,["name","color"])):C("",!0),c("span",null,J(a.header),1),a.iconAppend?(l(),_(T,{key:1,name:a.iconAppend,color:a.iconAppendColor},null,8,["name","color"])):C("",!0)])],8,ne)],2)),[[Y,a.isVisible]])),128))]),_:1}),c("div",oe,[U(e.$slots,"default")])])],6))}});b.__docgenInfo={exportName:"default",displayName:"McTabs",description:"",tags:{},props:[{name:"modelValue",type:{name:"string | null"},defaultValue:{func:!1,value:"null"}},{name:"tabVariation",description:"Размеры табов:\n `body, caption, overline`",type:{name:"TabVariationUnion"},defaultValue:{func:!1,value:"TabVariations.Captions"}},{name:"color",description:"Цвет текста табов",type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"'black'"}},{name:"accentColor",description:"Цвет линии активного таба",type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"'purple'"}},{name:"uppercase",description:`Заглавные буквы
 табов`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loading",description:`Передаваемое состояние загрузки

Нужно для метода switchingDisableTab
в случае, если состояние табов (active/disable)
задается динамически`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"sticky",description:`Закрепленные табы

Добавляет верхнее расстояние
для табов для правильного отображения`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"update:modelValue",type:{names:["string"]}},{name:"tab-changed",type:{names:["{ tab: ITab }"]}},{name:"clicked",type:{names:["{ tab: ITab }"]}}],slots:[{name:"default"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/patterns/McTabs/McTabs.vue"]};const fe={title:"McTabs",component:b,tags:["autodocs"],argTypes:{tabVariation:{control:"select",options:Object.keys(f)},color:{control:"select",options:Object.keys(p)},accentColor:{control:"select",options:Object.keys(p)},uppercase:{control:"boolean"},loading:{control:"boolean"},sticky:{control:"boolean"}},args:{uppercase:!1,loading:!1,sticky:!1},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},i={render(){return{components:{McTabs:b,McTab:ee},data(){return{v:null}},methods:{handleChange(o){}},template:`
            <mc-tabs v-model="v" color="black" accent-color="purple" tab-variation="caption" @tab-changed="handleChange">
                <mc-tab id="custom" name="Custom fragment">Custom fragment content</mc-tab>
                <mc-tab 
                    name="With icon prep" 
                    icon-prepend="close" 
                    icon-prepend-color="red"
                >
                    With icon prepend.
                </mc-tab>
                <mc-tab 
                    name="With icon app" 
                    icon-append="link_external_new" 
                    icon-append-color="purple"
                >
                    With icon append.
                </mc-tab>
                <mc-tab
                    name="Href link"
                    icon-append-classes="las la-external-link-alt"
                    href="https://ya.ru"
                >
                    Href link
                </mc-tab>
                <mc-tab
                    name="with counter"
                    :append-count="5"
                    append-count-color="purple"
                >
                    with counter
                </mc-tab>
                <mc-tab
                    name="Router link" 
                    icon-append-classes="las la-external-link-alt" 
                    :to="{name: 'test', params: { id: 123 }}"
                >
                    Сработает только при наличии router = useRouter()
                </mc-tab>
                <mc-tab prefix="<<< " suffix=" >>>" name="With prefix and suffix">
                    With prefix and suffix
                </mc-tab>
                <mc-tab name="Disabled" is-disabled>Disabled content</mc-tab>
            </mc-tabs>
            `}}};var V,x,w;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McTabs,
        McTab
      },
      data() {
        return {
          v: null
        };
      },
      methods: {
        handleChange(payload) {}
      },
      template: \`
            <mc-tabs v-model="v" color="black" accent-color="purple" tab-variation="caption" @tab-changed="handleChange">
                <mc-tab id="custom" name="Custom fragment">Custom fragment content</mc-tab>
                <mc-tab 
                    name="With icon prep" 
                    icon-prepend="close" 
                    icon-prepend-color="red"
                >
                    With icon prepend.
                </mc-tab>
                <mc-tab 
                    name="With icon app" 
                    icon-append="link_external_new" 
                    icon-append-color="purple"
                >
                    With icon append.
                </mc-tab>
                <mc-tab
                    name="Href link"
                    icon-append-classes="las la-external-link-alt"
                    href="https://ya.ru"
                >
                    Href link
                </mc-tab>
                <mc-tab
                    name="with counter"
                    :append-count="5"
                    append-count-color="purple"
                >
                    with counter
                </mc-tab>
                <mc-tab
                    name="Router link" 
                    icon-append-classes="las la-external-link-alt" 
                    :to="{name: 'test', params: { id: 123 }}"
                >
                    Сработает только при наличии router = useRouter()
                </mc-tab>
                <mc-tab prefix="<<< " suffix=" >>>" name="With prefix and suffix">
                    With prefix and suffix
                </mc-tab>
                <mc-tab name="Disabled" is-disabled>Disabled content</mc-tab>
            </mc-tabs>
            \`
    };
  }
}`,...(w=(x=i.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};const be=["Default"];export{i as Default,be as __namedExportsOrder,fe as default};
