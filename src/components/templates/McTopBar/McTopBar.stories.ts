import type { Meta, StoryObj } from '@storybook/vue3'
import McTopBar from '@/components/templates/McTopBar/McTopBar.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import { authUser } from '@/mocks/authUser'
import { menuLangs } from '@/mocks/menuLangs'

const meta = {
  title: 'McTopBar',
  component: McTopBar,
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
} satisfies Meta<typeof McTopBar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      components: {
        McTopBar,
        McButton,
        McTitle,
        McSvgIcon,
      },
      data() {
        return {}
      },
      computed: {
        authUser() {
          return authUser
        },
        menuLangs() {
          return menuLangs
        },
      },
      methods: {
      },
      template: `
        <div style="height: 500px">
          <mc-top-bar :user="authUser" :menu-langs="menuLangs">
            <template #left>
              <mc-title variation="subtitle" max-width="auto">Left Section Title</mc-title>
              <mc-button size="xs-compact" rounded variation="black-flat">
                <template #icon-prepend>
                  <mc-svg-icon name="add" />
                </template>
              </mc-button>
            </template>

            <template #right>
              <mc-svg-icon name="search" />
            </template>
          </mc-top-bar>
        </div>
      `
    }
  }
}
