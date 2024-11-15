import{_ as r,R as t}from"./McFieldRadio-BiGZnjdA.js";import{C as f}from"./Colors-CDVZRUyv.js";import{S as M}from"./Sizes-ByFfI8jG.js";import{D as i}from"./McSvgIcon-Cq4_nq1C.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./McTitle-BRys2FLH.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./FontWeights-CHR9KMRI.js";import"./useFieldErrors-_2MdWRxY.js";const D={title:"McFieldRadio",component:r,tags:["autodocs"],argTypes:{helpText:{control:"text"},modelValue:{control:"none"},value:{control:"text"},name:{control:"text"},errors:{control:"none"},disabled:{control:"boolean"},tabindex:{control:"number"},variation:{control:"select",options:t},color:{control:"select",options:Object.keys(f)},iconSize:{control:"select",options:Object.keys(M)},dir:{control:"select",options:i}},args:{name:"default",variation:t.Circle,disabled:!1,tabindex:0,color:"purple",value:"1",modelValue:"1",dir:i.Ltr},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},e={args:{label:"McFieldRadio",helpText:"Help text",name:"default"}},a={render(){return{components:{McFieldRadio:r},data(){return{v:"1"}},template:`
                <mc-field-radio v-model="v" name="radio" :errors="['Error text']" value="1">McFieldRadio</mc-field-radio>
                <br />
                <mc-field-radio v-model="v" name="radio" value="2">McFieldRadio 2</mc-field-radio>
                <br />
                Output: {{ v }}
            `}}},o={render(){return{components:{McFieldRadio:r},data(){return{v:"value1"}},template:`
                <mc-field-radio v-model="v" name="radio2" variation="checkmark" value="value1">McFieldRadio</mc-field-radio>
                <br />
                <McFieldRadio v-model="v" name="radio2" variation="checkmark" value="value2">McFieldRadio 2</McFieldRadio>
                <br />
                Output: {{ v }}
            `}}};var d,l,n;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'McFieldRadio',
    helpText: 'Help text',
    name: 'default'
  }
}`,...(n=(l=e.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var c,m,s;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldRadio
      },
      data() {
        return {
          v: '1'
        };
      },
      template: \`
                <mc-field-radio v-model="v" name="radio" :errors="['Error text']" value="1">McFieldRadio</mc-field-radio>
                <br />
                <mc-field-radio v-model="v" name="radio" value="2">McFieldRadio 2</mc-field-radio>
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(s=(m=a.parameters)==null?void 0:m.docs)==null?void 0:s.source}}};var u,p,v;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McFieldRadio
      },
      data() {
        return {
          v: 'value1'
        };
      },
      template: \`
                <mc-field-radio v-model="v" name="radio2" variation="checkmark" value="value1">McFieldRadio</mc-field-radio>
                <br />
                <McFieldRadio v-model="v" name="radio2" variation="checkmark" value="value2">McFieldRadio 2</McFieldRadio>
                <br />
                Output: {{ v }}
            \`
    };
  }
}`,...(v=(p=o.parameters)==null?void 0:p.docs)==null?void 0:v.source}}};const _=["Default","Group","CheckMark"];export{o as CheckMark,e as Default,a as Group,_ as __namedExportsOrder,D as default};
