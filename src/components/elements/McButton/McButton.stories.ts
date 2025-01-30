import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import McButton from './McButton.vue'
import McSvgIcon from '../McSvgIcon/McSvgIcon.vue'
import { Colors } from '@/types/styles/Colors'
import { FontWeights } from '@/types/styles/FontWeights'
import { ButtonSize, ButtonType } from '@/enums/ui/Button'
import { HorizontalAlignment } from '@/enums/ui/Alignment'
import { Weights } from '@/enums/ui/Weights'

const meta = {
    title: 'McButton',
    component: McButton,
    tags: ['autodocs'],
    argTypes: {
        variation: { control: 'select', options: Object.keys(Colors) },
        secondaryColor: { control: 'select', options: Object.keys(Colors) },
        weight: { control: 'select', options: Object.keys(FontWeights) },
        to: { control: 'object' },
        href: { control: 'object' },
        nuxt: { control: 'boolean' },
        disabled: { control: 'boolean' },
        inactive: { control: 'boolean' },
        loading: { control: 'boolean' },
        iconLoading: { control: 'boolean' },
        shadow: { control: 'boolean' },
        rounded: { control: 'boolean' },
        semiRounded: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        isActive: { control: 'boolean' },
        exact: { control: 'boolean' },
        uppercase: { control: 'boolean' },
        underlineLink: { control: 'boolean' },
        bgFlat: { control: 'boolean' },
        textAlign: { control: 'select', options: HorizontalAlignment },
        type: { control: 'select', options: ButtonType },
        size: { control: 'select', options: ButtonSize },
        tooltip: { control: 'text' },
        tabindex: { control: 'number' },
    },
    args: {
        nuxt: true,
        disabled: false,
        inactive: false,
        loading: false,
        iconLoading: false,
        shadow: false,
        rounded: false,
        semiRounded: false,
        fullWidth: false,
        isActive: false,
        exact: false,
        uppercase: false,
        underlineLink: false,
        bgFlat: false,
        tooltip: '',
        onClick: fn(() => { alert('click') }),
        variation: 'purple'
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        default: 'Button content',
    },
};
export const Loading: Story = {
    args: {
        default: 'Button content',
        loading: true,
    },
};
export const Tooltip: Story = {
    args: {
        default: 'Button content',
        tooltip: 'Button tooltip content',
    },
};
export const Compact: Story = {
    args: {
        default: 'Button content',
        size: ButtonSize.MCompact
    },
};
export const SemiRounded: Story = {
    args: {
        default: 'Button content',
        semiRounded: true,
    },
};
export const Rounded: Story = {
    args: {
        default: 'Button content',
        size: ButtonSize.MCompact,
        rounded: true
    },
};
export const WithPrependAppendSlots: Story = {
    render() {
        return {
            components: { McSvgIcon, McButton },
            template: `
                <mc-button iconLoading> 
                    <template #icon-prepend>
                        <mc-svg-icon name="fly_dollar" />
                    </template>
                    Make money
                    <template #icon-append>
                        <mc-svg-icon name="dollar" />
                    </template>
                </mc-button>
            `
        }
    }
};
export const FullWidth: Story = {
    args: {
        default: 'Button content',
        fullWidth: true,
    },
};
export const AlignmentRight: Story = {
    args: {
        default: 'Button content',
        'icon-prepend': '*prepend*',
        'icon-append': '*append*',
        fullWidth: true,
        textAlign: HorizontalAlignment.Right
    },
};
export const WeightNormal: Story = {
    args: {
        default: 'Button content',
        weight: Weights.Normal
    },
};
export const Link: Story = {
    args: {
        to: '/some-path',
        variation: 'green-link',
        default: 'Link',
    },
};
