import type { Meta, StoryObj } from '@storybook/vue3'
import McSideBarButton from './McSideBarButton.vue'

const meta = {
    title: 'McSideBarButton',
    component: McSideBarButton,
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
} satisfies Meta<typeof McSideBarButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};