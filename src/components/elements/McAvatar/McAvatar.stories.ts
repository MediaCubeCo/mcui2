import type { Meta, StoryObj } from '@storybook/vue3';
import McAvatar from './McAvatar.vue'
import { AvatarSizes } from '@/types/styles/AvatarSizes'
import { Colors } from '@/types/styles/Colors'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'McAvatar',
    component: McAvatar,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: Object.keys(AvatarSizes) },
        src: { control: 'text' },
        alt: { control: 'text' },
        borderColor: { control: 'select', options: Object.keys(Colors) },
        dotColor: { control: 'select', options: Object.keys(Colors) },
        rounded: { control: 'boolean' },
        shadow: { control: 'boolean' },
        lazy: { control: 'boolean' },
    },
    args: {
        src: 'https://avatars.githubusercontent.com/u/63395408?s=400&u=5f3ae555700cfcacf278425bf37c1433c3ed43c1&v=4',
        alt: 'I am alternative',
        size: '1000',
        borderColor: '',
        dotColor: '',
        rounded: true,
        shadow: false,
        lazy: false,
        draggable: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=127%3A1390',
        },
    },
} satisfies Meta<typeof McAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Shadow: Story = {
    args: {
        shadow: true,
    },
};
export const Size: Story = {
    args: {
        size: '300',
        dotColor: 'purple',
    },
};
export const Draggable: Story = {
    args: {
        draggable: true,
        borderColor: 'red',
    },
};
export const Unrounded: Story = {
    args: {
        rounded: false,
        dotColor: 'purple',
    },
};
