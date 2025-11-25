import type { Meta, StoryObj } from '@storybook/vue3'
import McChatForm from './McChatForm.vue'

const meta = {
    title: 'McChatForm',
    component: McChatForm,
    tags: ['autodocs'],
    argTypes: { },
    args: {},
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A2152',
        },
    },
} satisfies Meta<typeof McChatForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    }
};