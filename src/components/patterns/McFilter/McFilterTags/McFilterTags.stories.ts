import type { Meta, StoryObj } from '@storybook/vue3'
import McFilterTags from './McFilterTags.vue'
import { defaultPlaceholders, filters } from '@/mocks/filterMocks'

const meta = {
  title: 'McFilterTags',
  component: McFilterTags,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    modelValue: {
      email: 'McPay',
      countries: { is: { '1': 'Беларусь', '3': 'Украина' } },
      views_count: { more: 1, less: 10000 },
      created_at: { more: '2024-10-01', less: '2024-11-30' },
      tags: { is: { Piece: 'Piece' } }
    },
    activeTag: {
      id: 172959013349119550,
      categoryName: 'Поиск',
      title: 'McPay',
      value: 'McPay',
      category: 'email'
    },
    filters: filters,
    placeholders: defaultPlaceholders
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McFilterTags>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
