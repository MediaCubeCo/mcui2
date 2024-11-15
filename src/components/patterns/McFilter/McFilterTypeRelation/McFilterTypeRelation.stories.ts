import type { Meta, StoryObj } from '@storybook/vue3'
import McFilterTypeRelation from './McFilterTypeRelation.vue'
import { defaultPlaceholders } from '@/mocks/filterMocks'

const meta = {
    title: 'McFilterTypeRelation',
    component: McFilterTypeRelation,
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
} satisfies Meta<typeof McFilterTypeRelation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};