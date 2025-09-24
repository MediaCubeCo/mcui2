import type { Meta, StoryObj } from '@storybook/vue3'
import McSpinNumber from './McSpinNumber.vue'
import McButton from '../McButton/McButton.vue'
import { Colors, type ColorTypes, FontSizes, FontWeights } from '../../../types'

const meta = {
    title: 'McSpinNumber',
    component: McSpinNumber,
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
        start: 123,
        end: 321,
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
} satisfies Meta<typeof McSpinNumber>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
export const Random: Story = {
    render() {
        return {
            data() {
                return {
                    end: 0
                }
            },
            components: {
                McButton,
                McSpinNumber,
            },
            methods: {
                setRandomEnd() {
                    this.end = Math.ceil(Math.floor(Math.random() * 1000000) + 1)
                },
                setRandomFloatEnd() {
                    this.end = ((Math.random() * 10000) + 1).toFixed(2)
                },
            },
            template: `
                <mc-spin-number font-size="700" color="red" :end="end" :start="0" :duration="500" />
                <br />
                End v - {{ end }}
                <br />
                <br />
                <mc-button @click="() => setRandomEnd()">Random Int</mc-button>&nbsp;
                <mc-button @click="() => setRandomFloatEnd()">Random Float</mc-button>
            `
        }
    },
};