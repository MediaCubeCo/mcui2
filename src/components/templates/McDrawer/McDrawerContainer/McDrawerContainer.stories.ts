import type { Meta, StoryObj } from '@storybook/vue3'
import McDrawerContainer from './McDrawerContainer.vue'

const meta = {
  title: 'McDrawerContainer',
  component: McDrawerContainer,
  tags: ['autodocs'],
  args: {
    drawerServiceState: {
      closeServiceState: () => {}
    },
    reactiveProps: {
      drawers: []
    }
  }
} satisfies Meta<typeof McDrawerContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
