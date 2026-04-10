import type { Meta, StoryObj } from '@storybook/vue3'
import McIconShell from './McIconShell.vue'

const meta = {
  title: 'McIconShell',
  component: McIconShell,
  tags: ['autodocs'],
  args: {
    viewBox: '0 0 24 24',
    size: '250',
    color: 'black'
  }
} satisfies Meta<typeof McIconShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { McIconShell },
    setup() {
      return { args }
    },
    template:
      '<McIconShell v-bind="args"><circle cx="12" cy="12" r="8" fill="currentColor" /></McIconShell>'
  })
}
