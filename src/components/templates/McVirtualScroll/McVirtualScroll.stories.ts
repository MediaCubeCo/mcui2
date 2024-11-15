import type { Meta, StoryObj } from '@storybook/vue3'
import McVirtualScroll from '@/components/templates/McVirtualScroll/McVirtualScroll.vue'
import McPreview from '@/components/patterns/McPreview/McPreview.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import selectOptions from '@/mocks/selectOptions.json'

const meta = {
  title: 'McVirtualScroll',
  component: McVirtualScroll,
  tags: ['autodocs'],
  argTypes: {
    containerHeight: { control: 'number' },
    itemHeight: { control: 'number' },
    buffer: { control: 'number' },
  },
  args: {
    containerHeight: 500,
    itemHeight: 40,
    buffer: 1,
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McVirtualScroll>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      components: {
        McVirtualScroll,
        McPreview,
        McSvgIcon,
      },
      computed: {
        items() {
          return [...selectOptions,...selectOptions,...selectOptions,...selectOptions,...selectOptions,...selectOptions]
        },
      },
      template: `
      <mc-virtual-scroll :items="items" :item-height="40" :container-height="500">
        <template #item="{ item, index }">
          <mc-preview>
            <template #left>
              <mc-svg-icon name="mc_pay_app" size="400" />
            </template>
            <template #top>{{ item.title }}</template>
          </mc-preview>
        </template>
      </mc-virtual-scroll>
      `
    }
  },
}
