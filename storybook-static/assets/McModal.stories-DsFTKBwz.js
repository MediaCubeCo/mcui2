import{p as ee,r as g,m as ae,e as $,w as oe,q as i,v as c,N as y,B as u,x as d,y as M,P as A,A as le,E as te,n as ne}from"./vue.esm-bundler-DcuF_pQ3.js";import{_ as D}from"./McSvgIcon-Cq4_nq1C.js";import{L as P,_ as se}from"./McTitle-BRys2FLH.js";import{S as I}from"./Sizes-ByFfI8jG.js";import{S as N}from"./Spaces-DiQ1o4ZA.js";import{c as re,T as de}from"./index-BmsK2qgO.js";import{_ as me}from"./McButton-Cw3_qabT.js";import{H as E}from"./Alignment-5IJBP4cy.js";import"./Colors-CDVZRUyv.js";import"./upperFirst-C9GT4Rcp.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./toString-D6rXdIBz.js";import"./FontWeights-CHR9KMRI.js";import"./index-DRQZTcpU.js";import"./useTooltip-C3VtZaBe.js";var k=(n=>(n.Default="default",n.Info="info",n))(k||{});const ie={key:0,class:"mc-modal__wrapper"},ce={key:0,class:"mc-modal__header"},ue={class:"mc-modal__title"},pe={class:"mc-modal__control"},fe=d("div",{id:"mcModalFooter"},null,-1),V=ee({__name:"McModal",props:{modelValue:{type:Boolean,default:!1},name:{type:String},maxWidth:{type:Number,default:510},duration:{type:Number,default:200},closeVisible:{type:Boolean,default:!0},showOverlay:{type:Boolean,default:!0},clickBackdropToClose:{type:Boolean,default:!0},arrowVisible:{type:Boolean,default:!1},secondaryModal:{type:Boolean,default:!1},scrollableContent:{type:Boolean,default:!0},separators:{type:Boolean,default:!0},headerAlign:{type:String,default:"center"},topPadding:{type:Boolean,default:!1},variation:{type:String,default:"default"}},emits:["before-open","before-close","opened","closed","back","update:modelValue"],setup(n,{emit:U}){const s=U,o=n,h=g(0),F=re(h,{duration:o.duration||300,transition:de.easeOutQuart}),l=g(null),b=g(null),e=ae({scrolled_top:!1,scrolled_bottom:!1,resize_observer:{},small_indents:!1,can_shorten_modal:!1,modal_params:{},indent:{regular:"400",small:"150"},footer:{button:{regular:"600",small:"500"}},header:{title:{line_height:{regular:"300",small:"250"}}}}),R=$(()=>({"mc-modal--arrow-visible":o.arrowVisible,"mc-modal--scrolled-top":e.scrolled_top,"mc-modal--scrolled-bottom":e.scrolled_bottom,"mc-modal--scrollable":o.scrollableContent,"mc-modal--top-padding":o.topPadding,"mc-modal--small-indents":e.small_indents,[`mc-modal--variation-${o.variation}`]:!!o.variation,[`mc-modal--header-align-${o.headerAlign}`]:(o.closeVisible||o.arrowVisible)&&!!o.headerAlign})),w=$(()=>({"--mc-modal-padding":N[e.indent.regular],"--mc-modal-padding-small":N[e.indent.small],"--mc-modal-header-line-height":P[e.header.title.line_height.regular],"--mc-modal-header-line-height-small":P[e.header.title.line_height.small],"--mc-modal-button-height":I[e.footer.button.regular],"--mc-modal-button-height-small":I[e.footer.button.small],"--mc-modal-max-width":`${o.maxWidth+24}px`,"--mc-modal-state-number":F.value})),p=(a=!0)=>{a||(e.scrolled_top=!1,e.scrolled_bottom=!1,e.small_indents=!1),setTimeout(()=>{if(l.value){const{scrollTop:t,scrollHeight:r,clientHeight:_}=l.value,m=2;e.scrolled_top=t>m,e.small_indents=e.scrolled_top&&e.can_shorten_modal,e.scrolled_bottom=t+_<r-m}},a?0:300)},q=()=>{s("before-close"),l.value&&(e.resize_observer&&e.resize_observer.unobserve(l.value),l.value.removeEventListener("scroll",()=>p()))},Q=()=>{o.separators&&(J(),l.value&&(l.value.addEventListener("scroll",()=>p(),{passive:!0}),e.resize_observer=new ResizeObserver(()=>X()),e.resize_observer.observe(l.value)),p()),s("opened")},G=a=>{s("back",a)},J=()=>{try{b.value&&Object.keys(w.value).forEach(a=>{var r;const t=parseInt((r=getComputedStyle(b.value))==null?void 0:r.getPropertyValue(a));t&&(e.modal_params[a]=t)})}catch(a){console.error(a)}},K=()=>{var m,C,B,S,T,z,x,O,H;const a=(+((m=e.modal_params)==null?void 0:m["--mc-modal-padding"])-+((C=e.modal_params)==null?void 0:C["--mc-modal-padding-small"]))*3+ +((B=e.modal_params)==null?void 0:B["--mc-modal-padding-small"]),t=+((S=e.modal_params)==null?void 0:S["--mc-modal-header-line-height"])-+((T=e.modal_params)==null?void 0:T["--mc-modal-header-line-height-small"]),r=+((z=e.modal_params)==null?void 0:z["--mc-modal-button-height"])-+((x=e.modal_params)==null?void 0:x["--mc-modal-button-height-small"]),_=a+t+r;!e.small_indents&&l.value&&(e.can_shorten_modal=((O=l.value)==null?void 0:O.scrollHeight)-((H=l.value)==null?void 0:H.clientHeight)>_)},X=()=>{K(),p()},Y=()=>{h.value=1,s("before-open"),s("update:modelValue",!0),ne(()=>Q())},v=()=>{h.value=0,setTimeout(()=>{q(),s("update:modelValue",!1),s("closed")},o.duration||300)},Z=()=>{o.clickBackdropToClose&&v()};return oe(()=>o.modelValue,a=>{a?Y():v()},{immediate:!0}),(a,t)=>o.modelValue?(i(),c("div",ie,[o.showOverlay?(i(),c("div",{key:0,class:"mc-modal__overlay",onClick:y(Z,["stop"])})):u("",!0),d("div",{class:le(["mc-modal",R.value]),style:te(w.value)},[d("div",{ref_key:"modalInner",ref:b,class:"mc-modal__inner"},[a.$slots.title?(i(),c("div",ce,[d("div",ue,[M(a.$slots,"title")])])):u("",!0),d("div",{ref_key:"mcModalBody",ref:l,class:"mc-modal__body"},[M(a.$slots,"default")],512),d("div",pe,[M(a.$slots,"footer"),fe])],512),n.arrowVisible?(i(),c("button",{key:0,type:"button",class:"mc-modal__btn-back",onClick:y(G,["prevent"])},[A(D,{name:"arrow_leftward",class:"mc-modal__icon-back"})])):u("",!0),n.closeVisible?(i(),c("button",{key:1,type:"button",class:"mc-modal__btn-close",onClick:y(v,["prevent"])},[A(D,{class:"mc-modal__icon-close",width:"24",height:"24",name:"close"})])):u("",!0)],6)])):u("",!0)}});V.__docgenInfo={exportName:"default",displayName:"McModal",description:"",tags:{},props:[{name:"modelValue",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"name",type:{name:"string"}},{name:"maxWidth",description:"Максимальная ширина модального окна",type:{name:"number"},defaultValue:{func:!1,value:"510"}},{name:"duration",description:"Скорость анимации",type:{name:"number"},defaultValue:{func:!1,value:"200"}},{name:"closeVisible",description:"Показывать кнопку закрытия модали",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showOverlay",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"clickBackdropToClose",description:`Нужно ли закрывать попап
 кликом вне окна`,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"arrowVisible",description:"Стрелка в хедере",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"secondaryModal",description:"Кастомное модальное окно",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"scrollableContent",description:`Должен ли контент внутри модалки скроллится с фиксированной шапкой и футером
Отключать, когда внутри есть селекты`,type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"separators",description:"Показывать сепараторы у хедера и футера при скролле.",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"headerAlign",description:`Выравнивание заголовка в шапке,
если centered добавляются отступы слева и справа, чтобы текст не наезжал на кнопки
centered || left || right`,type:{name:"HorizontalAlignment"},defaultValue:{func:!1,value:"'center'"}},{name:"topPadding",description:`Отступ от верхнего края модального окна до контента.
Для "красивой" обрезки картинки при скролле в ситуациях, когда нет хедера`,type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"variation",description:`Вариация модалки default || info
info модалки имеют меньшие размеры паддингов`,type:{name:"String as () => ModalVariation"},defaultValue:{func:!1,value:"'default'"}}],events:[{name:"before-open"},{name:"before-close"},{name:"opened"},{name:"closed"},{name:"back",type:{names:["Event"]}},{name:"update:modelValue",type:{names:["boolean"]}}],slots:[{name:"title",description:"Слот заголовка"},{name:"default",description:"Слот контента"},{name:"footer"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/templates/McModal/McModal.vue"]};const xe={title:"McModal",component:V,tags:["autodocs"],argTypes:{modelValue:{control:"none"},name:{control:"text"},maxWidth:{control:"number"},duration:{control:"number"},clickBackdropToClose:{control:"boolean"},arrowVisible:{control:"boolean"},scrollableContent:{control:"boolean"},separators:{control:"boolean"},topPadding:{control:"boolean"},headerAlign:{control:"select",options:Object.values(E)},variation:{control:"select",options:Object.values(k)}},args:{name:"McModal",maxWidth:510,duration:300,clickBackdropToClose:!0,arrowVisible:!0,scrollableContent:!0,separators:!0,topPadding:!0,headerAlign:E.Center,variation:k.Default},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},f={args:{},render(){return{data(){return{showModal:!1}},components:{McButton:me,McModal:V,McTitle:se},methods:{openModal(){this.showModal=!this.showModal},handleClose(){this.showModal=!1}},template:`
                <div style="height: 500px">
                  <mc-button @click.prevent="openModal">Show Modal</mc-button>
                  <mc-modal v-model="showModal" @close="handleClose">
                    <template #title>McModal</template>
                    <mc-title v-for="num in 1" :key="num" class="mt-300">
                      Этот пример демонстрирует как использовать 1 модаль.
                      <br />
                      <br />
                      Если нужно использование несколько модальных окон или не вставлять модальные окна на каждой стнанице:
                      <ol>
                        <li>Необходимо создать компонент, рутовым узлом которого будет mc-modal</li>
                        <li>при использовании ДС, зарегистрировать все компоненты в modalComponents (<code>app.use(MediacubeUI, { modalComponents: {...} })</code>)</li>
                        <li>открывать модаль в любом месте вашего проекта используя метод showModal из useModal</li>
                      </ol>
                    </mc-title>

                    <template #footer>
                      <mc-button @click.prevent="handleClose">Close</mc-button>
                    </template>
                  </mc-modal>
                </div>
            
            `}}};var W,L,j;f.parameters={...f.parameters,docs:{...(W=f.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {},
  render() {
    return {
      data() {
        return {
          showModal: false
        };
      },
      components: {
        McButton,
        McModal,
        McTitle
      },
      methods: {
        openModal() {
          this.showModal = !this.showModal;
        },
        handleClose() {
          this.showModal = false;
        }
      },
      template: \`
                <div style="height: 500px">
                  <mc-button @click.prevent="openModal">Show Modal</mc-button>
                  <mc-modal v-model="showModal" @close="handleClose">
                    <template #title>McModal</template>
                    <mc-title v-for="num in 1" :key="num" class="mt-300">
                      Этот пример демонстрирует как использовать 1 модаль.
                      <br />
                      <br />
                      Если нужно использование несколько модальных окон или не вставлять модальные окна на каждой стнанице:
                      <ol>
                        <li>Необходимо создать компонент, рутовым узлом которого будет mc-modal</li>
                        <li>при использовании ДС, зарегистрировать все компоненты в modalComponents (<code>app.use(MediacubeUI, { modalComponents: {...} })</code>)</li>
                        <li>открывать модаль в любом месте вашего проекта используя метод showModal из useModal</li>
                      </ol>
                    </mc-title>

                    <template #footer>
                      <mc-button @click.prevent="handleClose">Close</mc-button>
                    </template>
                  </mc-modal>
                </div>
            
            \`
    };
  }
}`,...(j=(L=f.parameters)==null?void 0:L.docs)==null?void 0:j.source}}};const Oe=["Default"];export{f as Default,Oe as __namedExportsOrder,xe as default};
