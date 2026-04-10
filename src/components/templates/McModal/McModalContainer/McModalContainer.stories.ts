import type { Meta, StoryObj } from '@storybook/vue3'
import McModalContainer from './McModalContainer.vue'

const meta = {
  title: 'McModalContainer',
  component: McModalContainer,
  tags: ['autodocs'],
  args: {
    modalServiceState: {
      closeServiceState: () => {}
    },
    reactiveProps: {
      modals: []
    }
  }
} satisfies Meta<typeof McModalContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
