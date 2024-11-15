import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import McCropper from '@/components/elements/McCropper/McCropper.vue'

const meta = {
    title: 'McCropper',
    component: McCropper,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        imgSrc: 'https://avatars.githubusercontent.com/u/63395408?s=400&u=5f3ae555700cfcacf278425bf37c1433c3ed43c1&v=4',
        onReady: fn((e) => {
            console.log(e)
        }),
        onCrop: fn((e) => {
            console.log(e)
        })
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
        },
    },
} satisfies Meta<typeof McCropper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};