import{p as Q,I as X,e as a,v as n,y as g,B as c,x as r,P as y,z as Y,u as _,F as S,G as i,A as J,E as K,q as l,Q as s,M as d}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as u}from"./McTitle-BRys2FLH.js";import{D as k,_ as W}from"./McSvgIcon-Cq4_nq1C.js";import{u as Z}from"./useFieldErrors-_2MdWRxY.js";import{S as L}from"./Sizes-ByFfI8jG.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";const ee=["dir"],te={key:0,class:"mc-field-text__header"},le={class:"mc-field-checkbox__input-wrap"},ae={class:"mc-field-checkbox__name"},ce={key:0,class:"mc-field-checkbox__name-text"},oe={class:"mc-field-checkbox__footer"},ne={key:1},b=Q({__name:"McFieldCheckbox",props:{modelValue:{type:[Boolean,String,Number,Array],validator(x,v){return v.multiple?Array.isArray(x):!0}},name:{type:String,default:null},checkedValue:{type:[String,Boolean,Number],default:!0},uncheckedValue:{type:[String,Boolean,Number],default:!1},errors:{type:Array,default:null},helpText:{type:String,default:null},mainText:{type:String,default:null},title:{type:String,default:null},disabled:{type:Boolean,default:!1},multiple:{type:Boolean,default:!1},checkboxSize:{type:String,default:"250"},tabindex:{type:[String,Number]},dir:{type:String,default:k.Ltr}},emits:["update:modelValue"],setup(x,{emit:v}){const R=v,P=X(),e=x,o=Z(e.errors),j=a(()=>e.dir===k.Rtl),I=a(()=>({"mc-field-checkbox":!0,"mc-field-checkbox--error":e.errors,"mc-field-checkbox--disabled":e.disabled,"mc-field-checkbox--empty":!e.mainText&&!P.default,"mc-field-checkbox--rtl":j.value})),U=a(()=>({"--mc-field-checkbox-size":L[e.checkboxSize]})),V=a(()=>e.multiple&&e.modelValue?e.modelValue.includes(e.checkedValue):e.modelValue===e.checkedValue),q=a(()=>({disabled:e.disabled,name:e.name,checked:V.value,tabindex:e.tabindex,type:"checkbox",class:"mc-field-checkbox__input"})),G=t=>{o.toggleErrorVisible();const C=e.multiple&&e.modelValue?e.modelValue.includes(e.checkedValue)?e.modelValue.filter(H=>H!==e.checkedValue):[...e.modelValue,e.checkedValue]:t.target&&t.target.checked?e.checkedValue:e.uncheckedValue;R("update:modelValue",C)};return(t,C)=>(l(),n("div",{dir:e.dir,class:J(I.value),style:K(U.value)},[e.title||t.$slots.header?(l(),n("div",te,[g(t.$slots,"header",{},()=>[y(u,{weight:"medium"},{default:i(()=>[s(d(e.title),1)]),_:1})])])):c("",!0),r("div",le,[r("label",ae,[y(W,{class:"mc-field-checkbox__icon",name:V.value?"checkbox--checked":"checkbox",color:V.value?"purple":"gray",size:e.checkboxSize},null,8,["name","color","size"]),r("input",Y(q.value,{onChange:G}),null,16),e.mainText||t.$slots.default?(l(),n("span",ce,[g(t.$slots,"default",{},()=>[y(u,{"tag-name":"div"},{default:i(()=>[s(d(e.mainText),1)]),_:1})])])):c("",!0)]),r("div",oe,[_(o).errorText.value?(l(),S(u,{key:0,"tag-name":"div",color:"red",variation:"overline","max-width":"100%"},{default:i(()=>[s(d(_(o).errorText.value),1)]),_:1})):c("",!0),_(o).errorText.value?(l(),n("br",ne)):c("",!0),g(t.$slots,"footer",{},()=>[e.helpText?(l(),S(u,{key:0,"tag-name":"div",variation:"overline",color:"gray","max-width":"100%"},{default:i(()=>[s(d(e.helpText),1)]),_:1})):c("",!0)])])])],14,ee))}});b.__docgenInfo={exportName:"default",displayName:"McFieldCheckbox",description:"",tags:{},props:[{name:"modelValue",type:{name:"boolean|string|number|string[] | number[]"}},{name:"name",description:"Name",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"checkedValue",description:"Выбранное значение",type:{name:"string|boolean|number"},defaultValue:{func:!1,value:"true"}},{name:"uncheckedValue",description:"Невыбранное значение",type:{name:"string|boolean|number"},defaultValue:{func:!1,value:"false"}},{name:"errors",description:"Ошибки",type:{name:"string[]"},defaultValue:{func:!1,value:"null"}},{name:"helpText",description:"Вспомогательный текст под инпутом:",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"mainText",description:"Подпись чекбокса:",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"title",description:"Заголовок поля:",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"disabled",description:"Отключенное состояние",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"multiple",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"checkboxSize",type:{name:"String as () => SizeTypes"},defaultValue:{func:!1,value:"'250'"}},{name:"tabindex",description:"Атрибут tabindex для главного элемента",type:{name:"string|number"}},{name:"dir",type:{name:"String as () => Directions"},defaultValue:{func:!1,value:"Directions.Ltr"}}],events:[{name:"update:modelValue"}],slots:[{name:"header",description:"Слот заголовка"},{name:"default",description:"Слот для пользовательской подписи чекбокса"},{name:"footer",description:"Слот доп. текста под чекбоксом"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/elements/McFieldCheckbox/McFieldCheckbox.vue"]};const be={title:"McFieldCheckbox",component:b,tags:["autodocs"],argTypes:{helpText:{control:"text"},name:{control:"text"},checkedValue:{control:"text"},unCheckedValue:{control:"text"},mainText:{control:"text"},title:{control:"text"},modelValue:{control:"none"},errors:{control:"none"},disabled:{control:"boolean"},multiple:{control:"boolean"},tabindex:{control:"number"},checkboxSize:{control:"select",options:Object.keys(L)},dir:{control:"select",options:Object.values(k)}},args:{name:"McCheckbox name",helpText:"Help text",mainText:"McFieldCheckbox",checkedValue:"true",uncheckedValue:!1,title:"McFieldCheckbox title",disabled:!1,multiple:!1,tabindex:0,dir:k.Ltr},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},m={args:{}},p={args:{dir:"rtl",mainText:"Checkbox rtl orientation"}},h={render(){return{components:{McFieldCheckbox:b},data(){return{v:null,checkedValue:"McCheckbox"}},template:`
                checkedValue - {{ checkedValue }}
                <br />
                <br />
                <mc-field-checkbox v-model="v" :checked-value="checkedValue">McFieldCheckbox</mc-field-checkbox>
                <br />
                Output: {{ v }}
            `}}},f={render(){return{components:{McFieldCheckbox:b},data(){return{v:[]}},template:`
                <mc-field-checkbox v-model="v" multiple :checked-value="1">McFieldCheckbox {1}</mc-field-checkbox>
                <mc-field-checkbox v-model="v" multiple checked-value="McCheckbox">McFieldCheckbox {McCheckbox}</mc-field-checkbox>
                <mc-field-checkbox v-model="v" multiple :checked-value="3">McFieldCheckbox {3}</mc-field-checkbox>
                <br />
                Output: {{ v }}
            `}}};var M,F,T;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {}
}`,...(T=(F=m.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};var z,D,N;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    dir: 'rtl',
    mainText: 'Checkbox rtl orientation'
  }
}`,...(N=(D=p.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var B,w,A;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldCheckbox
      },
      data() {
        return {
          v: null,
          checkedValue: 'McCheckbox'
        };
      },
      template: \`
                checkedValue - {{ checkedValue }}
                <br />
                <br />
                <mc-field-checkbox v-model="v" :checked-value="checkedValue">McFieldCheckbox</mc-field-checkbox>
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(A=(w=h.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var E,O,$;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldCheckbox
      },
      data() {
        return {
          v: []
        };
      },
      template: \`
                <mc-field-checkbox v-model="v" multiple :checked-value="1">McFieldCheckbox {1}</mc-field-checkbox>
                <mc-field-checkbox v-model="v" multiple checked-value="McCheckbox">McFieldCheckbox {McCheckbox}</mc-field-checkbox>
                <mc-field-checkbox v-model="v" multiple :checked-value="3">McFieldCheckbox {3}</mc-field-checkbox>
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...($=(O=f.parameters)==null?void 0:O.docs)==null?void 0:$.source}}};const xe=["Default","DirectionRtl","CustomCheckedValue","MultipleValue"];export{h as CustomCheckedValue,m as Default,p as DirectionRtl,f as MultipleValue,xe as __namedExportsOrder,be as default};
