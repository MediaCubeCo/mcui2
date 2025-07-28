import type { Meta, StoryObj } from '@storybook/vue3'
import McContentFixed from './McContentFixed.vue'

const meta = {
  title: 'McContentFixed',
  component: McContentFixed,
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
} satisfies Meta<typeof McContentFixed>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
