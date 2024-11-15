import type { Meta, StoryObj } from '@storybook/vue3'
import McInfinityLoadingTrigger from '@/components/elements/McInfinityLoadingTrigger/McInfinityLoadingTrigger.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'

const meta = {
    title: 'McInfinityLoadingTrigger',
    component: McInfinityLoadingTrigger,
    tags: ['autodocs'],
    argTypes: { },
    args: {},
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McInfinityLoadingTrigger>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: { McInfinityLoadingTrigger, McTitle },
            data() {
                return {
                    v: 1,
                    limit: 10,
                }
            },
            template: `
                <div class="placement">
                    <mc-title text-align="center" variation="info">Demonstration of the infinite loading indicator. According to the condition, it will load 
                        {{ limit }} blocks per page. If you remove the conditions, it will load from infinitely
                    </mc-title>
                    <div v-for="n in v" :key="n" style="height: 300px; background-color: #8756ff; border-radius: 12px; margin-bottom: 16px; padding: 16px">
                        <mc-title variation="h4" weight="normal" color="white">Block {{ n }}/{{ v }}</mc-title>
                    </div>
                    <mc-infinity-loading-trigger
                      :active="v < limit"
                      @loading="() => { v++ }"
                      @hide="() => (console.log('Block hide'))"
                    />
                </div>
            `
        }
    },
};