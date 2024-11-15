import type { Meta, StoryObj } from '@storybook/vue3'
import McSideBarBottom from './McSideBarBottom.vue'

const meta = {
    title: 'McSideBarBottom',
    component: McSideBarBottom,
    tags: ['autodocs'],
    argTypes: {
        hideText: { control: 'text' },
        compact: { control: 'boolean' },
        hiddenMode: { control: 'boolean' },
    },
    args: {
        hideText: 'Hide',
        'bottom-message': 'bottom-message',
        compact: false,
        hiddenMode: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McSideBarBottom>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};