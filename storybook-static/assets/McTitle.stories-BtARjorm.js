import{_ as d,T as u,L as g}from"./McTitle-BRys2FLH.js";import{C as f}from"./Colors-CDVZRUyv.js";import{H as v}from"./Alignment-5IJBP4cy.js";import{W as x}from"./Weights-CEN83Yli.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./FontWeights-CHR9KMRI.js";const L={title:"McTitle",component:d,tags:["autodocs"],argTypes:{variation:{control:"select",options:u},ellipsis:{control:"boolean"},uppercase:{control:"boolean"},preLine:{control:"boolean"},nowrap:{control:"boolean"},plainText:{control:"boolean"},color:{control:"select",options:Object.keys(f)},textAlign:{control:"select",options:v},lineHeight:{control:"select",options:Object.keys(g)},weight:{control:"select",options:x},htmlData:{control:"none"}},args:{ellipsis:!0,uppercase:!1,preLine:!1,nowrap:!1,plainText:!1},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},t={args:{default:"McTitle"}},e={render(){return{components:{McTitle:d},data(){return{text:'<div style="color: purple">Hello i am a purple text</div>'}},template:`
                input data - {{ text }}
                <br/>
                <mc-title :html-data="text" />
            `}}},o={args:{default:"McTitleAdaptiveText",variation:"body",variationS:"h3",variationM:"h1"}};var a,r,n;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    default: 'McTitle'
  }
}`,...(n=(r=t.parameters)==null?void 0:r.docs)==null?void 0:n.source}}};var s,i,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McTitle
      },
      data() {
        return {
          text: '<div style="color: purple">Hello i am a purple text</div>'
        };
      },
      template: \`
                input data - {{ text }}
                <br/>
                <mc-title :html-data="text" />
            \`
    };
  }
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,c,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    default: 'McTitleAdaptiveText',
    variation: 'body',
    variationS: 'h3',
    variationM: 'h1'
  }
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const w=["Default","VHtml","Adaptive"];export{o as Adaptive,t as Default,e as VHtml,w as __namedExportsOrder,L as default};
