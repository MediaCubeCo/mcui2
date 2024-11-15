import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldRadio from './McFieldRadio.vue'
import { RadioVariation } from '@/enums/Radio'
import { Colors } from '@/types/styles/Colors'
import { Sizes } from '@/types/styles/Sizes'
import { Directions } from '@/enums/ui/Directions'

const meta = {
    title: 'McFieldRadio',
    component: McFieldRadio,
    tags: ['autodocs'],
    argTypes: {
        helpText: { control: 'text' },
        modelValue: { control: 'none' },
        value: { control: 'text' },
        name: { control: 'text' },
        errors: { control: 'none' },
        disabled: { control: 'boolean' },
        tabindex: { control: 'number' },
        variation: { control: 'select', options: RadioVariation },
        color: { control: 'select', options: Object.keys(Colors) },
        iconSize: { control: 'select', options: Object.keys(Sizes) },
        dir: { control: 'select', options: Directions, }
    },
    args: {
        name: 'default',
        variation: RadioVariation.Circle,
        disabled: false,
        tabindex: 0,
        color: 'purple',
        value: '1',
        modelValue: '1',
        dir: Directions.Ltr,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McFieldRadio>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'McFieldRadio',
        helpText: 'Help text',
        name: 'default'
    }
}

export const Group: Story = {
    render() {
        return {
            components: { McFieldRadio },
            data() {
                return {
                    v: '1',
                }
            },
            template: `
                <mc-field-radio v-model="v" name="radio" :errors="['Error text']" value="1">McFieldRadio</mc-field-radio>
                <br />
                <mc-field-radio v-model="v" name="radio" value="2">McFieldRadio 2</mc-field-radio>
                <br />
                Output: {{ v }}
            `
        }
    },
};
export const CheckMark: Story = {
    render() {
        return {
            components: { McFieldRadio },
            data() {
                return {
                    v: 'value1',
                }
            },
            template: `
                <mc-field-radio v-model="v" name="radio2" variation="checkmark" value="value1">McFieldRadio</mc-field-radio>
                <br />
                <McFieldRadio v-model="v" name="radio2" variation="checkmark" value="value2">McFieldRadio 2</McFieldRadio>
                <br />
                Output: {{ v }}
            `
        }
    },
};