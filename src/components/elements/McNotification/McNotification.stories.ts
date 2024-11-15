import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import McNotification from '@/components/elements/McNotification/McNotification.vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'
import iconsList from '@/mocks/icons.json'
import type { IconsListUnion } from '@/types/styles/Icons'

const meta = {
    title: 'McNotification',
    component: McNotification,
    tags: ['autodocs'],
    argTypes: {
        variation: { control: 'select', options: Object.keys(Colors) },
        iconName: { control: 'select', options: Object.keys(iconsList) },
        iconVisible: { control: 'boolean' },
        buttonVisible: { control: 'boolean' },
        title: { control: 'text' },
        content: { control: 'text' },
    },
    args: {
        variation: 'purple' as ColorTypes,
        title: 'Notification title',
        content: 'Notification content',
        buttonText: 'Action',
        buttonVisible: true,
        iconVisible: true,
        iconName: 'info' as IconsListUnion,
        onClick: fn(() => alert('click'))
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=450%3A2514',
        },
    },
} satisfies Meta<typeof McNotification>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};