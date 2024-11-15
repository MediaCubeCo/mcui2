import{_ as e}from"./McInfinityLoadingTrigger-CXP9DaIs.js";import{_ as r}from"./McTitle-BRys2FLH.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";const f={title:"McInfinityLoadingTrigger",component:e,tags:["autodocs"],argTypes:{},args:{},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},i={render(){return{components:{McInfinityLoadingTrigger:e,McTitle:r},data(){return{v:1,limit:10}},template:`
                <div class="placement">
                    <mc-title text-align="center" variation="info">Demonstration of the infinite loading indicator. According to the condition, it will load 
                        {{ limit }} blocks per page. If you remove the conditions, it will load from infinitely
                    </mc-title>
                    <div v-for="n in v" :key="n" style="height: 300px; background-color: #8756ff; border-radius: 12px; margin-bottom: 16px; padding: 16px">
                        <mc-title variation="h4" weight="normal" color="white">Block {{ n }}/{{ v }}</mc-title>
                    </div>
                    <mc-infinity-loading-trigger
                      :active="v < limit"
                      @loading="() => { v++ }"
                      @hide="() => (console.log('Block hide'))"
                    />
                </div>
            `}}};var t,n,o;i.parameters={...i.parameters,docs:{...(t=i.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McInfinityLoadingTrigger,
        McTitle
      },
      data() {
        return {
          v: 1,
          limit: 10
        };
      },
      template: \`
                <div class="placement">
                    <mc-title text-align="center" variation="info">Demonstration of the infinite loading indicator. According to the condition, it will load 
                        {{ limit }} blocks per page. If you remove the conditions, it will load from infinitely
                    </mc-title>
                    <div v-for="n in v" :key="n" style="height: 300px; background-color: #8756ff; border-radius: 12px; margin-bottom: 16px; padding: 16px">
                        <mc-title variation="h4" weight="normal" color="white">Block {{ n }}/{{ v }}</mc-title>
                    </div>
                    <mc-infinity-loading-trigger
                      :active="v < limit"
                      @loading="() => { v++ }"
                      @hide="() => (console.log('Block hide'))"
                    />
                </div>
            \`
    };
  }
}`,...(o=(n=i.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};const v=["Default"];export{i as Default,v as __namedExportsOrder,f as default};
