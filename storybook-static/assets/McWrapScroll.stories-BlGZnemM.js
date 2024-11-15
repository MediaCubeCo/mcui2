import{_ as s}from"./McWrapScroll-BhYpeBq1.js";import{C as a}from"./Colors-CDVZRUyv.js";import{C as l}from"./McGridRow-TGd0ufJ2.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./Spaces-DiQ1o4ZA.js";const i={title:"McWrapScroll",component:s,tags:["autodocs"],argTypes:{wrap:{control:"boolean"},gutterY:{control:"text"},gutterX:{control:"text"},scrollable:{control:"boolean"},justify:{control:"select",options:Object.values(l)}},args:{wrap:!1,scrollable:!0},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},r={render(){return{components:{McWrapScroll:s},computed:{backgrounds(){return Object.values(a)},styles(){return{minWidth:"100px",height:"50px",marginRight:"10px",borderRadius:"12px"}}},template:`
                <mc-wrap-scroll scrollable>
                    <div v-for="n in 25" :style="{ ...styles,backgroundColor: backgrounds[n] }"></div>
                </mc-wrap-scroll>
            `}}};var o,t,e;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McWrapScroll
      },
      computed: {
        backgrounds() {
          return Object.values(Colors);
        },
        styles() {
          return {
            minWidth: '100px',
            height: '50px',
            marginRight: '10px',
            borderRadius: '12px'
          };
        }
      },
      template: \`
                <mc-wrap-scroll scrollable>
                    <div v-for="n in 25" :style="{ ...styles,backgroundColor: backgrounds[n] }"></div>
                </mc-wrap-scroll>
            \`
    };
  }
}`,...(e=(t=r.parameters)==null?void 0:t.docs)==null?void 0:e.source}}};const d=["Default"];export{r as Default,d as __namedExportsOrder,i as default};
