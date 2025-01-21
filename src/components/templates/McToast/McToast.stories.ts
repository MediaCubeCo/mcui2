import { Meta, StoryObj } from '@storybook/vue3'
import McToast from './McToast.vue'
import McButton from '../../elements/McButton/McButton.vue'
import { ToastPositions } from '../../../enums/Toast'
import { useToast } from '../../../composables/useToast'
import { Colors } from '../../../types'
import iconsList from '@/mocks/icons.json'

const meta = {
  title: 'McToast',
  component: McToast,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: 'number' },
    position: { control: 'select', options: Object.keys(ToastPositions) },
    variation: { control: 'select', options: Object.keys(Colors) },
    icon: { control: 'select', options: Object.keys(iconsList) },
    title: { control: 'text' },
    description: { control: 'text' },
    closable: { control: 'boolean' },
    actions: { control: 'object' }
  },
  args: {},
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McToast>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render() {
    return {
      setup(props, ctx) {
        const toast = useToast()
        return {
          toast
        }
      },
      data() {
        return {}
      },
      components: { McButton },
      methods: {
        showToast() {
          this.toast.show({
            title: 'Top-left',
            variation: 'purple',
            icon: 'mc_pay_menu_circle_colored',
            position: ToastPositions.TopLeft
          })
          this.toast.show({
            title: 'Top-center',
            description: 'Additional text',
            variation: 'green',
            position: ToastPositions.TopCenter
          })
          this.toast.show({
            title: 'Top-right',
            variation: 'orange',
            icon: 'fly_dollar',
            position: ToastPositions.TopRight
          })
          this.toast.show({
            title: 'Bottom-left',
            variation: 'bright-pink',
            icon: 'fly_euro',
            position: ToastPositions.BottomLeft
          })
          this.toast.info({
            title: 'Bottom-center with actions',
            description: 'Some additional text',
            position: ToastPositions.BottomCenter,
            actions: [
              {
                title: 'Cancel',
                handler() {
                  alert('Cancel handler')
                }
              }
            ]
          }),
            this.toast.show({
              title: 'Bottom-right',
              variation: 'blue',
              position: ToastPositions.BottomRight
            })
        }
      },
      template: `<div style="height: 500px">
        <mc-button @click="showToast">Show toasts</mc-button>
      </div>`
    }
  }
}
