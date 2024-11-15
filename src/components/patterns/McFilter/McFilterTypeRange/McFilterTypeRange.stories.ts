import type { Meta, StoryObj } from '@storybook/vue3'
import McFilterTypeRange from './McFilterTypeRange.vue'
import { defaultPlaceholders } from '@/mocks/filterMocks'

const meta = {
    title: 'McFilterTypeRange',
    component: McFilterTypeRange,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        placeholders: defaultPlaceholders,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McFilterTypeRange>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};