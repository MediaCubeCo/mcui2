import{p as A,e as b,v as l,x as V,y as M,K as P,L as B,u as s,F as d,G as m,B as i,A as E,q as t,Q as f,M as v,z as L}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as U,R as $}from"./McFieldRadio-BiGZnjdA.js";import{_ as y}from"./McTitle-BRys2FLH.js";import{u as O}from"./useFieldErrors-_2MdWRxY.js";import{D as g}from"./McSvgIcon-Cq4_nq1C.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";import"./Sizes-ByFfI8jG.js";var p=(r=>(r.Column="column",r.Row="row",r))(p||{});const q=["dir"],I={class:"mc-field-radio-group__header"},z={class:"mc-field-radio-group__buttons"},j={key:0,class:"mc-field-radio-group__footer"},H={key:1},h=A({__name:"McFieldRadioGroup",props:{modelValue:[String,Number],options:{type:[Array],default:()=>[]},title:{type:String,default:""},helpText:{type:String,default:""},errors:{type:Array,default:()=>[]},name:{type:String,required:!0},disabled:{type:Boolean,default:!1},radioClassName:{type:String,default:""},direction:{type:String,default:p.Column},dir:{type:String,default:g.Ltr},variation:{type:String,default:"circle"}},emits:["update:modelValue","change"],setup(r,{emit:C}){const _=C,e=r,n=O(e.errors),D=b(()=>e.options.length?e.options.map((a,x)=>{const o=typeof a=="object"?a:{label:a,value:a};return{id:Date.now()+x,...o,disabled:e.disabled||o.disabled,value:o.value,modelValue:e.modelValue,class:e.radioClassName,dir:e.dir,variation:e.variation}}):[]),F=b(()=>({[`mc-field-radio-group--direction-${e.direction}`]:!!e.direction})),N=a=>{n.toggleErrorVisible(),_("update:modelValue",a),_("change",a)};return(a,x)=>(t(),l("div",{dir:e.dir,class:E(["mc-field-radio-group",F.value])},[V("div",I,[M(a.$slots,"header",{},()=>[e.title?(t(),d(y,{key:0},{default:m(()=>[f(v(e.title),1)]),_:1})):i("",!0)])]),V("div",z,[(t(!0),l(P,null,B(D.value,o=>(t(),d(U,L({key:o.id,ref_for:!0},o,{name:e.name,"onUpdate:modelValue":N}),null,16,["name"]))),128))]),s(n).errorText.value||e.helpText||a.$slots.footer?(t(),l("div",j,[s(n).errorText.value?(t(),d(y,{key:0,"tag-name":"div",color:"red",variation:"overline","max-width":"100%"},{default:m(()=>[f(v(s(n).errorText.value),1)]),_:1})):i("",!0),s(n).errorText.value?(t(),l("br",H)):i("",!0),M(a.$slots,"footer",{},()=>[e.helpText?(t(),d(y,{key:0,"tag-name":"div",variation:"overline",color:"gray","max-width":"100%"},{default:m(()=>[f(v(e.helpText),1)]),_:1})):i("",!0)])])):i("",!0)],10,q))}});h.__docgenInfo={exportName:"default",displayName:"McFieldRadioGroup",description:"",tags:{},props:[{name:"modelValue",type:{name:"string|number"}},{name:"options",description:"Объект или массив данных",type:{name:"IRadioGroupOptions"},defaultValue:{func:!0,value:"() => []"}},{name:"title",description:"Заголовок:",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"helpText",description:"Вспомогательный текст под инпутом:",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"errors",description:"Ошибки",type:{name:"string[]"},defaultValue:{func:!0,value:"() => []"}},{name:"name",description:"Name",type:{name:"string"},required:!0},{name:"disabled",description:`Отключенное состояние
 всего списка`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"radioClassName",description:`Добавление пользовательского
 класса к radio`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"direction",description:"Направление списка\n `column`, `row`",type:{name:"String as () => RadioGroupDirectionUnion"},defaultValue:{func:!1,value:"RadioGroupDirection.Column"}},{name:"dir",type:{name:"String as () => DirectionsUnion"},defaultValue:{func:!1,value:"Directions.Ltr"}},{name:"variation",description:`Вариант активного состояния
circle - внутри круг
checkmark - внутри галочка`,type:{name:"String as () => RadioVariationUnion"},defaultValue:{func:!1,value:"'circle'"}}],events:[{name:"update:modelValue"},{name:"change"}],slots:[{name:"header",description:"Слот заголовка"},{name:"footer",description:"Слот доп. текста под инпутом"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/elements/McFieldRadioGroup/McFieldRadioGroup.vue"]};const re={title:"McFieldRadioGroup",component:h,tags:["autodocs"],argTypes:{variation:{control:"select",options:$},direction:{control:"select",options:p},dir:{control:"select",options:g},modelValue:{control:"none"},errors:{control:"none"},title:{control:"text"},helpText:{control:"text"},name:{control:"text"},disabled:{control:"boolean"},radioClassName:{control:"text"}},args:{variation:"checkmark",title:"McFieldRadioGroup title",helpText:"Help text",name:"McFieldRadioGroup",disabled:!1,radioClassName:"",direction:p.Column,dir:g.Ltr},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},u={args:{options:["McPay Advance","McPay Expresses"],modelValue:"McPay Advance"}},c={render(){return{components:{McFieldRadioGroup:h},data(){return{v:1,options:[{label:"McPay Advance",value:1,helpText:"Best way"},{label:"McPay Expresses",value:2,helpText:"Best way"}]}},template:`
                <mc-field-radio-group v-model="v" :errors="['Select your boost']" :options="options" help-text="Go" name="radio-group" value="value1" />
                <br />
                Output: {{ v }}
            `}}};var S,T,G;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    options: ['McPay Advance', 'McPay Expresses'],
    modelValue: 'McPay Advance'
  }
}`,...(G=(T=u.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var R,k,w;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldRadioGroup
      },
      data() {
        return {
          v: 1,
          options: [{
            label: 'McPay Advance',
            value: 1,
            helpText: 'Best way'
          }, {
            label: 'McPay Expresses',
            value: 2,
            helpText: 'Best way'
          }]
        };
      },
      template: \`
                <mc-field-radio-group v-model="v" :errors="['Select your boost']" :options="options" help-text="Go" name="radio-group" value="value1" />
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(w=(k=c.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};const ne=["Default","LiveGroup"];export{u as Default,c as LiveGroup,ne as __namedExportsOrder,re as default};
