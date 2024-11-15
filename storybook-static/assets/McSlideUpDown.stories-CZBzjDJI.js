import{_ as n}from"./McButton-Cw3_qabT.js";import{_ as r}from"./McTitle-BRys2FLH.js";import{_ as s}from"./McSlideUpDown-CguhuDbm.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./McSvgIcon-Cq4_nq1C.js";import"./Sizes-ByFfI8jG.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";const g={title:"McSlideUpDown",component:s,tags:["autodocs"],argTypes:{},args:{},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},e={render(){return{data(){return{isActive:!1,content:`
                    Which is more profitable: with or without a subscription?
                    It all depends on how often you use Expresses.
                    Without a subscription, the fee is higher, but it only applies to the amount that you decide to use early.
                    Expresses without a subscription are suitable for those who are used to withdrawing money once a month and only sometimes withdraw some amounts in advance.
                    With a subscription, the fee is lower, but it applies to the entire amount received, regardless of whether you used the money ahead of schedule or not.
                    Subscription is suitable for those who prefer to use the money right away. For example, for daily expenses.
                    `}},components:{McButton:n,McTitle:r,McSlideUpDown:s},template:`
            <div>
                <mc-button @click="isActive = !isActive">MC Pay Expresses</mc-button>
                <mc-slide-up-down :active="isActive">
                    <mc-title style="padding: 16px 0" pre-line>{{content}}</mc-title>
                </mc-slide-up-down>
            </div>
            `}}};var t,o,i;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          isActive: false,
          content: \`
                    Which is more profitable: with or without a subscription?
                    It all depends on how often you use Expresses.
                    Without a subscription, the fee is higher, but it only applies to the amount that you decide to use early.
                    Expresses without a subscription are suitable for those who are used to withdrawing money once a month and only sometimes withdraw some amounts in advance.
                    With a subscription, the fee is lower, but it applies to the entire amount received, regardless of whether you used the money ahead of schedule or not.
                    Subscription is suitable for those who prefer to use the money right away. For example, for daily expenses.
                    \`
        };
      },
      components: {
        McButton,
        McTitle,
        McSlideUpDown
      },
      template: \`
            <div>
                <mc-button @click="isActive = !isActive">MC Pay Expresses</mc-button>
                <mc-slide-up-down :active="isActive">
                    <mc-title style="padding: 16px 0" pre-line>{{content}}</mc-title>
                </mc-slide-up-down>
            </div>
            \`
    };
  }
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};const x=["Default"];export{e as Default,x as __namedExportsOrder,g as default};
