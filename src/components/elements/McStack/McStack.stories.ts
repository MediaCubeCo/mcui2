import type { Meta, StoryObj } from '@storybook/vue3'
import McStack from '@/components/elements/McStack/McStack.vue'
import McChip from '@/components/elements/McChip/McChip.vue'
import { categories } from '@/mocks/categories'

const meta = {
  title: 'McStack',
  component: McStack,
  tags: ['autodocs'],
  argTypes: {
    visibleCount: { control: 'number' },
    collapsed: { control: 'boolean' },
  },
  args: {
    visibleCount: Infinity,
    collapsed: false
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McStack>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories
        }
      },
      template: `
        <mc-stack>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `
    }
  }
}
export const Collapsed: Story = {
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories
        }
      },
      template: `
        <mc-stack collapsed>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `
    }
  }
}
export const LimitMax4: Story = {
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories
        }
      },
      template: `
        <mc-stack :visible-count="4">
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `
    }
  }
}
export const LimitMax4PlusCollapsed: Story = {
  render() {
    return {
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories
        }
      },
      template: `
        <mc-stack :visible-count="4" collapsed>
            <mc-chip v-for="category in computedCategories" :key="category.id" variation="purple" :title="category.title" />
        </mc-stack>
    `
    }
  }
}
export const OverflowTooltip: Story = {
  render() {
    return {
      data() {
        return {
          hiddenCount: 0
        }
      },
      components: {
        McStack,
        McChip
      },
      computed: {
        computedCategories() {
          return categories
        },
        computedTooltip() {
          return [...this.computedCategories].splice(this.hiddenCount * -1).map(c => c.title).join('\n')
        }
      },
      template: `
        <mc-stack :overflow-tooltip="computedTooltip" @updated:hidden-count="(e) => (hiddenCount = e)">
          <mc-chip 
            v-for="category in computedCategories" 
            :key="category.id" 
            variation="purple" 
            :title="category.title"
          />
        </mc-stack>
      `
    }
  }
}
