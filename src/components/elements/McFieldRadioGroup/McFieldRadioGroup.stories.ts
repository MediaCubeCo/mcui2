import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldRadioGroup from './McFieldRadioGroup.vue'
import { RadioVariation } from '@/enums/Radio'
import { RadioGroupDirection } from '@/enums/RadioGroup'
import { Directions } from '@/enums/ui/Directions'

const meta = {
    title: 'McFieldRadioGroup',
    component: McFieldRadioGroup,
    tags: ['autodocs'],
    argTypes: {
        variation: { control: 'select', options: RadioVariation },
        direction: { control: 'select', options: RadioGroupDirection },
        dir: { control: 'select', options: Directions },
        modelValue: { control: 'none' },
        errors: { control: 'none' },
        title: { control: 'text' },
        helpText: { control: 'text' },
        name: { control: 'text' },
        disabled: { control: 'boolean' },
        radioClassName: { control: 'text' },
    },
    args: {
        variation: 'checkmark',
        title: 'McFieldRadioGroup title',
        helpText: 'Help text',
        name: 'McFieldRadioGroup',
        disabled: false,
        radioClassName: '',
        direction: RadioGroupDirection.Column,
        dir: Directions.Ltr,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McFieldRadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        options: ['McPay Advance', 'McPay Expresses'],
        modelValue: 'McPay Advance',
    }
}
export const LiveGroup: Story = {
    render() {
        return {
            components: { McFieldRadioGroup },
            data() {
                return {
                    v: 1,
                    options: [
                      { label: 'McPay Advance', value: 1, helpText: 'Best way' },
                        { label: 'McPay Expresses', value: 2, helpText: 'Best way' },
                    ],
                }
            },
            template: `
                <mc-field-radio-group v-model="v" :errors="['Select your boost']" :options="options" help-text="Go" name="radio-group" value="value1" />
                <br />
                Output: {{ v }}
            `
        }
    },
};