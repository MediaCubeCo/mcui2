var r=(e=>(e.Exists="exists",e.Is="is",e.IsNot="is_not",e))(r||{}),t=(e=>(e.Relation="relation",e.Date="date",e.Text="text",e.Range="range",e.Fast="fast",e))(t||{});const s=[{type:t.Text,name:"Поиск",value:"email"},{type:t.Relation,is_text:!1,name:"Страна",value:"countries",options:[{name:"Беларусь",value:1},{name:"Россия",value:2},{name:"Украина",value:3}]},{type:t.Relation,name:"Пользователь",value:"users",getAjaxOne:e=>fetch("https://reqres.in/api/users?q="+e).then(a=>a.json()).then(a=>a.data.map(n=>({name:n.first_name+" "+n.last_name,value:n.id}))),getAjaxOptions:e=>fetch("https://reqres.in/api/users/"+e).then(a=>a.json()).then(a=>{const n=a.data;return{name:n.first_name+" "+n.last_name,value:n.id}})},{type:t.Range,name:"Просмотры",value:"views_count",min:0,max:1e4},{type:t.Date,name:"Дата создания",value:"created_at"},{type:t.Relation,name:"Тэг",value:"tags",is_text:!0},{type:t.Fast,relation:r.Exists,default:1,value:"disconnected_mcn_score",name:"Отключенные по MCN Score",description:"Отключенные по MCN Score tooltip"}],o={main_tooltip:"Click to open/close",value:"Value",condition:"Condition",create_preset:"Create new preset",fast_filters:"Fast filters",added_filters:"Added filters",enter_preset_name:"Enter preset name",enter_preset_tooltip:"Сохранение выбранных параметров фильтра в пользовательский пресет",from:"From",to:"To",enter:"Enter",choose:"Choose",actions:{add:"Add",save:"Save",clear:"Clear",create:"Create",delete_preset:"Delete preset",is:"This",is_not:"Is not",empty:"Empty",confirm:"Confirm"},calendar:{week:"Week",month:"Month",quarter:"Quarter",year:"Year",confirm:"Confirm"},messages:{same_filter:"Уже есть фильтр с таким параметром",same_preset_name:"Уже есть фильтр с таким именем",accidentally_cleared:"Случайно очистили?",accidentally_deleted:"Случайно удалили?",more_than:'Значение "от" не может быть больше значения "до"'}};export{t as F,r as a,o as d,s as f};
