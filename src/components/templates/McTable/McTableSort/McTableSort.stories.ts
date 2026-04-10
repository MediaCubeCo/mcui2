import type { Meta, StoryObj } from '@storybook/vue3'
import McTableSort from './McTableSort.vue'

const meta = {
  title: 'McTableSort',
  component: McTableSort,
  tags: ['autodocs'],
  args: {
    column: 'id',
    sort: { sort_column: null, sort_direction: null }
  }
} satisfies Meta<typeof McTableSort>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
