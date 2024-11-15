import{_ as o}from"./McGridRow-TGd0ufJ2.js";import{_ as i}from"./McGridCol-B4N2s4LP.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";const f={title:"McGridRow",component:o,tags:["autodocs"],argTypes:{},args:{gutterX:20},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},c={render(){return{components:{McGridRow:o,McGridCol:i},template:`
                <mc-grid-row>
                    <mc-grid-col span="12" span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6"><div style="background: #f1c40f">6</div></mc-grid-col>
                </mc-grid-row>
            `}}},r={render(){return{components:{McGridRow:o,McGridCol:i},template:`
                <mc-grid-row :gutter-x="30" :gutter-y="10">
                    <mc-grid-col span="12" span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6">
                        <mc-grid-row :gutter-x="5">
                            <mc-grid-col span="3"><div style="background: violet; color: white;">3</div></mc-grid-col>
                            <mc-grid-col span="3"><div style="background: blue; color: white;">3</div></mc-grid-col>
                            <mc-grid-col span="6"><div style="background: blueviolet; color: white;">6</div></mc-grid-col>
                        </mc-grid-row>
                    </mc-grid-col>
                </mc-grid-row>
            `}}},d={render(){return{components:{McGridRow:o,McGridCol:i},template:`
                <mc-grid-row :gutter-x="30" :gutter-y="10" justify="center" align="middle">
                    <mc-grid-col><div style="background: #e74c3c">Auto Size</div></mc-grid-col>
                    <mc-grid-col><div style="background: #f1c40f">Auto Size middle</div></mc-grid-col>
                    <mc-grid-col><div style="background: cornflowerblue">Auto Size large content</div></mc-grid-col>
                </mc-grid-row>
            `}}};var e,n,t;c.parameters={...c.parameters,docs:{...(e=c.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McGridRow,
        McGridCol
      },
      template: \`
                <mc-grid-row>
                    <mc-grid-col span="12" span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6"><div style="background: #f1c40f">6</div></mc-grid-col>
                </mc-grid-row>
            \`
    };
  }
}`,...(t=(n=c.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var m,l,a;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McGridRow,
        McGridCol
      },
      template: \`
                <mc-grid-row :gutter-x="30" :gutter-y="10">
                    <mc-grid-col span="12" span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6">
                        <mc-grid-row :gutter-x="5">
                            <mc-grid-col span="3"><div style="background: violet; color: white;">3</div></mc-grid-col>
                            <mc-grid-col span="3"><div style="background: blue; color: white;">3</div></mc-grid-col>
                            <mc-grid-col span="6"><div style="background: blueviolet; color: white;">6</div></mc-grid-col>
                        </mc-grid-row>
                    </mc-grid-col>
                </mc-grid-row>
            \`
    };
  }
}`,...(a=(l=r.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};var g,s,p;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McGridRow,
        McGridCol
      },
      template: \`
                <mc-grid-row :gutter-x="30" :gutter-y="10" justify="center" align="middle">
                    <mc-grid-col><div style="background: #e74c3c">Auto Size</div></mc-grid-col>
                    <mc-grid-col><div style="background: #f1c40f">Auto Size middle</div></mc-grid-col>
                    <mc-grid-col><div style="background: cornflowerblue">Auto Size large content</div></mc-grid-col>
                </mc-grid-row>
            \`
    };
  }
}`,...(p=(s=d.parameters)==null?void 0:s.docs)==null?void 0:p.source}}};const G=["Default","NestedGrid","AutoSize"];export{d as AutoSize,c as Default,r as NestedGrid,G as __namedExportsOrder,f as default};
