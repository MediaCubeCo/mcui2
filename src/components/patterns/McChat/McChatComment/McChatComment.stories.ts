import type { Meta, StoryObj } from '@storybook/vue3'
import McChatComment from './McChatComment.vue'

const meta = {
    title: 'McChatComment',
    component: McChatComment,
    tags: ['autodocs'],
    argTypes: {
        editable: { control: 'boolean' },
    },
    args: {
        comment: {
            created_at: new Date(),
            content: 'Welcome to Early Funds',
            user: {
                full_name: 'John Badabom'
            }
        },
        editable: true,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=346%3A2152',
        },
    },
} satisfies Meta<typeof McChatComment>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    }
};