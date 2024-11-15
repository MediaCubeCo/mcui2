import{p as y,f as b,U as g,r as s,e as n,o as h,C as S,T as V,q as T,v as A,y as x,B as k}from"./vue.esm-bundler-DcuF_pQ3.js";import{C as P}from"./Colors-CDVZRUyv.js";const D=["id","aria-hidden","href","to"],M=y({__name:"McTab",props:{id:{type:String,default:""},name:{type:String,required:!0,default:""},prefix:{type:String,default:""},suffix:{type:String,default:""},appendCount:{type:Number,default:null},appendCountColor:{type:String,default:"black"},isDisabled:{type:Boolean,default:!1},visible:{type:Boolean,default:!0},iconPrepend:{type:String,default:""},iconAppend:{type:String,default:""},iconPrependColor:{type:String,default:""},iconAppendColor:{type:String,default:""},to:{type:Object,default:null},href:{type:String,default:""}},setup(a){const l=b("selfRegisterTabMethod",()=>{}),i=g(),e=a,t=s(!1),r=s(!0),u=n(()=>e.id?e.id:e.name.toLowerCase().replace(/ /g,"-")),p=n(()=>e.isDisabled?"#":`#${u.value}`),d=n(()=>!!e.appendCount||e.appendCount===0),c=n(()=>`--mc-tab-append-count-color: ${P[e.appendCountColor]}`),f=n(()=>[e.prefix,e.name,e.suffix].filter(Boolean).join("")),m=n(()=>e.visible?f.value:""),v=()=>{t.value=!0},C=()=>{t.value=!1};return h(()=>{if(l){const o={isActive:t.value,isVisible:r.value,computedId:u.value,hash:p.value,hasAppendCount:d.value,appendCountStyles:c.value,header:m.value,id:e.id,name:e.name,to:e.to,href:e.href,iconAppendColor:e.iconAppendColor,iconPrependColor:e.iconPrependColor,iconAppend:e.iconAppend,iconPrepend:e.iconPrepend,visible:e.visible,isDisabled:e.isDisabled,appendCountColor:e.appendCountColor,appendCount:e.appendCount,suffix:e.suffix,prefix:e.prefix,showTab:v,hideTab:C,onClick:i.onClick,...i};l(o)}}),(o,B)=>S((T(),A("section",{id:a.id,"aria-hidden":!t.value,class:"tabs-component-panel",role:"tabpanel",href:a.href,to:a.to},[a.visible?x(o.$slots,"default",{key:0}):k("",!0)],8,D)),[[V,t.value]])}});M.__docgenInfo={exportName:"default",displayName:"McTab",description:"",tags:{},props:[{name:"id",description:`Если нужен иной фрагмент в url после #
 (по умолчанию берётся из 'name')`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"name",description:"Имя таба (unique)",type:{name:"string"},required:!0,defaultValue:{func:!1,value:"''"}},{name:"prefix",description:`Вставка в начало имени таба
 (не влияет на значение вставленное в url)`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"suffix",description:`Вставка в конец имени таба
 (не влияет на значение вставленное в url)`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"appendCount",type:{name:"number"},defaultValue:{func:!1,value:"null"}},{name:"appendCountColor",type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"'black'"}},{name:"isDisabled",description:"Отключенное состояние",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"visible",description:"Виден ли таб",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"iconPrepend",description:"Классы иконки в начале",type:{name:"String as () => IconsListUnion"},defaultValue:{func:!1,value:"''"}},{name:"iconAppend",description:"Классы иконки в конце",type:{name:"String as () => IconsListUnion"},defaultValue:{func:!1,value:"''"}},{name:"iconPrependColor",description:"Цвет иконки в начале",type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"''"}},{name:"iconAppendColor",description:"Цвет иконки в конце",type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"''"}},{name:"to",description:"Если нужна ссылка внутри приложения:\n`{name: 'test', params: { id: test.id }}`",type:{name:"IRoute"},defaultValue:{func:!1,value:"null"}},{name:"href",description:"Если нужна обычная ссылка:\n`https://mediacube.agency/`",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"default",description:"контента"}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/patterns/McTab/McTab.vue"]};export{M as _};
