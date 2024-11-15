import type { Meta, StoryObj } from '@storybook/vue3'
import McFilterTypeDate from '@/components/patterns/McFilter/McFilterTypeDate/McFilterTypeDate.vue'
import { defaultPlaceholders } from '@/mocks/filterMocks'

const meta = {
    title: 'McFilterTypeDate',
    component: McFilterTypeDate,
    tags: ['autodocs'],
    argTypes: {
        useTimezone: { control: 'boolean' },
    },
    args: {
        placeholders: defaultPlaceholders,
        useTimezone: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McFilterTypeDate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};