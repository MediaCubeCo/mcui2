import type { Meta, StoryObj } from '@storybook/vue3'
import McTooltip from '@/components/elements/McTooltip/McTooltip.vue'
import { TooltipPositions, TooltipSizes } from '@/enums/Tooltip'
import { Colors } from '@/types/styles/Colors'

const meta = {
  title: 'McTooltip',
  component: McTooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: Object.values(TooltipPositions) },
    size: { control: 'select', options: Object.values(TooltipSizes) },
    color: { control: 'select', options: Object.keys(Colors) },
    textColor: { control: 'select', options: Object.keys(Colors) },
    arrowVisible: { control: 'boolean' }
  },
  args: {
    placement: TooltipPositions.Top,
    size: TooltipSizes.S,
    color: 'black',
    textColor: 'white',
    arrowVisible: true,
    content: 'Boost your channel growth!',
    default: 'McPay Advance'
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McTooltip>
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};