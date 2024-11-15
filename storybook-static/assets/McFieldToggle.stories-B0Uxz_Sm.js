import{p as B,e as o,q as m,v as C,x as a,y as E,z as F,A as N,E as P,u as i,F as w,G as D,Q as A,M as z,B as O}from"./vue.esm-bundler-DcuF_pQ3.js";import{T as H,_ as G}from"./McTitle-BRys2FLH.js";import{u as U}from"./useFieldErrors-_2MdWRxY.js";import{C as c}from"./Colors-CDVZRUyv.js";import{H as $}from"./Alignment-5IJBP4cy.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./FontWeights-CHR9KMRI.js";const I={class:"mc-field-toggle__content"},W={class:"mc-field-toggle__text"},j={class:"mc-field-toggle__wrapper"},q=a("span",{class:"mc-field-toggle__slider"},null,-1),u=B({__name:"McFieldToggle",props:{modelValue:{type:[Boolean,String,Number],default:null},checkedValue:{type:[Boolean,String,Number],default:!0},uncheckedValue:{type:[Boolean,String,Number],default:!1},coloredText:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},textPosition:{type:String,default:"left"},color:{type:String,default:"purple"},errors:{type:Array,default:()=>[]},tabindex:{type:[String,Number]}},emits:["update:modelValue"],setup(v,{emit:x}){const _=x,e=v,s=U(e.errors),d=o(()=>e.modelValue===e.checkedValue),V=o(()=>({"mc-field-toggle":!0,"mc-field-toggle--checked":d.value,"mc-field-toggle--disabled":e.disabled,"mc-field-toggle--colored-text":e.coloredText,[`mc-field-toggle--text-position-${e.textPosition}`]:!!e.textPosition})),k=o(()=>{let t,l="initial";switch(e.color){case"purple":{t="light-purple";break}default:t=e.color,l="50%"}return{"--mc-field-toggle-color":e.color&&c[e.color],"--mc-field-toggle-disabled-color":t&&c[t],"--mc-field-toggle-saturate-value":l}}),T=o(()=>({checked:d.value,disabled:e.disabled,tabindex:e.tabindex,class:"mc-field-toggle__field",type:"checkbox"})),S=t=>{const M=t.target.checked;s.toggleErrorVisible(),_("update:modelValue",M?e.checkedValue:e.uncheckedValue)};return(t,l)=>(m(),C("div",I,[a("label",{class:N(V.value),style:P(k.value)},[a("span",W,[E(t.$slots,"default")]),a("span",j,[a("input",F(T.value,{onInput:S}),null,16),q])],6),i(s).errorText.value?(m(),w(G,{key:0,"tag-name":"div",color:"red",variation:i(H).Overline,"max-width":"100%"},{default:D(()=>[A(z(i(s).errorText.value),1)]),_:1},8,["variation"])):O("",!0)]))}});u.__docgenInfo={exportName:"default",displayName:"McFieldToggle",description:"",tags:{},props:[{name:"modelValue",description:"Значение",type:{name:"boolean | string | number"},defaultValue:{func:!1,value:"null"}},{name:"checkedValue",description:"Выбранное значение",type:{name:"boolean | string | number"},defaultValue:{func:!1,value:"true"}},{name:"uncheckedValue",description:"Невыбранное значение",type:{name:"boolean | string | number"},defaultValue:{func:!1,value:"false"}},{name:"coloredText",description:`Изменение цвета текста
 при переключении`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"disabled",description:"Отключенное состояние",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"textPosition",description:`Позиция текста
 относительно переключателя`,type:{name:"String as () => HorizontalAlignmentUnion"},defaultValue:{func:!1,value:"'left'"}},{name:"color",description:"Активный цвет",type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"'purple'"}},{name:"errors",description:"Ошибки",type:{name:"string[]"},defaultValue:{func:!0,value:"() => []"}},{name:"tabindex",description:"Атрибут tabindex для главного элемента",type:{name:"string | number"}}],events:[{name:"update:modelValue"}],slots:[{name:"default",description:"Слот для тайтла тогглера"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/elements/McFieldToggle/McFieldToggle.vue"]};const te={title:"McFieldToggle",component:u,tags:["autodocs"],argTypes:{modelValue:{control:"none"},checkedValue:{control:"text"},uncheckedValue:{control:"text"},coloredText:{control:"boolean"},disabled:{control:"boolean"},textPosition:{control:"select",options:$},color:{control:"select",options:Object.keys(c)},tabindex:{control:"number"}},args:{checkedValue:"true",uncheckedValue:"false",coloredText:!1,disabled:!1,errors:["Error text"],color:"purple",tabindex:0,default:"Hello"},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},n={args:{name:"Default"}},r={render(){return{components:{McFieldToggle:u},data(){return{v:null}},template:`
                <mc-field-toggle v-model="v" text-position="right">Get all McPay benefits</mc-field-toggle>
                <a v-if="v" href="https://mcpay.io/auth/sign-up" target="_blank">https://mcpay.io/auth/sign-up</a>
                <br />
                Output: {{ v }}
            `}}};var p,g,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    name: 'Default'
  }
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var b,h,y;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldToggle
      },
      data() {
        return {
          v: null
        };
      },
      template: \`
                <mc-field-toggle v-model="v" text-position="right">Get all McPay benefits</mc-field-toggle>
                <a v-if="v" href="https://mcpay.io/auth/sign-up" target="_blank">https://mcpay.io/auth/sign-up</a>
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(y=(h=r.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const ae=["Default","WithError"];export{n as Default,r as WithError,ae as __namedExportsOrder,te as default};
