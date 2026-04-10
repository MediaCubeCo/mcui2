import type { Meta, StoryObj } from '@storybook/vue3'
import McTableSkeletonLoading from './McTableSkeletonLoading.vue'

const meta = {
  title: 'McTableSkeletonLoading',
  component: McTableSkeletonLoading,
  tags: ['autodocs'],
  args: {
    columns: [
      {
        header: 'Col',
        field: 'a',
        width: 120,
        fixedFirst: false,
        fixedLast: false,
        style: { flex: '1 1 120px' }
      }
    ]
  }
} satisfies Meta<typeof McTableSkeletonLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
