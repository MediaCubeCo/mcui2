import type { Meta, StoryObj } from '@storybook/vue3'
import McDrawerContentTemplate from '@/components/templates/McDrawer/McDrawerContentTemplate/McDrawerContentTemplate.vue'

const meta = {
  title: 'McDrawerContentTemplate',
  component: McDrawerContentTemplate,
  tags: ['autodocs'],
  argTypes: {
    titleEllipsis: { control: 'boolean' },
  },
  args: {
    titleEllipsis: true,
    title: 'Title - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam, architecto consequatur consequuntur, ' +
      'dolor est exercitationem harum ipsa mollitia nihil nostrum possimus quod quos rem, soluta. Ab cupiditate magni quibusdam!',
    default: 'Content - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam, architecto consequatur consequuntur, ' +
      'dolor est exercitationem harum ipsa mollitia nihil nostrum possimus quod quos rem, soluta. Ab cupiditate magni quibusdam!',
    footer: 'Footer - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam, architecto consequatur consequuntur, ' +
      'dolor est exercitationem harum ipsa mollitia nihil nostrum possimus quod quos rem, soluta. Ab cupiditate magni quibusdam!',
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: ''
    }
  }
} satisfies Meta<typeof McDrawerContentTemplate>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
