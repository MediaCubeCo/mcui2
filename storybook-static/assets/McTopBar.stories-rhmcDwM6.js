import{p as V,r as m,q as i,v as y,x as b,y as o,B as u,F as h,G as t,P as a,Q as k,M as w,u as c}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as $}from"./McAvatar-BA28_YXM.js";import{_ as l,a as S}from"./McButton-Cw3_qabT.js";import{_ as p}from"./McSvgIcon-Cq4_nq1C.js";import{_ as D}from"./McSeparator-DNYl-E5K.js";import{_ as T,a as z}from"./McDropdown-CzJ7rEm7.js";import{H as U}from"./Alignment-5IJBP4cy.js";import{_ as N}from"./McTitle-BRys2FLH.js";import"./Sizes-ByFfI8jG.js";import"./Colors-CDVZRUyv.js";import"./FontWeights-CHR9KMRI.js";import"./useTooltip-C3VtZaBe.js";import"./index-DRQZTcpU.js";import"./Spaces-DiQ1o4ZA.js";import"./vue-router-XxfYOQaO.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";const C={class:"mc-top-bar"},j={class:"mc-top-bar__inner"},E={key:0,class:"mc-top-bar__left"},O={class:"mc-top-bar__right"},_=V({__name:"McTopBar",props:{user:{type:Object,default:()=>({})},menuLangs:{type:Array,default:()=>[]},defaultLang:{type:String,default:"Выберите язык"},currentLang:{type:String,default:null}},setup(n){const f=n,x=m(null),g=m(!1),v=m(!1);return(r,s)=>(i(),y("div",C,[b("div",j,[r.$slots.left?(i(),y("div",E,[o(r.$slots,"left")])):u("",!0),b("div",O,[o(r.$slots,"right"),n.menuLangs&&n.menuLangs.length?(i(),h(T,{key:0,ref_key:"menuLangsDD",ref:x,items:n.menuLangs,modelValue:g.value,"onUpdate:modelValue":s[0]||(s[0]=e=>g.value=e),"list-min-width":"auto",class:"mc-top-bar__menu-langs"},{activator:t(()=>[a(l,{variation:"black-link",uppercase:""},{"icon-append":t(()=>[a(p,{class:"rotate",name:"arrow_drop_down"})]),default:t(()=>[k(w(n.currentLang||n.defaultLang)+" ",1)]),_:1})]),item:t(({item:e})=>[a(l,{to:e.to||e.href,exact:e.exact,variation:"black-flat","text-align":c(U).Left,"full-width":""},{"icon-prepend":t(()=>[a(p,{name:`flag_${e.name.toLowerCase()}`},null,8,["name"])]),default:t(()=>[k(" "+w(e.name),1)]),_:2},1032,["to","exact","text-align"])]),_:1},8,["items","modelValue"])):u("",!0),o(r.$slots,"user",{},()=>[f.user?(i(),h(T,{key:0,modelValue:v.value,"onUpdate:modelValue":s[1]||(s[1]=e=>v.value=e),position:c(z).Right},{activator:t(()=>[a(l,{variation:"white-flat",size:c(S).MCompact},{"icon-prepend":t(()=>[a($,{src:f.user.avatar,rounded:"",size:"400"},null,8,["src"])]),_:1},8,["size"])]),default:t(()=>[o(r.$slots,"user-dropdown-panel")]),_:3},8,["modelValue","position"])):u("",!0)])])]),a(D,{color:"hover-gray","indent-top":"100"}),o(r.$slots,"bottom")]))}});_.__docgenInfo={exportName:"default",displayName:"McTopBar",description:"",tags:{},props:[{name:"user",description:"Данные пользователя",type:{name:"Record<string, any>"},defaultValue:{func:!0,value:"() => ({})"}},{name:"menuLangs",description:"Меню языков",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"defaultLang",description:"Локализация или текст по умолчанию",type:{name:"string"},defaultValue:{func:!1,value:"'Выберите язык'"}},{name:"currentLang",description:"Текущая локализация",type:{name:"string"},defaultValue:{func:!1,value:"null"}}],slots:[{name:"left"},{name:"right"},{name:"user"},{name:"user-dropdown-panel"},{name:"bottom"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/templates/McTopBar/McTopBar.vue"]};const R={id:4,uid:"a87ff679a2f3e71d9181a67b7542122c",first_name:"Татьяна",last_name:"Владимирова",name:"MediaCube Network",email:"info@mediacube.network",is_confirmed:!0,avatar:null,profile:{id:6,user_id:4,country_id:7,country:{id:7,youtube_id:"BY",code:"BY",name:"Belarus",created_at:"2017-09-27 14:51:59",updated_at:"2019-05-22 18:58:21",order:null},birthday:"2018-01-01T00:00:00+03:00",sex:!0,region:"Минская Область",city:"Минск",postcode:null,address:"ул."},contacts:[{id:13,user_id:4,network:"vkontakte",link:"Тест"},{id:14,user_id:4,network:"okru",link:"Тест"},{id:27,user_id:4,network:"email",link:"qwerty"},{id:28,user_id:4,network:"messenger",link:"344"},{id:29,user_id:4,network:"instagram",link:"sdwfwef"},{id:30,user_id:4,network:"telegram",link:"Qwerty"},{id:10,user_id:4,network:"telegram",link:"Тест"},{id:69,user_id:4,network:"email",link:"margarete44@yahoo.com"}],payment_methods:[{id:426,user_id:4,provider:"paypal",identity:{email:"1@1.q"},created_at:"2019-01-14T19:17:19+03:00",updated_at:"2019-01-14T19:17:19+03:00"},{id:427,user_id:4,provider:"card_by",identity:{last_name:"Петрушкин",first_name:"Петр",middle_name:"Петрович",address:"ул. Пушкина",zip:"220021",passport_number:"мр2789909",passport_issue_date:"1972-07-15",passport_personal_number:"2345245",card_bank_name:"4542",card_bank_address:"4542",swift:"4545",iban:"234",bank_account:"5545"},created_at:"2019-01-15T20:28:45+03:00",updated_at:"2019-01-15T20:28:45+03:00"},{id:429,user_id:4,provider:"payoneer",identity:{id:"2266099"},created_at:"2019-01-16T14:09:09+03:00",updated_at:"2019-01-16T14:09:09+03:00"},{id:431,user_id:4,provider:"payoneer",identity:{id:"2266099"},created_at:"2019-01-16T14:13:24+03:00",updated_at:"2019-01-16T14:13:24+03:00"}],roles:[{id:1,name:"admin",title:"Администратор",level:1,users_count:null}],organization_count:0,groups_count:1,recruiters_count:2,last_action_at:"2019-05-22T21:22:04+03:00",is_banned:!1,balance:{user_id:4,balance:"7987.00",real_balance:"0.00",credit_balance:"7987.00"},agree_at:"2017-10-17T15:53:15+03:00",auto_transaction_active:!1,auto_transaction_min_sum:null,auto_transaction_payment_method_id:null,express_payment_active:!1,created_at:"2017-10-17T15:53:15+03:00",updated_at:"2019-05-22T21:22:04+03:00"},q=[{name:"Ru",href:"javascript:void(0);"},{name:"En",href:"javascript:void(0);"},{name:"Es",href:"javascript:void(0);"},{name:"Pt",href:"javascript:void(0);"}],oe={title:"McTopBar",component:_,tags:["autodocs"],argTypes:{},args:{},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},d={render(){return{components:{McTopBar:_,McButton:l,McTitle:N,McSvgIcon:p},data(){return{}},computed:{authUser(){return R},menuLangs(){return q}},methods:{},template:`
        <div style="height: 500px">
          <mc-top-bar :user="authUser" :menu-langs="menuLangs">
            <template #left>
              <mc-title variation="subtitle" max-width="auto">Left Section Title</mc-title>
              <mc-button size="xs-compact" rounded variation="black-flat">
                <template #icon-prepend>
                  <mc-svg-icon name="add" />
                </template>
              </mc-button>
            </template>

            <template #right>
              <mc-svg-icon name="search" />
            </template>
          </mc-top-bar>
        </div>
      `}}};var L,B,M;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McTopBar,
        McButton,
        McTitle,
        McSvgIcon
      },
      data() {
        return {};
      },
      computed: {
        authUser() {
          return authUser;
        },
        menuLangs() {
          return menuLangs;
        }
      },
      methods: {},
      template: \`
        <div style="height: 500px">
          <mc-top-bar :user="authUser" :menu-langs="menuLangs">
            <template #left>
              <mc-title variation="subtitle" max-width="auto">Left Section Title</mc-title>
              <mc-button size="xs-compact" rounded variation="black-flat">
                <template #icon-prepend>
                  <mc-svg-icon name="add" />
                </template>
              </mc-button>
            </template>

            <template #right>
              <mc-svg-icon name="search" />
            </template>
          </mc-top-bar>
        </div>
      \`
    };
  }
}`,...(M=(B=d.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};const se=["Default"];export{d as Default,se as __namedExportsOrder,oe as default};
