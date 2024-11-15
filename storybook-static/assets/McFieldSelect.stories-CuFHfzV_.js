import{_ as e,S as E}from"./McFieldSelect-BIwQ6nnt.js";import{s as t}from"./selectOptions-Ba3A5BLq.js";import{D as d}from"./McSvgIcon-Cq4_nq1C.js";import{i as W}from"./icons-CCDgBq90.js";import{C as A}from"./Colors-CDVZRUyv.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./McTitle-BRys2FLH.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./FontWeights-CHR9KMRI.js";import"./McAvatar-BA28_YXM.js";import"./Sizes-ByFfI8jG.js";import"./McTooltip-CnE_6JSP.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./McPreview-Dmn3-Ll-.js";import"./useFieldErrors-_2MdWRxY.js";import"./Weights-CEN83Yli.js";const C=Object.keys(W),ee={title:"McFieldSelect",component:e,tags:["autodocs"],argTypes:{modelValue:{control:"none"},title:{control:"text"},searchable:{control:"boolean"},multiple:{control:"boolean"},hideSelected:{control:"boolean"},allowEmpty:{control:"boolean"},disabled:{control:"boolean"},taggable:{control:"boolean"},internalSearch:{control:"boolean"},loading:{control:"boolean"},optionsTooltip:{control:"boolean"},showLabels:{control:"boolean"},renderAbsoluteList:{control:"boolean"},required:{control:"boolean"},optionWithPreview:{control:"boolean"},dir:{control:"select",options:d},icon:{control:"select",options:C},openDirection:{control:"select",options:E},avatar:{control:"text"},locale:{control:"text"},noResultsText:{control:"text"},maxHeight:{control:"text"},tabindex:{control:"number"},backgroundColor:{control:"select",options:Object.keys(A)}},args:{title:"McPay benefits",searchable:!0,multiple:!1,hideSelected:!0,allowEmpty:!0,disabled:!1,taggable:!1,internalSearch:!0,loading:!1,optionsTooltip:!1,showLabels:!1,renderAbsoluteList:!1,required:!1,groupSelect:!1,optionWithPreview:!1,dir:d.Ltr,avatar:"",locale:"en",tabindex:0,noResultsText:"No results for now",maxHeight:""},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280"}}},l={args:{options:t,name:"McFieldSelectDefault",titleField:"title",valueField:"id",placeholder:"Select McPay feature",errors:["Error"],helpText:"Help text"}},o={render(){return{data(){return{v:null,titleField:"title",valueField:"id",options:t}},components:{McFieldSelect:e},template:`
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `}}},i={render(){return{data(){return{v:2,titleField:"title",valueField:"id",options:t}},components:{McFieldSelect:e},template:`
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            icon="mc_pay_app"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `}}},r={render(){return{data(){return{v:3,titleField:"title",valueField:"id",options:t}},components:{McFieldSelect:e},template:`
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            option-with-preview
            :options="options"
          />
          <br />
          Output: {{ v }}
        `}}},a={render(){return{data(){return{v:[],titleField:"title",valueField:"id",options:t}},components:{McFieldSelect:e},template:`
          <mc-field-select 
            v-model="v"
            placeholder="Select McPay benefits"
            multiple
            name="McFieldSelectMulti" 
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `}}},c={render(){return{data(){return{v:[],titleField:"title",valueField:"id",options:t}},components:{McFieldSelect:e},template:`
          <mc-field-select
            v-model="v"
            placeholder="Select McPay benefits or add manually"
            taggable 
            multiple
            name="McFieldSelectTag"
            :title-field="titleField"
            :value-field="valueField" 
            :options="options"
          />
          <br />
          Output: {{ v }}
        `}}},n={render(){return{data(){return{v:null,titleField:"title",valueField:"id",options:[{label:"McPay benefits",values:t}]}},components:{McFieldSelect:e},template:`
          <mc-field-select 
            v-model="v"
            placeholder="Select McPay features from group"
            multiple
            name="McFieldSelectGrouped"
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `}}};var s,p,u;l.parameters={...l.parameters,docs:{...(s=l.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    options: selectOptions,
    name: 'McFieldSelectDefault',
    titleField: 'title',
    valueField: 'id',
    placeholder: 'Select McPay feature',
    errors: ['Error'],
    helpText: 'Help text'
  }
}`,...(u=(p=l.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,v,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          v: null,
          titleField: 'title',
          valueField: 'id',
          options: selectOptions
        };
      },
      components: {
        McFieldSelect
      },
      template: \`
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        \`
    };
  }
}`,...(f=(v=o.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var F,S,b;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          v: 2,
          titleField: 'title',
          valueField: 'id',
          options: selectOptions
        };
      },
      components: {
        McFieldSelect
      },
      template: \`
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            icon="mc_pay_app"
            :options="options"
          />
          <br />
          Output: {{ v }}
        \`
    };
  }
}`,...(b=(S=i.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var M,g,h;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          v: 3,
          titleField: 'title',
          valueField: 'id',
          options: selectOptions
        };
      },
      components: {
        McFieldSelect
      },
      template: \`
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            option-with-preview
            :options="options"
          />
          <br />
          Output: {{ v }}
        \`
    };
  }
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,O,P;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          v: [],
          titleField: 'title',
          valueField: 'id',
          options: selectOptions
        };
      },
      components: {
        McFieldSelect
      },
      template: \`
          <mc-field-select 
            v-model="v"
            placeholder="Select McPay benefits"
            multiple
            name="McFieldSelectMulti" 
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        \`
    };
  }
}`,...(P=(O=a.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};var x,w,T;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          v: [],
          titleField: 'title',
          valueField: 'id',
          options: selectOptions
        };
      },
      components: {
        McFieldSelect
      },
      template: \`
          <mc-field-select
            v-model="v"
            placeholder="Select McPay benefits or add manually"
            taggable 
            multiple
            name="McFieldSelectTag"
            :title-field="titleField"
            :value-field="valueField" 
            :options="options"
          />
          <br />
          Output: {{ v }}
        \`
    };
  }
}`,...(T=(w=c.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var D,L,_;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          v: null,
          titleField: 'title',
          valueField: 'id',
          options: [{
            label: 'McPay benefits',
            values: selectOptions
          }]
        };
      },
      components: {
        McFieldSelect
      },
      template: \`
          <mc-field-select 
            v-model="v"
            placeholder="Select McPay features from group"
            multiple
            name="McFieldSelectGrouped"
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        \`
    };
  }
}`,...(_=(L=n.parameters)==null?void 0:L.docs)==null?void 0:_.source}}};const te=["Default","Single","SingleWithIcon","SingleWithPreview","Multiple","Taggable","Grouped"];export{l as Default,n as Grouped,a as Multiple,o as Single,i as SingleWithIcon,r as SingleWithPreview,c as Taggable,te as __namedExportsOrder,ee as default};
