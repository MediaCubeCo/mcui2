import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldRange from './McFieldRange.vue'
import { Colors, type ColorTypes } from '@/types/styles/Colors'

const meta = {
    title: 'McFieldRange',
    component: McFieldRange,
    tags: ['autodocs'],
    argTypes: {
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        color: { control: 'select', options: Object.keys(Colors)},
    },
    args: {
        color: 'purple' as ColorTypes,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=88%3A0',
        },
    },
} satisfies Meta<typeof McFieldRange>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: {
                McFieldRange,
            },
            data() {
                return {
                    v: 0.5,
                }
            },
            template: `
                <mc-field-range max="1" min="0" step="0.1" v-model="v" />
                <br />
                Output: {{ v }}
            `
        }
    },
};
export const Interval: Story = {
    render() {
        return {
            components: {
                McFieldRange,
            },
            data() {
                return {
                    v: [10, 90],
                }
            },
            template: `
                <mc-field-range v-model="v" />
                <br />
                Output: {{ v }}
            `
        }
    },
};
export const NoSmoothWithLabels: Story = {
    render() {
        return {
            components: {
                McFieldRange,
            },
            data() {
                return {
                    v: [1, 10],
                }
            },
            template: `
                <mc-field-range 
                  title="McFieldRange"
                  help-text="Help text"
                  :smooth="false"
                  :errors="['Error text']"
                  max="20"
                  show-labels
                  v-model="v" 
                />
                <br />
                Output: {{ v }}
            `
        }
    },
};