import type { Meta, StoryObj } from '@storybook/vue3';
import McBadge from './McBadge.vue'
import { Colors } from '@/types/styles/Colors'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'McBadge',
    component: McBadge,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        variation: { control: 'select', options: Object.keys(Colors) },
        verticalLine: { control: 'boolean' },
        modern: { control: 'boolean' },
    },
    args: {
        verticalLine: false,
        modern: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McBadge>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
    args: {
        default: 'Badge content',
    },
};
