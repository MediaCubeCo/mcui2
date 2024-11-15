import{p as g,r as f,Y as i,q as b,v as A,y}from"./vue.esm-bundler-DcuF_pQ3.js";import{u as E}from"./index-DRQZTcpU.js";import{_ as v}from"./McCollapse-Bt_j0AUk.js";import{_ as w}from"./McButton-Cw3_qabT.js";import"./McSvgIcon-Cq4_nq1C.js";import"./Sizes-ByFfI8jG.js";import"./Colors-CDVZRUyv.js";import"./McSlideUpDown-CguhuDbm.js";import"./useTooltip-C3VtZaBe.js";import"./FontWeights-CHR9KMRI.js";const I={class:"mc-accordion"},r=g({__name:"McAccordion",props:{isSingleOpen:{type:Boolean,default:!0},defaultOpenIndex:{type:Number}},setup(m){const p=E(t=>{t()},50),s=m,n=f([]),d=({value:t,component:e})=>{t&&n.value.forEach(a=>{a.id!==e.id&&a.close()})},u=(t,{value:e,component:a})=>{s.isSingleOpen&&d({value:e,component:a})};return i("selfRegisterCollapseMethod",t=>{n.value.push(t);const e=s.defaultOpenIndex;p(()=>{(e||e===0)&&n.value[e]&&n.value[e].open()})}),i("accordionTriggerMethod",u),(t,e)=>(b(),A("div",I,[y(t.$slots,"default")]))}});r.__docgenInfo={exportName:"default",displayName:"McAccordion",description:"",tags:{},props:[{name:"isSingleOpen",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"defaultOpenIndex",type:{name:"number"}}],slots:[{name:"default",description:"Слот для дочерних mc-collapse"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/patterns/McAccordion/McAccordion.vue"]};const N={title:"McAccordion",component:r,tags:["autodocs"],argTypes:{defaultOpenIndex:{control:"number"},isSingleOpen:{control:"boolean"}},args:{isSingleOpen:!0,defaultOpenIndex:0},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},o={render(){return{components:{McAccordion:r,McCollapse:v,McButton:w},data(){return{content:""}},template:`
                <mc-accordion :default-open-index="0">
                    <h1>License agreement</h1>
                    <mc-collapse class="mb-100">
                        <template #activator>
                            <mc-button variation="dark-green">1  INTERPRETATION</mc-button>
                        </template>
                        <template #body>
                            <p>
                                In this Agreement, unless the context otherwise requires, the following words and expressions shall have the following meanings:
                                1.1. MC Pay is a mobile app and/or service located at:
                                <a href="https://mcpay.io/" target="_blank">https://mcpay.io/</a>
                            </p>
                        </template>
                    </mc-collapse>
                    <mc-collapse class="mb-100">
                        <template #activator>
                            <mc-button variation="pinkish">2. LICENSE</mc-button>
                        </template>
                        <template #body>
                            <p>
                                2.1. The User grants MEDIACUBE the rights to use the Content under the terms of an exclusive license for the entire duration of this Agreement in the territory of countries around the world.
                                2.2. The rights under the Agreement are granted for use exclusively on the YouTube platform (Platform).
                                2.3. MEDIACUBE has the right to grant the rights to the Content by sublicense Google Inc. and its affiliates.
                                2.4. MEDIACUBE pays the User a license fee in accordance with the Agreement.
                                2.5. MEDIACUBE, in accordance with the rules of the Platform, has the right to use the
                            </p>
                        </template>
                    </mc-collapse>
                    <p>Some static text</p>
                    <mc-collapse>
                        <template #activator>
                            <mc-button>3. GUARANTEES</mc-button>
                        </template>
                        <template #body>
                           <p>
                               3.1. The User guarantees that he really has copyright and related rights to the Content, and that the rights transferred in accordance with clause 2 of this Agreement are free from claims of third parties.
                               3.2. MEDIACUBE guarantees that the rights transferred to it in accordance with clause 2 will be used only within the framework of this Agreement.
                               3.3. MEDIACUBE guarantees that when using the Content, its distortions or other actions capable of harming the User will not be allowed.
                               3.4. The Parties acknowledge that they enter into this Agreement relying on the unconditional validity and truthfulness of the guarantees given in this clause.
                           </p>
                        </template>
                    </mc-collapse>
                    <mc-collapse is-disabled>
                        <template #activator>
                            <mc-button disabled>4. RIGHTS AND OBLIGATIONS</mc-button>
                        </template>
                        <template #body>
                           <p>
                               4.1. MEDIACUBE
                               4.1.1. the right to make changes to the terms of the Agreement unilaterally and post a new version of the Agreement in the Personal Account. The User undertakes to monitor such changes independently.
                               4.1.2. it is not entitled to make changes to clauses 5.5, 5.6 and 8.1 of the Agreement without the consent of the User.
                               4.1.3. has the right to terminate the Agreement unilaterally by notifying the User. The date of termination will be the date of receipt of the notification.
                               4.1.4. is obliged to provide technical and informational support of the User.
                           </p>
                        </template>
                    </mc-collapse>
                </mc-accordion>
            `}}};var l,c,h;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McAccordion,
        McCollapse,
        McButton
      },
      data() {
        return {
          content: ''
        };
      },
      template: \`
                <mc-accordion :default-open-index="0">
                    <h1>License agreement</h1>
                    <mc-collapse class="mb-100">
                        <template #activator>
                            <mc-button variation="dark-green">1  INTERPRETATION</mc-button>
                        </template>
                        <template #body>
                            <p>
                                In this Agreement, unless the context otherwise requires, the following words and expressions shall have the following meanings:
                                1.1. MC Pay is a mobile app and/or service located at:
                                <a href="https://mcpay.io/" target="_blank">https://mcpay.io/</a>
                            </p>
                        </template>
                    </mc-collapse>
                    <mc-collapse class="mb-100">
                        <template #activator>
                            <mc-button variation="pinkish">2. LICENSE</mc-button>
                        </template>
                        <template #body>
                            <p>
                                2.1. The User grants MEDIACUBE the rights to use the Content under the terms of an exclusive license for the entire duration of this Agreement in the territory of countries around the world.
                                2.2. The rights under the Agreement are granted for use exclusively on the YouTube platform (Platform).
                                2.3. MEDIACUBE has the right to grant the rights to the Content by sublicense Google Inc. and its affiliates.
                                2.4. MEDIACUBE pays the User a license fee in accordance with the Agreement.
                                2.5. MEDIACUBE, in accordance with the rules of the Platform, has the right to use the
                            </p>
                        </template>
                    </mc-collapse>
                    <p>Some static text</p>
                    <mc-collapse>
                        <template #activator>
                            <mc-button>3. GUARANTEES</mc-button>
                        </template>
                        <template #body>
                           <p>
                               3.1. The User guarantees that he really has copyright and related rights to the Content, and that the rights transferred in accordance with clause 2 of this Agreement are free from claims of third parties.
                               3.2. MEDIACUBE guarantees that the rights transferred to it in accordance with clause 2 will be used only within the framework of this Agreement.
                               3.3. MEDIACUBE guarantees that when using the Content, its distortions or other actions capable of harming the User will not be allowed.
                               3.4. The Parties acknowledge that they enter into this Agreement relying on the unconditional validity and truthfulness of the guarantees given in this clause.
                           </p>
                        </template>
                    </mc-collapse>
                    <mc-collapse is-disabled>
                        <template #activator>
                            <mc-button disabled>4. RIGHTS AND OBLIGATIONS</mc-button>
                        </template>
                        <template #body>
                           <p>
                               4.1. MEDIACUBE
                               4.1.1. the right to make changes to the terms of the Agreement unilaterally and post a new version of the Agreement in the Personal Account. The User undertakes to monitor such changes independently.
                               4.1.2. it is not entitled to make changes to clauses 5.5, 5.6 and 8.1 of the Agreement without the consent of the User.
                               4.1.3. has the right to terminate the Agreement unilaterally by notifying the User. The date of termination will be the date of receipt of the notification.
                               4.1.4. is obliged to provide technical and informational support of the User.
                           </p>
                        </template>
                    </mc-collapse>
                </mc-accordion>
            \`
    };
  }
}`,...(h=(c=o.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};const P=["Default"];export{o as Default,P as __namedExportsOrder,N as default};
