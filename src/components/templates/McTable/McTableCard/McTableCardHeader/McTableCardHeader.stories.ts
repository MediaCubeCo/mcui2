import type { Meta, StoryObj } from '@storybook/vue3'
import McTableCardHeader from './McTableCardHeader.vue'

const meta = {
  title: 'McTableCardHeader',
  component: McTableCardHeader,
  tags: ['autodocs'],
  args: {
    buttonBackText: 'Back',
    backTo: null
  }
} satisfies Meta<typeof McTableCardHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
