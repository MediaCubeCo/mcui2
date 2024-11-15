import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldToggle from '@/components/elements/McFieldToggle/McFieldToggle.vue'
import { HorizontalAlignment } from '@/enums/ui/Alignment'
import { Colors, type ColorTypes } from '@/types/styles/Colors'

const meta = {
    title: 'McFieldToggle',
    component: McFieldToggle,
    tags: ['autodocs'],
    argTypes: {
        modelValue: { control: 'none' },
        checkedValue: { control: 'text' },
        uncheckedValue: { control: 'text' },
        coloredText: { control: 'boolean' },
        disabled: { control: 'boolean' },
        textPosition: { control: 'select', options: HorizontalAlignment },
        color: { control: 'select', options: Object.keys(Colors) },
        tabindex: { control: 'number' },
    },
    args: {
        checkedValue: 'true',
        uncheckedValue: 'false',
        coloredText: false,
        disabled: false,
        errors: ['Error text'],
        color: 'purple' as ColorTypes,
        tabindex: 0,
        default: 'Hello'
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McFieldToggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'Default'
    },
};
export const WithError: Story = {
    render() {
        return {
            components: { McFieldToggle },
            data() {
                return {
                    v: null,
                }
            },
            template: `
                <mc-field-toggle v-model="v" text-position="right">Get all McPay benefits</mc-field-toggle>
                <a v-if="v" href="https://mcpay.io/auth/sign-up" target="_blank">https://mcpay.io/auth/sign-up</a>
                <br />
                Output: {{ v }}
            `
        }
    },
};