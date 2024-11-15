import type { Meta, StoryObj } from '@storybook/vue3'
import McChip from '@/components/elements/McChip/McChip.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import { Colors } from '@/types/styles/Colors'
import { ChipSize } from '@/enums/Chip'
import { fn } from '@storybook/test'

const meta = {
    title: 'McChip',
    component: McChip,
    tags: ['autodocs'],
    argTypes: {
        variation: { control: 'select', options: Object.keys(Colors) },
        title: { control: 'text' },
        closable: { control: 'boolean' },
        counter: { control: 'number' },
        size: { control: 'select', options: Object.values(ChipSize) },
    },
    args: {
        variation: 'purple',
        title: 'McChip',
        closable: false,
        onClose: fn(() => { alert('close click') }),
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McChip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        default: 'McChip',
    },
};
export const WithCounter: Story = {
    args: {
        default: 'McChip',
        counter: 22,
    },
};
export const Closable: Story = {
    args: {
        default: 'McChip',
        closable: true,
    },
};
export const WithIcon: Story = {
    render() {
        return {
            components: { McSvgIcon, McChip },
            template: `
                <mc-chip variation="purple"> 
                    <template #icon>
                        <mc-svg-icon name="fly_dollar" />
                    </template>
                    McChip
                </mc-chip>
            `
        }
    }
};
export const CustomCloseButton: Story = {
    render() {
        return {
            components: { McSvgIcon, McChip, McButton },
            template: `
                <mc-chip variation="purple" :counter="21" closable>
                    McChip
                    <template #button>
                        <mc-button size="xs" variation="black-compact">
                            <template #icon-append>
                                <mc-svg-icon name="edit" />
                            </template>
                        </mc-button>
                    </template>
                </mc-chip>
            `
        }
    }
};

export const TextColor: Story = {
    args: {
        default: 'McChip',
        textColor: 'red',
    },
};

export const Size: Story = {
    args: {
        default: 'McChip',
        size: ChipSize.Xs,
        counter: 22,
    },
};