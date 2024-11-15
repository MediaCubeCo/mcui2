import type { Meta, StoryObj } from '@storybook/vue3'
import McWrapScroll from './McWrapScroll.vue'
import { Colors } from '@/types/styles/Colors'
import { ColumnJustifyAlignment } from '@/enums/Grid'

const meta = {
    title: 'McWrapScroll',
    component: McWrapScroll,
    tags: ['autodocs'],
    argTypes: {
        wrap: { control: 'boolean' },
        gutterY: { control: 'text' },
        gutterX: { control: 'text' },
        scrollable: { control: 'boolean' },
        justify: { control: 'select', options: Object.values(ColumnJustifyAlignment) },
    },
    args: {
        wrap: false,
        scrollable: true,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McWrapScroll>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: { McWrapScroll },
            computed: {
                backgrounds() {
                    return Object.values(Colors)
                },
                styles() {
                    return {
                        minWidth: '100px',
                        height: '50px',
                        marginRight: '10px',
                        borderRadius: '12px',
                    }
                },
            },
            template: `
                <mc-wrap-scroll scrollable>
                    <div v-for="n in 25" :style="{ ...styles,backgroundColor: backgrounds[n] }"></div>
                </mc-wrap-scroll>
            `,
        }
    }
};