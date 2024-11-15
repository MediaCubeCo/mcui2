import type { Meta, StoryObj } from '@storybook/vue3'
import McCell from './McCell.vue'
import { CellSizes } from '@/enums/Cell'

const meta = {
    title: 'McCell',
    component: McCell,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        size: { control: 'select', options: Object.values(CellSizes) },
        uppercase: { control: 'boolean' },
        ellipsis: { control: 'boolean' },
    },
    args: {
        title: 'McCellTitle',
        default: 'Cell content',
        size: CellSizes.M,
        ellipsis: true,
        uppercase: true,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McCell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    }
};