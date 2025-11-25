import type { Meta, StoryObj } from '@storybook/vue3'
import McDate from './McDate.vue'
import { Colors } from '../../../types'
import { TitleVariations } from '../../../enums'

const meta = {
    title: 'McDate',
    component: McDate,
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: Object.keys(Colors) },
        size: { control: 'select', options: Object.values(TitleVariations) },
        ellipsis: { control: 'boolean' },
        uppercase: { control: 'boolean' },
    },
    args: {
        modelValue: new Date(),
        format: 'DD.MM.YYYY HH:mm',
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McDate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};