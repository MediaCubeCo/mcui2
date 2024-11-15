import{s}from"./selectOptions-Ba3A5BLq.js";import{_ as m,D as e,a as o}from"./McDropdown-CzJ7rEm7.js";import{_ as a}from"./McButton-Cw3_qabT.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./vue-router-XxfYOQaO.js";import"./index-DRQZTcpU.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";import"./useTooltip-C3VtZaBe.js";import"./McSvgIcon-Cq4_nq1C.js";import"./Sizes-ByFfI8jG.js";const M={title:"McDropdown",component:m,tags:["autodocs"],argTypes:{modelValue:{control:"none"},items:{control:"array"},listPosition:{control:"select",options:Object.values(e)},position:{control:"select",options:Object.values(o)},listMinWidth:{control:"select"},hideOnSelect:{control:"boolean"}},args:{items:[1,2,3],listPosition:e.Bottom,position:o.Left,hideOnSelect:!0},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280"}}},t={render(){return{data(){return{v:null}},components:{McDropdown:m,McButton:a},computed:{items(){return s}},template:`
              <mc-dropdown :items="this.items" @select="v = $event">
                  <template #activator>
                      <mc-button>{{ v?.title || 'Select McPay service' }}</mc-button>
                  </template>
                  <template #item="{ item }">
                      <mc-button variation="purple-link">{{ item.title }}</mc-button>
                  </template>
              </mc-dropdown>
            `}}};var n,i,r;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render() {
    return {
      data() {
        return {
          v: null
        };
      },
      components: {
        McDropdown,
        McButton
      },
      computed: {
        items() {
          return selectOptions;
        }
      },
      template: \`
              <mc-dropdown :items="this.items" @select="v = $event">
                  <template #activator>
                      <mc-button>{{ v?.title || 'Select McPay service' }}</mc-button>
                  </template>
                  <template #item="{ item }">
                      <mc-button variation="purple-link">{{ item.title }}</mc-button>
                  </template>
              </mc-dropdown>
            \`
    };
  }
}`,...(r=(i=t.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};const y=["Default"];export{t as Default,y as __namedExportsOrder,M as default};
