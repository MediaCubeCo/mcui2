import{p as y,I as w,r as v,e as S,o as D,D as $,w as z,q as c,v as u,y as o,B as f,x as d,A as E,E as H,P as h,G as q,Q as N,M as V,u as L}from"./vue.esm-bundler-DcuF_pQ3.js";import{a as I,_ as C}from"./McButton-Cw3_qabT.js";import{_ as x}from"./McSvgIcon-Cq4_nq1C.js";import{_ as F}from"./McTitle-BRys2FLH.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./Sizes-ByFfI8jG.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";const U={key:0,class:"mc-table-card__header"},p=y({__name:"McTableCard",props:{ml:{type:String,default:"251px"},footerBlur:{type:Boolean,default:!1}},setup(i){const n=w(),a=i,e=v(null),s=v(!0),B=S(()=>({"mc-table-card__footer":!!n.footer,"mc-table-card__footer--with-blur":a.footerBlur&&!s.value})),b=()=>{try{s.value=!1,e.value&&e.value.addEventListener("scroll",m)}catch(t){console.error(t)}},m=t=>{try{if(e.value){const{offsetHeight:r,scrollTop:M,scrollHeight:A}=e.value;s.value=r+M===A}}catch(r){s.value=!0,console.error(r)}};return D(()=>{a.footerBlur&&b()}),$(()=>{e.value&&e.value.removeEventListener("scroll",m)}),z(()=>a.footerBlur,t=>{t?b():e.value&&e.value.removeEventListener("scroll",m)}),(t,r)=>(c(),u("div",{class:"mc-table-card",style:H({marginLeft:i.ml})},[t.$slots.header?(c(),u("div",U,[o(t.$slots,"header")])):f("",!0),d("div",{ref_key:"bodyEl",ref:e,class:"mc-table-card__body"},[o(t.$slots,"default")],512),t.$slots.footer||i.footerBlur?(c(),u("div",{key:1,class:E(B.value)},[o(t.$slots,"footer")],2)):f("",!0)],4))}});p.__docgenInfo={exportName:"default",displayName:"McTableCard",description:"",tags:{},props:[{name:"ml",type:{name:"string"},defaultValue:{func:!1,value:"'251px'"}},{name:"footerBlur",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"header",description:"Слот заголовка"},{name:"default",description:"Слот контента"},{name:"footer",description:"Слот футера"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/templates/McTable/McTableCard/McTableCard.vue"]};const G={class:"mc-table-card-header"},O={class:"mc-table-card-header__left"},P={class:"mc-table-card-header__right"},T=y({__name:"McTableCardHeader",props:{buttonBackText:{type:String,default:"Back"},backTo:{type:String,default:null}},setup(i){const n=i;return(a,e)=>(c(),u("section",G,[d("div",O,[o(a.$slots,"default",{},()=>[h(C,{to:n.backTo,exact:"",variation:"purple-link",size:L(I).Xs},{"icon-prepend":q(()=>[h(x,{name:"arrow_backward"})]),default:q(()=>[N(" "+V(n.buttonBackText),1)]),_:1},8,["to","size"])])]),d("div",P,[o(a.$slots,"right")])]))}});T.__docgenInfo={exportName:"default",displayName:"McTableCardHeader",description:"",tags:{},props:[{name:"buttonBackText",type:{name:"string"},defaultValue:{func:!1,value:"'Back'"}},{name:"backTo",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],slots:[{name:"default",description:"Слот контента"},{name:"right",description:"right"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/templates/McTable/McTableCard/McTableCardHeader/McTableCardHeader.vue"]};const ie={title:"McTableCard",component:p,tags:["autodocs"],argTypes:{},args:{},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},l={render(){return{components:{McTableCard:p,McTableCardHeader:T,McButton:C,McSvgIcon:x,McTitle:F},data(){return{}},computed:{},methods:{showChat(){console.log("showChat")}},template:`
        <div style="height: 500px">
          <mc-table-card :ml="ml" footer-blur>
            <template #header>
              <mc-table-card-header button-back-text="Back to list">
                <template #right>
                  <mc-button variation="purple-link" size="xs">
                    Add channel
                    <template #icon-append>
                      <mc-svg-icon name="add" />
                    </template>
                  </mc-button>
                  <mc-button variation="purple-link" size="xs">
                    Amount
                    <template #icon-append>
                      <mc-svg-icon name="edit_solid" />
                    </template>
                  </mc-button>
                  <mc-button variation="purple-link" size="xs" @click.prevent="showChat">
                    Chat
                    <template #icon-append>
                      <mc-svg-icon name="chat" />
                    </template>
                  </mc-button>
                </template>
              </mc-table-card-header>
            </template>
            <mc-title v-for="num in 3" class="mb-200" :key="num">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur magnam possimus rerum!
              Cupiditate delectus dolor earum eos eum id inventore, itaque, labore molestiae nobis nulla odio perspiciatis
              quidem quisquam repudiandae sint temporibus veritatis. Distinctio illo iusto voluptas! Adipisci animi aut cum
              eius error esse ex hic impedit itaque labore laboriosam natus neque nisi odio porro qui quisquam repellat
              repellendus, saepe suscipit! At delectus deserunt dicta distinctio modi pariatur perspiciatis quos sed velit
              voluptates? Ab aliquam assumenda corporis dicta incidunt nihil obcaecati quibusdam quidem? Ad amet at consequuntur
              cupiditate dolorem, doloribus eaque eius, enim est eum eveniet ex facilis incidunt ipsum minima modi molestias
              mollitia, provident quae quam repellat reprehenderit sequi similique suscipit tenetur ullam vero voluptates!
              Dolore est excepturi laboriosam magnam, odit pariatur. Aliquid animi architecto autem consectetur corporis
              debitis distinctio dolor eius eum exercitationem explicabo id incidunt inventore libero maiores, modi mollitia
              nemo, nostrum numquam quis quod tempora ut veritatis?
            </mc-title>
            <template #footer>
              <mc-button>Apply</mc-button>
              <mc-button variation="red-invert">Block</mc-button>
              <mc-button disabled>Disabled button</mc-button>
            </template>
          </mc-table-card>
        </div>
      `}}};var g,_,k;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McTableCard,
        McTableCardHeader,
        McButton,
        McSvgIcon,
        McTitle
      },
      data() {
        return {};
      },
      computed: {},
      methods: {
        showChat() {
          console.log('showChat');
        }
      },
      template: \`
        <div style="height: 500px">
          <mc-table-card :ml="ml" footer-blur>
            <template #header>
              <mc-table-card-header button-back-text="Back to list">
                <template #right>
                  <mc-button variation="purple-link" size="xs">
                    Add channel
                    <template #icon-append>
                      <mc-svg-icon name="add" />
                    </template>
                  </mc-button>
                  <mc-button variation="purple-link" size="xs">
                    Amount
                    <template #icon-append>
                      <mc-svg-icon name="edit_solid" />
                    </template>
                  </mc-button>
                  <mc-button variation="purple-link" size="xs" @click.prevent="showChat">
                    Chat
                    <template #icon-append>
                      <mc-svg-icon name="chat" />
                    </template>
                  </mc-button>
                </template>
              </mc-table-card-header>
            </template>
            <mc-title v-for="num in 3" class="mb-200" :key="num">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur magnam possimus rerum!
              Cupiditate delectus dolor earum eos eum id inventore, itaque, labore molestiae nobis nulla odio perspiciatis
              quidem quisquam repudiandae sint temporibus veritatis. Distinctio illo iusto voluptas! Adipisci animi aut cum
              eius error esse ex hic impedit itaque labore laboriosam natus neque nisi odio porro qui quisquam repellat
              repellendus, saepe suscipit! At delectus deserunt dicta distinctio modi pariatur perspiciatis quos sed velit
              voluptates? Ab aliquam assumenda corporis dicta incidunt nihil obcaecati quibusdam quidem? Ad amet at consequuntur
              cupiditate dolorem, doloribus eaque eius, enim est eum eveniet ex facilis incidunt ipsum minima modi molestias
              mollitia, provident quae quam repellat reprehenderit sequi similique suscipit tenetur ullam vero voluptates!
              Dolore est excepturi laboriosam magnam, odit pariatur. Aliquid animi architecto autem consectetur corporis
              debitis distinctio dolor eius eum exercitationem explicabo id incidunt inventore libero maiores, modi mollitia
              nemo, nostrum numquam quis quod tempora ut veritatis?
            </mc-title>
            <template #footer>
              <mc-button>Apply</mc-button>
              <mc-button variation="red-invert">Block</mc-button>
              <mc-button disabled>Disabled button</mc-button>
            </template>
          </mc-table-card>
        </div>
      \`
    };
  }
}`,...(k=(_=l.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};const oe=["Default"];export{l as Default,oe as __namedExportsOrder,ie as default};
