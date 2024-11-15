import type { Meta, StoryObj } from '@storybook/vue3'
import McCollapse from './McCollapse.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'

const meta = {
    title: 'McCollapse',
    component: McCollapse,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McCollapse>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: { McCollapse, McButton, McSvgIcon },
            data() {
                return {
                    content: 'Способы выплаты\n' +
                      '\n' +
                      '\n' +
                      'Здесь собраны все платежные методы, с помощью которых можно вывести деньги из MC Pay.\n' +
                      'Банковский перевод\n' +
                      '\n' +
                      '\n' +
                      'На счет в USD\n' +
                      'Электронный банковский перевод на счет в долларах.\n' +
                      '\n' +
                      '\n' +
                      '\n' +
                      'Минимальная сумма вывода: 50.00 USD;\n' +
                      '\n' +
                      'Комиссия:\n' +
                      'При выводе до 500 $: 5%\n' +
                      '\n' +
                      'При выводе от 500 $: 3% + 25 $\n' +
                      '\n' +
                      'При выводе от 1 000 $: 1% + 40 $\n' +
                      '\n' +
                      '\n' +
                      '\n' +
                      '\n' +
                      '\n' +
                      '\n' +
                      'На счет в местной валюте\n' +
                      'Электронный банковский перевод на счет в локальной валюте.\n' +
                      '\n' +
                      '\n' +
                      '\n' +
                      'Минимальная сумма вывода: 15.00 USD;\n' +
                      '\n' +
                      'Максимальная сумма вывода: 1 000 000.00 USD;\n' +
                      '\n' +
                      'Комиссия:\n' +
                      'Стандартная комиссия – 5 $\n' +
                      '\n' +
                      'Комиссия при выводе на счета вьетнамских банков – 8 $'
                }
            },
            methods: {
                handleOpenStart(e) {
                    console.log('handleOpenStart', e)
                },
                handleCloseStart(e) {
                    console.log('handleCloseStart', e)
                },
                handleOpenEnd(e) {
                    console.log('handleOpenEnd', e)
                },
                handleCloseEnd(e) {
                    console.log('handleCloseEnd', e)
                },
            },
            template: `
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
            </mc-collapse>`
        }
    },
};