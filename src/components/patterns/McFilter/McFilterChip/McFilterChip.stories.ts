import type { Meta, StoryObj } from '@storybook/vue3'
import McFilterChip from './McFilterChip.vue'

const meta = {
  title: 'McFilterChip',
  component: McFilterChip,
  tags: ['autodocs'],
  argTypes: {
    tag: { control: 'object' },
    closable: { control: 'boolean' },
    isActive: { control: 'boolean' }
  },
  args: {
    tag: {
      id: 172958897132595070,
      categoryName: 'Поиск',
      title: 'McPay',
      value: 'McPay',
      category: 'email'
    },
    closable: true,
    isActive: true
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McFilterChip>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
