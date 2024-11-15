import type { Meta, StoryObj } from '@storybook/vue3'
import McFilterTypeText from './McFilterTypeText.vue'
import { defaultPlaceholders } from '@/mocks/filterMocks'

const meta = {
    title: 'McFilterTypeText',
    component: McFilterTypeText,
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
} satisfies Meta<typeof McFilterTypeText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};