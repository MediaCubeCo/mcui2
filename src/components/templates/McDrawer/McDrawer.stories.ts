import type { Meta, StoryObj } from '@storybook/vue3'
import McDrawer from './McDrawer.vue'
import McDrawerContentTemplate from '@/components/templates/McDrawer/McDrawerContentTemplate/McDrawerContentTemplate.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import { DrawerPositions } from '@/enums/Drawer'
import iconsList from '@/mocks/icons.json'

const iconsArrayList = Object.keys(iconsList)

const meta = {
  title: 'McDrawer',
  component: McDrawer,
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: Object.values(DrawerPositions) },
    modelValue: { control: 'none' },
    duration: { control: 'number' },
    width: { control: 'number' },
    closeVisible: { control: 'boolean' },
    showOverlay: { control: 'boolean' },
    iconClose: { control: 'select', options: iconsArrayList },
  },
  args: {
    position: DrawerPositions.Right,
    duration: 300,
    width: 300,
    closeVisible: true,
    showOverlay: true,
    iconClose: 'close',
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McDrawer>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render() {
    return {
      data() {
        return {
          showDrawer: false
        }
      },
      components: { McButton, McDrawer, McTitle, McDrawerContentTemplate },
      methods: {
        openDrawer() {
          this.showDrawer = !this.showDrawer
        },
        handleClose() {
          this.showDrawer = false
        },
      },
      template: `
                <div style="height: 500px">
                  <mc-button @click.prevent="openDrawer">Show Drawer</mc-button>
                  <mc-drawer v-model="showDrawer">
                    <mc-drawer-content-template title="McDrawer">
                      <mc-title v-for="num in 5" :key="num" class="mt-300">
                        Этот пример демонстрирует как использовать 1 дровер.
                        <br />
                        <br />
                        Если нужно использование несколько дроверов без их явной вставки на странице/в компоненте:
                        <ol>
                          <li>Необходимо создать компонент, рутовым узлом которого будет mc-drawer-content-template (опционально, для типовой разметки)</li>
                          <li>при использовании ДС, передать все компоненты в drawerComponents (<code>app.use(MediacubeUI, { drawerComponents: {...} })</code>)</li>
                          <li>открывать дроверы в любом месте вашего проекта используя метод showDrawer из useDrawer</li>
                        </ol>
                      </mc-title>

                      <template #footer>
                        <mc-button @click.prevent="handleClose">Close</mc-button>
                      </template>
                    </mc-drawer-content-template>
                  </mc-drawer>
                </div>
            
            `
    }
  }
}
