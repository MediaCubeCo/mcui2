import type { Meta, StoryObj } from '@storybook/vue3'
import McProgress from '@/components/elements/McProgress/McProgress.vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'

const meta = {
    title: 'McProgress',
    component: McProgress,
    tags: ['autodocs'],
    argTypes: {
        percent: { control: 'number' },
        amount: { control: 'number' },
        color: { control: 'select', options: Object.keys(Colors) },
        helpTextColor: { control: 'select', options: Object.keys(Colors) },
        helpText: { control: 'text' },
        reverseHeaders: { control: 'boolean' },
        monospaceNumbers: { control: 'boolean' },
    },
    args: {
        percent: 30,
        color: 'purple' as ColorTypes,
        helpTextColor: 'pinkish' as ColorTypes,
        helpText: 'Help text',
        reverseHeaders: false,
        monospaceNumbers: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=88%3A0',
        },
    },
} satisfies Meta<typeof McProgress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};