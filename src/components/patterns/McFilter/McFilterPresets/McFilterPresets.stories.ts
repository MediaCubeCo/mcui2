import type { Meta, StoryObj } from '@storybook/vue3'
import McFilterPresets from './McFilterPresets.vue'

const meta = {
  title: 'McFilterPresets',
  component: McFilterPresets,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McFilterPresets>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
