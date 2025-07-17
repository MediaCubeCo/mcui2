import type { Meta, StoryObj } from '@storybook/vue3'
import McMain from '@/components/templates/McMain/McMain.vue'

const meta = {
  title: 'McMain',
  component: McMain,
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
} satisfies Meta<typeof McMain>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      components: {
        McMain,
      },
      computed: {},
      template: `
        <mc-main>
          <template #left-bar>
            <div style="background-color: #dc9c07">Left-bar</div>
          </template>
          <template #top-bar>
            <div style="background-color: #6ce10e">Top-bar</div>
          </template>
          <template #default>
            <div style="background-color: #8756FF; height: 100%">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur eius error harum in
              laboriosam maiores, modi nam, nihil nisi numquam officia pariatur quia quidem sed tempora unde vitae,
              voluptatibus.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur eius error harum in
              laboriosam maiores, modi nam, nihil nisi numquam officia pariatur quia quidem sed tempora unde vitae,
              voluptatibus.
            </div>
          </template>
          <template #bottom>
            <div style="background-color: #a712da">Bottom</div>
          </template>
        </mc-main>
      `
    }
  },
}
