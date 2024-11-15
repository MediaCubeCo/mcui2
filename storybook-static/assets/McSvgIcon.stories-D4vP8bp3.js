import{_ as p,D as o}from"./McSvgIcon-Cq4_nq1C.js";import{_ as h}from"./McTitle-BRys2FLH.js";import{_ as f}from"./McFieldText-CElXFiE9.js";import{_ as g}from"./McSeparator-DNYl-E5K.js";import{C as y}from"./Colors-CDVZRUyv.js";import{S as v}from"./Sizes-ByFfI8jG.js";import{i as b}from"./icons-CCDgBq90.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./FontWeights-CHR9KMRI.js";import"./McButton-Cw3_qabT.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./McTooltip-CnE_6JSP.js";import"./Spaces-DiQ1o4ZA.js";import"./useFieldErrors-_2MdWRxY.js";import"./index-BmsK2qgO.js";import"./Alignment-5IJBP4cy.js";import"./Weights-CEN83Yli.js";const s=Object.keys(b),R={title:"McSvgIcon",component:p,tags:["autodocs"],argTypes:{name:{control:"select",options:s},color:{control:"select",options:Object.keys(y)},size:{control:"select",options:Object.keys(v)},weight:{control:"number"},dir:{control:"select",options:o},spritePath:{control:"none"}},args:{color:"purple",size:"400",weight:1.5,dir:o.Ltr},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:"https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2"}}},c={args:{name:"bank_card"}},i={render(){return{components:{McSvgIcon:p,McTitle:h,McFieldText:f,McSeparator:g},data:()=>({search:null}),computed:{iconsSections(){const t={colored:[],blue:[],arrows:[],flags:[],checks:[],mediacube:[],other:[]};s.forEach(e=>{switch(!0){case e.includes("_colored"):return t.colored.push(e);case e.includes("_blue"):return t.blue.push(e);case e.includes("arrow"):return t.arrows.push(e);case e.includes("flag"):return t.flags.push(e);case e.includes("check"):return t.checks.push(e);case e.includes("mc"):case e.includes("mediacube"):return t.mediacube.push(e);default:return t.other.push(e)}});const u=Object.keys(t).map(e=>({title:e.replace(/^./,e[0].toUpperCase()),icons:t[e],id:e}));return this.search?[{title:"Search results",icons:s.filter(e=>e.includes(this.search))}]:u}},template:`
                <section>
                    <mc-field-text v-model="search" name="search" title="Search" placeholder="Start typing to search..." />
                    <div v-for="section in iconsSections" :key="section.id" :id="section.id">
                        <mc-separator indent-bottom="400" indent-top="400" />
                        <mc-title variation="h3">
                            {{ section.title }}
                        </mc-title>
                        <mc-separator indent-bottom="400" indent-top="400" />
                        <template v-if="section.icons.length">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, 160px); gap: 16px">
                                <div
                                    v-for="icon in section.icons"
                                    :key="icon"
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                                >
                                    <mc-svg-icon :name="icon" size="400" />
                                    <mc-title text-align="center" class="mt-150">{{ icon }}</mc-title>
                                </div>
                            </div>
                        </template>
                        <div v-else style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column">
                            <mc-svg-icon name="info" color="gray" size="800" />
                            <mc-title text-align="center" color="gray" variation="h3">No results</mc-title>
                        </div>
                    </div>
                </section>
            `}}};var r,n,a;c.parameters={...c.parameters,docs:{...(r=c.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    name: 'bank_card'
  }
}`,...(a=(n=c.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};var l,m,d;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McSvgIcon,
        McTitle,
        McFieldText,
        McSeparator
      },
      data: () => ({
        search: null
      }),
      computed: {
        iconsSections() {
          const iconsObject = {
            colored: [],
            blue: [],
            arrows: [],
            flags: [],
            checks: [],
            mediacube: [],
            other: []
          };
          iconsArrayList.forEach(icon => {
            switch (true) {
              case icon.includes('_colored'):
                return iconsObject.colored.push(icon);
              case icon.includes('_blue'):
                return iconsObject.blue.push(icon);
              case icon.includes('arrow'):
                return iconsObject.arrows.push(icon);
              case icon.includes('flag'):
                return iconsObject.flags.push(icon);
              case icon.includes('check'):
                return iconsObject.checks.push(icon);
              case icon.includes('mc'):
              case icon.includes('mediacube'):
                return iconsObject.mediacube.push(icon);
              default:
                return iconsObject.other.push(icon);
            }
          });
          const defaultSections = Object.keys(iconsObject).map(key => ({
            title: key.replace(/^./, key[0].toUpperCase()),
            icons: iconsObject[key],
            id: key
          }));
          return this.search ? [{
            title: 'Search results',
            icons: iconsArrayList.filter(icon => icon.includes(this.search))
          }] : defaultSections;
        }
      },
      template: \`
                <section>
                    <mc-field-text v-model="search" name="search" title="Search" placeholder="Start typing to search..." />
                    <div v-for="section in iconsSections" :key="section.id" :id="section.id">
                        <mc-separator indent-bottom="400" indent-top="400" />
                        <mc-title variation="h3">
                            {{ section.title }}
                        </mc-title>
                        <mc-separator indent-bottom="400" indent-top="400" />
                        <template v-if="section.icons.length">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, 160px); gap: 16px">
                                <div
                                    v-for="icon in section.icons"
                                    :key="icon"
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                                >
                                    <mc-svg-icon :name="icon" size="400" />
                                    <mc-title text-align="center" class="mt-150">{{ icon }}</mc-title>
                                </div>
                            </div>
                        </template>
                        <div v-else style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column">
                            <mc-svg-icon name="info" color="gray" size="800" />
                            <mc-title text-align="center" color="gray" variation="h3">No results</mc-title>
                        </div>
                    </div>
                </section>
            \`
    };
  }
}`,...(d=(m=i.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const X=["Default","FullList"];export{c as Default,i as FullList,X as __namedExportsOrder,R as default};
