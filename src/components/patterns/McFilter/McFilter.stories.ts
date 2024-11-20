import type { Meta, StoryObj } from '@storybook/vue3'
import McFilter from './McFilter.vue'
import { filters } from '@/mocks/filterMocks'

const meta = {
  title: 'McFilter',
  component: McFilter,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    buttonConfirmIsLoading: { control: 'boolean' },
    useTeleport: { control: 'boolean' },
    disabledOpen: { control: 'boolean' },
    useTimezone: { control: 'boolean' }
  },
  args: {
    filters: filters,
    name: 'mc-filter',
    buttonConfirmIsLoading: false,
    useTeleport: false,
    disabledOpen: false,
    useTimezone: false
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1801%3A5024'
    }
  }
} satisfies Meta<typeof McFilter>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      data() {
        return {
          v: {
            filter: {
              email: 'McPay',
              countries: {
                is: ['1', '3']
              },
              views_count: {
                more: 1,
                less: 10000
              },
              created_at: {
                more: '2024-10-01',
                less: '2024-11-30'
              },
              tags: {
                is: ['Piece']
              }
            },
            filter_name:
              'JTdCJTIyZW1haWwlMjI6JTIyTWNQYXklMjIsJTIyY291bnRyaWVzJTIyOiU3QiUyMmlzJTIyOiU3QiUyMjElMjI6JTIyJUQwJTkxJUQwJUI1JUQwJUJCJUQwJUIwJUQxJTgwJUQxJTgzJUQxJTgxJUQxJThDJTIyLCUyMjMlMjI6JTIyJUQwJUEzJUQwJUJBJUQxJTgwJUQwJUIwJUQwJUI4JUQwJUJEJUQwJUIwJTIyJTdEJTdELCUyMnZpZXdzX2NvdW50JTIyOiU3QiUyMm1vcmUlMjI6MSwlMjJsZXNzJTIyOjEwMDAwJTdELCUyMmNyZWF0ZWRfYXQlMjI6JTdCJTIybW9yZSUyMjolMjIyMDI0LTEwLTAxJTIyLCUyMmxlc3MlMjI6JTIyMjAyNC0xMS0zMCUyMiU3RCwlMjJ0YWdzJTIyOiU3QiUyMmlzJTIyOiU3QiUyMlBpZWNlJTIyOiUyMlBpZWNlJTIyJTdEJTdEJTdE'
          }
        }
      },
      components: {
        McFilter
      },
      computed: {
        filters() {
          return filters
        }
      },
      template: `
            <mc-filter :filters="filters" v-model="v" name="mc-filter"></mc-filter>
            `
    }
  }
}
