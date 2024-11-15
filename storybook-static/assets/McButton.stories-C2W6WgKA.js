import{f as X}from"./index-CERzeK2C.js";import{_ as P,B as Y,a as d}from"./McButton-Cw3_qabT.js";import{_ as $}from"./McSvgIcon-Cq4_nq1C.js";import{C as p}from"./Colors-CDVZRUyv.js";import{F as q}from"./FontWeights-CHR9KMRI.js";import{H as U}from"./Alignment-5IJBP4cy.js";import{W as G}from"./Weights-CEN83Yli.js";import"./index-DZLKizrv.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./Sizes-ByFfI8jG.js";const ct={title:"McButton",component:P,tags:["autodocs"],argTypes:{variation:{control:"select",options:Object.keys(p)},secondaryColor:{control:"select",options:Object.keys(p)},weight:{control:"select",options:Object.keys(q)},to:{control:"object"},href:{control:"object"},nuxt:{control:"boolean"},disabled:{control:"boolean"},inactive:{control:"boolean"},loading:{control:"boolean"},iconLoading:{control:"boolean"},shadow:{control:"boolean"},rounded:{control:"boolean"},semiRounded:{control:"boolean"},fullWidth:{control:"boolean"},isActive:{control:"boolean"},exact:{control:"boolean"},uppercase:{control:"boolean"},underlineLink:{control:"boolean"},bgFlat:{control:"boolean"},textAlign:{control:"select",options:U},type:{control:"select",options:Y},size:{control:"select",options:d},tooltip:{control:"text"},tabindex:{control:"number"}},args:{nuxt:!0,disabled:!1,inactive:!1,loading:!1,iconLoading:!1,shadow:!1,rounded:!1,semiRounded:!1,fullWidth:!1,isActive:!1,exact:!1,uppercase:!1,underlineLink:!1,bgFlat:!1,tooltip:"",onClick:X(()=>{alert("click")}),variation:"purple"},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},t={args:{default:"Button content"}},e={args:{default:"Button content",loading:!0}},o={args:{default:"Button content",tooltip:"Button tooltip content"}},n={args:{default:"Button content",size:d.MCompact}},a={args:{default:"Button content",semiRounded:!0}},r={args:{default:"Button content",size:d.MCompact,rounded:!0}},s={render(){return{components:{McSvgIcon:$,McButton:P},template:`
                <mc-button iconLoading> 
                    <template #icon-prepend>
                        <mc-svg-icon name="fly_dollar" />
                    </template>
                    Make money
                    <template #icon-append>
                        <mc-svg-icon name="dollar" />
                    </template>
                </mc-button>
            `}}},c={args:{default:"Button content",fullWidth:!0}},l={args:{default:"Button content","icon-prepend":"*prepend*","icon-append":"*append*",fullWidth:!0,textAlign:U.Right}},i={args:{default:"Button content",weight:G.Normal}};var u,m,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    default: 'Button content'
  }
}`,...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var f,b,B;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    loading: true
  }
}`,...(B=(b=e.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var h,S,W;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    tooltip: 'Button tooltip content'
  }
}`,...(W=(S=o.parameters)==null?void 0:S.docs)==null?void 0:W.source}}};var y,v,A;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    size: ButtonSize.MCompact
  }
}`,...(A=(v=n.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var R,C,M;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    semiRounded: true
  }
}`,...(M=(C=a.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var x,k,z;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    size: ButtonSize.MCompact,
    rounded: true
  }
}`,...(z=(k=r.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var _,L,w;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McSvgIcon,
        McButton
      },
      template: \`
                <mc-button iconLoading> 
                    <template #icon-prepend>
                        <mc-svg-icon name="fly_dollar" />
                    </template>
                    Make money
                    <template #icon-append>
                        <mc-svg-icon name="dollar" />
                    </template>
                </mc-button>
            \`
    };
  }
}`,...(w=(L=s.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var F,j,N;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    fullWidth: true
  }
}`,...(N=(j=c.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var D,O,T;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    'icon-prepend': '*prepend*',
    'icon-append': '*append*',
    fullWidth: true,
    textAlign: HorizontalAlignment.Right
  }
}`,...(T=(O=l.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var H,E,I;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    default: 'Button content',
    weight: Weights.Normal
  }
}`,...(I=(E=i.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};const lt=["Default","Loading","Tooltip","Compact","SemiRounded","Rounded","WithPrependAppendSlots","FullWidth","AlignmentRight","WeightNormal"];export{l as AlignmentRight,n as Compact,t as Default,c as FullWidth,e as Loading,r as Rounded,a as SemiRounded,o as Tooltip,i as WeightNormal,s as WithPrependAppendSlots,lt as __namedExportsOrder,ct as default};
