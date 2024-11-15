import type { Meta, StoryObj } from '@storybook/vue3'
import McNoData from '@/components/elements/McNodata/McNoData.vue'

const meta = {
  title: 'McNoData',
  component: McNoData,
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
} satisfies Meta<typeof McNoData>
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
      return {
        components: {
          McNoData
        },
        template: `
        <div style="height: 500px">
          <mc-no-data title="No data" />
        </div>
         `
      }
    }
};