import type { Meta, StoryObj } from '@storybook/vue3'
import McSideBar from './McSideBar.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import { menu, apps } from '@/mocks/sidebar'

const meta = {
  title: 'McSideBar',
  component: McSideBar,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McSideBar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      data() {
        return {
          compact: false
        }
      },
      components: { McSideBar, McTitle },
      computed: {
        menu() {
          return menu
        },
        apps() {
          return apps
        }
      },
      methods: {
        handleCompact() {
          console.log('handleCompact')
        }
      },
      template: `
        <mc-side-bar :compact="compact" :menu-main="menu" :menu-apps="apps" logo-icon="mc_dashboard" hide-text="Collapse me" @compact="handleCompact">
          <template #bottom-message>
            <mc-title color="white">bottom-message slot</mc-title>
          </template>
        </mc-side-bar>
            `
    }
  }
}
