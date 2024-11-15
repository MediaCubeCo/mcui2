import type { Meta, StoryObj } from '@storybook/vue3'
import McSeparator from '@/components/elements/McSeparator/McSeparator.vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import { Spaces } from '@/types/styles/Spaces'

const meta = {
    title: 'McSeparator',
    component: McSeparator,
    tags: ['autodocs'],
    argTypes: {
        color: { control: 'select', options: Object.keys(Colors) },
        indentX: { control: 'select', options: Object.keys(Spaces) },
        indentY: { control: 'select', options: Object.keys(Spaces) },
        indentTop: { control: 'select', options: Object.keys(Spaces) },
        indentBottom: { control: 'select', options: Object.keys(Spaces) },
        indentLeft: { control: 'select', options: Object.keys(Spaces) },
        indentRight: { control: 'select', options: Object.keys(Spaces) },
    },
    args: {
        color: 'purple' as ColorTypes,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=81%3A788',
        },
    },
} satisfies Meta<typeof McSeparator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};