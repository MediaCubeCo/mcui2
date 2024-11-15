import{_ as s,C as D}from"./McChip-DqO1iODX.js";import{_ as W}from"./McSvgIcon-Cq4_nq1C.js";import{_ as w}from"./McButton-Cw3_qabT.js";import{C as O}from"./Colors-CDVZRUyv.js";import{f as T}from"./index-CERzeK2C.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./Sizes-ByFfI8jG.js";import"./FontWeights-CHR9KMRI.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./index-DZLKizrv.js";const F={title:"McChip",component:s,tags:["autodocs"],argTypes:{variation:{control:"select",options:Object.keys(O)},title:{control:"text"},closable:{control:"boolean"},counter:{control:"number"},size:{control:"select",options:Object.values(D)}},args:{variation:"purple",title:"McChip",closable:!1,onClose:T(()=>{alert("close click")})},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},e={args:{default:"McChip"}},t={args:{default:"McChip",counter:22}},o={args:{default:"McChip",closable:!0}},r={render(){return{components:{McSvgIcon:W,McChip:s},template:`
                <mc-chip variation="purple"> 
                    <template #icon>
                        <mc-svg-icon name="fly_dollar" />
                    </template>
                    McChip
                </mc-chip>
            `}}},a={render(){return{components:{McSvgIcon:W,McChip:s,McButton:w},template:`
                <mc-chip variation="purple" :counter="21" closable>
                    McChip
                    <template #button>
                        <mc-button size="xs" variation="black-compact">
                            <template #icon-append>
                                <mc-svg-icon name="edit" />
                            </template>
                        </mc-button>
                    </template>
                </mc-chip>
            `}}},n={args:{default:"McChip",textColor:"red"}},c={args:{default:"McChip",size:D.Xs,counter:22}};var p,i,m;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    default: 'McChip'
  }
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var l,u,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    default: 'McChip',
    counter: 22
  }
}`,...(d=(u=t.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var C,h,g;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    default: 'McChip',
    closable: true
  }
}`,...(g=(h=o.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var f,M,b;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McSvgIcon,
        McChip
      },
      template: \`
                <mc-chip variation="purple"> 
                    <template #icon>
                        <mc-svg-icon name="fly_dollar" />
                    </template>
                    McChip
                </mc-chip>
            \`
    };
  }
}`,...(b=(M=r.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var v,S,_;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McSvgIcon,
        McChip,
        McButton
      },
      template: \`
                <mc-chip variation="purple" :counter="21" closable>
                    McChip
                    <template #button>
                        <mc-button size="xs" variation="black-compact">
                            <template #icon-append>
                                <mc-svg-icon name="edit" />
                            </template>
                        </mc-button>
                    </template>
                </mc-chip>
            \`
    };
  }
}`,...(_=(S=a.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};var x,z,y;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    default: 'McChip',
    textColor: 'red'
  }
}`,...(y=(z=n.parameters)==null?void 0:z.docs)==null?void 0:y.source}}};var I,k,B;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    default: 'McChip',
    size: ChipSize.Xs,
    counter: 22
  }
}`,...(B=(k=c.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};const G=["Default","WithCounter","Closable","WithIcon","CustomCloseButton","TextColor","Size"];export{o as Closable,a as CustomCloseButton,e as Default,c as Size,n as TextColor,t as WithCounter,r as WithIcon,G as __namedExportsOrder,F as default};
