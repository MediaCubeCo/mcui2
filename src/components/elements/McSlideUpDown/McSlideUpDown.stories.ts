import type { Meta, StoryObj } from '@storybook/vue3'
import McButton from '@/components/elements/McButton/McButton.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McSlideUpDown from '@/components/elements/McSlideUpDown/McSlideUpDown.vue'

const meta = {
    title: 'McSlideUpDown',
    component: McSlideUpDown,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McSlideUpDown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            data() {
                return {
                    isActive: false,
                    content: `
                    Which is more profitable: with or without a subscription?
                    It all depends on how often you use Expresses.
                    Without a subscription, the fee is higher, but it only applies to the amount that you decide to use early.
                    Expresses without a subscription are suitable for those who are used to withdrawing money once a month and only sometimes withdraw some amounts in advance.
                    With a subscription, the fee is lower, but it applies to the entire amount received, regardless of whether you used the money ahead of schedule or not.
                    Subscription is suitable for those who prefer to use the money right away. For example, for daily expenses.
                    `
                }
            },
            components: {
                McButton,
                McTitle,
                McSlideUpDown,
            },
            template: `
            <div>
                <mc-button @click="isActive = !isActive">MC Pay Expresses</mc-button>
                <mc-slide-up-down :active="isActive">
                    <mc-title style="padding: 16px 0" pre-line>{{content}}</mc-title>
                </mc-slide-up-down>
            </div>
            `
        }
    }
};