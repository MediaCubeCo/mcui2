import type { Meta, StoryObj } from '@storybook/vue3'
import McBottomLoader from './McBottomLoader.vue'

const meta = {
  title: 'McBottomLoader',
  component: McBottomLoader,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2'
    }
  }
} satisfies Meta<typeof McBottomLoader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      components: {
        McBottomLoader
      },
      template: `
            <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dignissimos fugit incidunt nostrum quia ratione suscipit unde? A animi asperiores, assumenda fuga impedit ipsam minus molestiae nemo quis veniam, voluptatem!
                <mc-bottom-loader />
            </div>
            `
    }
  }
}
