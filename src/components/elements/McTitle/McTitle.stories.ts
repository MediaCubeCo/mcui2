import type { Meta, StoryObj } from '@storybook/vue3'
import McTitle from './McTitle.vue'
import { TitleVariations } from '@/enums/Title'
import { Colors } from '@/types/styles/Colors'
import { HorizontalAlignment } from '@/enums/ui/Alignment'
import { LineHeights } from '@/types/styles/LineHeights'
import { Weights } from '@/enums/ui/Weights'

const meta = {
    title: 'McTitle',
    component: McTitle,
    tags: ['autodocs'],
    argTypes: {
        variation: { control: 'select', options: TitleVariations },
        ellipsis: { control: 'boolean' },
        uppercase: { control: 'boolean' },
        preLine: { control: 'boolean' },
        nowrap: { control: 'boolean' },
        plainText: { control: 'boolean' },
        color: { control: 'select', options: Object.keys(Colors) },
        textAlign: { control: 'select', options: HorizontalAlignment },
        lineHeight: { control: 'select', options: Object.keys(LineHeights) },
        weight: { control: 'select', options: Weights },
        htmlData: { control: 'none' },
    },
    args: {
        ellipsis: true,
        uppercase: false,
        preLine: false,
        nowrap: false,
        plainText: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McTitle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        default: 'McTitle'
    },
};
export const VHtml: Story = {
    render() {
        return {
            components: { McTitle },
            data() {
                return {
                    text: '<div style="color: purple">Hello i am a purple text</div>',
                }
            },
            template: `
                input data - {{ text }}
                <br/>
                <mc-title :html-data="text" />
            `
        }
    },
};
export const Adaptive: Story = {
    args: {
        default: 'McTitleAdaptiveText',
        variation: 'body',
        variationS: 'h3',
        variationM: 'h1'
    },
};