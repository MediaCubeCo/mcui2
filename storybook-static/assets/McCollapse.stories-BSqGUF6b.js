import{_ as l}from"./McCollapse-Bt_j0AUk.js";import{_ as s}from"./McButton-Cw3_qabT.js";import{_ as p}from"./McSvgIcon-Cq4_nq1C.js";import"./vue.esm-bundler-DcuF_pQ3.js";import"./McSlideUpDown-CguhuDbm.js";import"./useTooltip-C3VtZaBe.js";import"./Colors-CDVZRUyv.js";import"./index-DRQZTcpU.js";import"./FontWeights-CHR9KMRI.js";import"./Sizes-ByFfI8jG.js";const $={title:"McCollapse",component:l,tags:["autodocs"],argTypes:{},args:{},parameters:{componentSubtitle:"Status: Ready",design:{type:"figma",url:""}}},e={render(){return{components:{McCollapse:l,McButton:s,McSvgIcon:p},data(){return{content:`Способы выплаты


Здесь собраны все платежные методы, с помощью которых можно вывести деньги из MC Pay.
Банковский перевод


На счет в USD
Электронный банковский перевод на счет в долларах.



Минимальная сумма вывода: 50.00 USD;

Комиссия:
При выводе до 500 $: 5%

При выводе от 500 $: 3% + 25 $

При выводе от 1 000 $: 1% + 40 $






На счет в местной валюте
Электронный банковский перевод на счет в локальной валюте.



Минимальная сумма вывода: 15.00 USD;

Максимальная сумма вывода: 1 000 000.00 USD;

Комиссия:
Стандартная комиссия – 5 $

Комиссия при выводе на счета вьетнамских банков – 8 $`}},methods:{handleOpenStart(n){console.log("handleOpenStart",n)},handleCloseStart(n){console.log("handleCloseStart",n)},handleOpenEnd(n){console.log("handleOpenEnd",n)},handleCloseEnd(n){console.log("handleCloseEnd",n)}},template:`
            <mc-collapse 
                @collapse-open-start="handleOpenStart"
                @collapse-close-start="handleCloseStart"
                @collapse-open-end="handleOpenEnd"
                @collapse-close-end="handleCloseEnd"
            >
                <template #activator>
                    <mc-button>Способы выплаты</mc-button>
                </template>
                <template #body>
                    <p>{{content}}</p>
                </template>
            </mc-collapse>`}}};var t,o,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render() {
    return {
      components: {
        McCollapse,
        McButton,
        McSvgIcon
      },
      data() {
        return {
          content: 'Способы выплаты\\n' + '\\n' + '\\n' + 'Здесь собраны все платежные методы, с помощью которых можно вывести деньги из MC Pay.\\n' + 'Банковский перевод\\n' + '\\n' + '\\n' + 'На счет в USD\\n' + 'Электронный банковский перевод на счет в долларах.\\n' + '\\n' + '\\n' + '\\n' + 'Минимальная сумма вывода: 50.00 USD;\\n' + '\\n' + 'Комиссия:\\n' + 'При выводе до 500 $: 5%\\n' + '\\n' + 'При выводе от 500 $: 3% + 25 $\\n' + '\\n' + 'При выводе от 1 000 $: 1% + 40 $\\n' + '\\n' + '\\n' + '\\n' + '\\n' + '\\n' + '\\n' + 'На счет в местной валюте\\n' + 'Электронный банковский перевод на счет в локальной валюте.\\n' + '\\n' + '\\n' + '\\n' + 'Минимальная сумма вывода: 15.00 USD;\\n' + '\\n' + 'Максимальная сумма вывода: 1 000 000.00 USD;\\n' + '\\n' + 'Комиссия:\\n' + 'Стандартная комиссия – 5 $\\n' + '\\n' + 'Комиссия при выводе на счета вьетнамских банков – 8 $'
        };
      },
      methods: {
        handleOpenStart(e) {
          console.log('handleOpenStart', e);
        },
        handleCloseStart(e) {
          console.log('handleCloseStart', e);
        },
        handleOpenEnd(e) {
          console.log('handleOpenEnd', e);
        },
        handleCloseEnd(e) {
          console.log('handleCloseEnd', e);
        }
      },
      template: \`
            <mc-collapse 
                @collapse-open-start="handleOpenStart"
                @collapse-close-start="handleCloseStart"
                @collapse-open-end="handleOpenEnd"
                @collapse-close-end="handleCloseEnd"
            >
                <template #activator>
                    <mc-button>Способы выплаты</mc-button>
                </template>
                <template #body>
                    <p>{{content}}</p>
                </template>
            </mc-collapse>\`
    };
  }
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const E=["Default"];export{e as Default,E as __namedExportsOrder,$ as default};
