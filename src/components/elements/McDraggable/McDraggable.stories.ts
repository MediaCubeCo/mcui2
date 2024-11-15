import type { Meta, StoryObj } from '@storybook/vue3'
import McDraggable from './McDraggable.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import { Colors } from '@/types/styles/Colors'

const meta = {
    title: 'McDraggable',
    component: McDraggable,
    tags: ['autodocs'],
    argTypes: {
        variation: { control: 'select', options: Object.keys(Colors) },
        initial: { control: 'object' },
        cardId: { control: 'text' },
        savePosition: { control: 'boolean' },
        storageType: { control: 'select', options: ['session', 'local'] }
    },
    args: {
        variation: 'black',
        initial: { x: 10, y: 10 },
        savePosition: false,
        storageType: 'session',
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2',
        },
    },
} satisfies Meta<typeof McDraggable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: { McDraggable, McSvgIcon },
            template: `
              <div>
                  <a href="https://mcpay.io/auth/sign-up" target="_blank">https://mcpay.io/auth/sign-up</a>
                  <mc-draggable :initial="{ x: 10, y: 10 }" variation="black">
                      <template #left>
                          <mc-svg-icon name="mc_pay_app" size="500" />
                      </template>
                      <template #top>Drag me and know how you boost you revenues</template>
                      <template #bottom>Just drag me to right or bottom</template>
                  </mc-draggable>
              </div>
            `
        }
    },
}