import type { Meta, StoryObj } from '@storybook/vue3'
import McTab from '@/components/patterns/McTab/McTab.vue'

const meta = {
    title: 'McTab',
    component: McTab,
    tags: ['autodocs'],
    argTypes: {},
    args: { },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McTab>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};