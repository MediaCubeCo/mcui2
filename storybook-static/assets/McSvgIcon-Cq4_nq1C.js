import{p as c,e as r,v as u,x as p,A as m,E as d,q as f}from"./vue.esm-bundler-DcuF_pQ3.js";import{S as g}from"./Sizes-ByFfI8jG.js";import{C as v}from"./Colors-CDVZRUyv.js";var i=(t=>(t.Rtl="rtl",t.Ltr="ltr",t))(i||{});const S=""+new URL("iconsSprite-CHu3w3lD.svg",import.meta.url).href,y=["xlink:href"],h=c({__name:"McSvgIcon",props:{spritePath:{type:String,default:S,validator(t){return!!t}},name:{type:String,required:!0},color:{type:String,default:""},size:{type:String,default:"250"},weight:{type:Number,default:1.5},defaultName:{type:String,default:""},dir:{type:String,default:i.Ltr}},setup(t){const e=t,o=r(()=>({"mc-svg-icon":!0,[`mc-svg-icon--dir-${e.dir}`]:!!e.dir})),l=r(()=>{var n,a,s;return{"--mc-svg-icon-size":g[e.size],"--mc-svg-icon-weight":(s=(a=(n=String(e.weight))==null?void 0:n.replace(".",""))==null?void 0:a.split(""))==null?void 0:s.join("."),"--mc-svg-icon-color":e.color&&v[e.color]}});return(n,a)=>(f(),u("svg",{class:m(o.value),style:d(l.value)},[p("use",{"xlink:href":`${e.spritePath}#${e.name}`},null,8,y)],6))}});h.__docgenInfo={exportName:"default",displayName:"McSvgIcon",description:"",tags:{},props:[{name:"spritePath",description:"Путь к спрайту с иконками",type:{name:"string"},defaultValue:{func:!1,value:"iconsSpriteIcon"}},{name:"name",description:"Имя иконки",type:{name:"String as () => IconsListUnion"},required:!0},{name:"color",description:`Цвет иконки
(по токенам)`,type:{name:"String as () => ColorTypes"},defaultValue:{func:!1,value:"''"}},{name:"size",description:"Размер",type:{name:"String as () => SizeTypes"},defaultValue:{func:!1,value:"'250'"}},{name:"weight",description:`Толщина линий 0-5 если нужно больше, нужно дописать список в стилях
stroke-width`,type:{name:"number"},defaultValue:{func:!1,value:"1.5"}},{name:"defaultName",description:`Отображение иконки,
если не найдена по имени
в 'name'`,type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"dir",type:{name:"String as () => DirectionsUnion"},defaultValue:{func:!1,value:"Directions.Ltr"}}],sourceFiles:["/Users/user/Documents/work/mediacube-ui-v2/src/components/elements/McSvgIcon/McSvgIcon.vue"]};export{i as D,h as _};
