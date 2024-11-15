import type { Meta, StoryObj } from '@storybook/vue3'
import McGridCol from './McGridCol.vue'
import McGridRow from '@/components/patterns/McGridRow/McGridRow.vue'

const meta = {
    title: 'McGridCol',
    component: McGridCol,
    tags: ['autodocs'],
    argTypes: {},
    args: { },
    parameters: {
        componentSubtitle: 'Status: Ready (More in McGridRow)',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McGridCol>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: { McGridCol, McGridRow },
            template: `
                <mc-grid-row>
                    <mc-grid-col span="4" span-m="8"><div style="background: #e74c3c">1</div></mc-grid-col>
                    <mc-grid-col span="4" span-m="8"><div style="background: #1abc9c">2</div></mc-grid-col>
                </mc-grid-row>
            `,
        }
    }
};