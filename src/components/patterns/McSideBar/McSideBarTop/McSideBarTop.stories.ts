import type { Meta, StoryObj } from '@storybook/vue3'
import McSideBarTop from './McSideBarTop.vue'
import { apps } from '@/mocks/sidebar'
import { DropdownPositions, TitleVariations } from '@/enums'
import iconsList from '@/mocks/icons.json'

const meta = {
    title: 'McSideBarTop',
    component: McSideBarTop,
    tags: ['autodocs'],
    argTypes: {
        menuApps: { control: 'object' },
        logoTitle: { control: 'text' },
        logoTitleVariation: { control: 'select', options: Object.values(TitleVariations) },
        logoIcon: { control: 'select', options: Object.keys(iconsList) },
        dropdownPosition: { control: 'select', options: Object.values(DropdownPositions) },
        compact: { control: 'boolean' }
    },
    args: {
        menuApps: apps,
        logoTitle: 'Dashboard',
        logoTitleVariation: TitleVariations.Subtitle,
        logoIcon: 'mc_pay_app',
        dropdownPosition: DropdownPositions.Left,
        compact: false
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McSideBarTop>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};