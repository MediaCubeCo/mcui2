import type { Meta, StoryObj } from '@storybook/vue3'
import McModal from './McModal.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import iconsList from '@/mocks/icons.json'
import { HorizontalAlignment } from '@/enums'
import { ModalVariation } from '@/enums/Modal'

const iconsArrayList = Object.keys(iconsList)

const meta = {
  title: 'McModal',
  component: McModal,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'none' },
    name: { control: 'text' },
    maxWidth: { control: 'number' },
    duration: { control: 'number' },
    clickBackdropToClose: { control: 'boolean' },
    arrowVisible: { control: 'boolean' },
    scrollableContent: { control: 'boolean' },
    separators: { control: 'boolean' },
    topPadding: { control: 'boolean' },
    headerAlign: { control: 'select', options: Object.values(HorizontalAlignment) },
    variation: { control: 'select', options: Object.values(ModalVariation) }
  },
  args: {
    name: 'McModal',
    maxWidth: 510,
    duration: 300,
    clickBackdropToClose: true,
    arrowVisible: true,
    scrollableContent: true,
    separators: true,
    topPadding: true,
    headerAlign: HorizontalAlignment.Center,
    variation: ModalVariation.Default
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McModal>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render() {
    return {
      data() {
        return {
          showModal: false
        }
      },
      components: { McButton, McModal, McTitle },
      methods: {
        openModal() {
          this.showModal = !this.showModal
        },
        handleClose() {
          this.showModal = false
        }
      },
      template: `
                <div style="height: 500px">
                  <mc-button @click.prevent="openModal">Show Modal</mc-button>
                  <mc-modal v-model="showModal" @close="handleClose">
                    <template #title>McModal</template>
                    <mc-title v-for="num in 1" :key="num" class="mt-300">
                      Этот пример демонстрирует как использовать 1 модаль.
                      <br />
                      <br />
                      Если нужно использование несколько модальных окон или не вставлять модальные окна на каждой стнанице:
                      <ol>
                        <li>Необходимо создать компонент, рутовым узлом которого будет mc-modal</li>
                        <li>при использовании ДС, зарегистрировать все компоненты в modalComponents (<code>app.use(MediacubeUI, { modalComponents: {...} })</code>)</li>
                        <li>открывать модаль в любом месте вашего проекта используя метод showModal из useModal</li>
                      </ol>
                    </mc-title>

                    <template #footer>
                      <mc-button @click.prevent="handleClose">Close</mc-button>
                    </template>
                  </mc-modal>
                </div>
            
            `
    }
  }
}
