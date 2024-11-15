import type { Meta, StoryObj } from '@storybook/vue3'
import McPreview from './McPreview.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'

const meta = {
    title: 'McPreview',
    component: McPreview,
    tags: ['autodocs'],
    argTypes: {},
    args: { },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McPreview>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: { McPreview, McButton, McSvgIcon },
            template: `
              <mc-preview>
                  <template #left>
                      <mc-svg-icon name="fly_dollar" size="500" />
                  </template>
                  <template #top>
                      McPay Early Funds it's fantastic
                  </template>
                  <template #bottom>
                      Just try!
                  </template>
                  <template #right>
                      <mc-button>GO!</mc-button>
                  </template>
              </mc-preview>
            `
        }
    },
};