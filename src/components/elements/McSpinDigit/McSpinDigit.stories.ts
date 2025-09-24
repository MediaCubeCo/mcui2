import type { Meta, StoryObj } from '@storybook/vue3'
import McSpinDigit from './McSpinDigit.vue'
import { Colors, type ColorTypes, FontSizes, FontWeights } from '../../../types'

const meta = {
    title: 'McSpinDigit',
    component: McSpinDigit,
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: Object.keys(Colors) },
        duration: { control: 'number' },
        start: { control: 'number' },
        end: { control: 'number' },
        fontSize: { control: 'select', options: Object.keys(FontSizes) },
        weight: { control: 'select', options: Object.keys(FontWeights) },
    },
    args: {
        color: 'purple' as ColorTypes,
        duration: 500,
        start: 1,
        end: 9,
        fontSize: '300',
        weight: 'normal',
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=81%3A788',
        },
    },
} satisfies Meta<typeof McSpinDigit>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};