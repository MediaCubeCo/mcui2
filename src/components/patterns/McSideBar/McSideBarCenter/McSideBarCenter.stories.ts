import type { Meta, StoryObj } from '@storybook/vue3'
import McSideBarCenter from './McSideBarCenter.vue'
import { menu } from '@/mocks/sidebar'

const meta = {
    title: 'McSideBarCenter',
    component: McSideBarCenter,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        menuMain: { control: 'object' },
        counts: { control: 'object' },
        compact: { control: 'boolean' },
    },
    args: {
        title: 'Dashboard',
        menuMain: menu,
        counts: { roles: 123 },
        compact: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McSideBarCenter>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};