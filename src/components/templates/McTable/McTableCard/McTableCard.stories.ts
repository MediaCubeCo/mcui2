import type { Meta, StoryObj } from '@storybook/vue3'
import McTableCard from '@/components/templates/McTable/McTableCard/McTableCard.vue'
import McTableCardHeader from '@/components/templates/McTable/McTableCard/McTableCardHeader/McTableCardHeader.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'

const meta = {
  title: 'McTableCard',
  component: McTableCard,
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
} satisfies Meta<typeof McTableCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      components: {
        McTableCard,
        McTableCardHeader,
        McButton,
        McSvgIcon,
        McTitle
      },
      data() {
        return {}
      },
      computed: {},
      methods: {
        showChat() {
          console.log('showChat')
        }
      },
      template: `
        <div style="height: 500px">
          <mc-table-card :ml="ml" footer-blur>
            <template #header>
              <mc-table-card-header button-back-text="Back to list">
                <template #right>
                  <mc-button variation="purple-link" size="xs">
                    Add channel
                    <template #icon-append>
                      <mc-svg-icon name="add" />
                    </template>
                  </mc-button>
                  <mc-button variation="purple-link" size="xs">
                    Amount
                    <template #icon-append>
                      <mc-svg-icon name="edit_solid" />
                    </template>
                  </mc-button>
                  <mc-button variation="purple-link" size="xs" @click.prevent="showChat">
                    Chat
                    <template #icon-append>
                      <mc-svg-icon name="chat" />
                    </template>
                  </mc-button>
                </template>
              </mc-table-card-header>
            </template>
            <mc-title v-for="num in 3" class="mb-200" :key="num">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consectetur magnam possimus rerum!
              Cupiditate delectus dolor earum eos eum id inventore, itaque, labore molestiae nobis nulla odio perspiciatis
              quidem quisquam repudiandae sint temporibus veritatis. Distinctio illo iusto voluptas! Adipisci animi aut cum
              eius error esse ex hic impedit itaque labore laboriosam natus neque nisi odio porro qui quisquam repellat
              repellendus, saepe suscipit! At delectus deserunt dicta distinctio modi pariatur perspiciatis quos sed velit
              voluptates? Ab aliquam assumenda corporis dicta incidunt nihil obcaecati quibusdam quidem? Ad amet at consequuntur
              cupiditate dolorem, doloribus eaque eius, enim est eum eveniet ex facilis incidunt ipsum minima modi molestias
              mollitia, provident quae quam repellat reprehenderit sequi similique suscipit tenetur ullam vero voluptates!
              Dolore est excepturi laboriosam magnam, odit pariatur. Aliquid animi architecto autem consectetur corporis
              debitis distinctio dolor eius eum exercitationem explicabo id incidunt inventore libero maiores, modi mollitia
              nemo, nostrum numquam quis quod tempora ut veritatis?
            </mc-title>
            <template #footer>
              <mc-button>Apply</mc-button>
              <mc-button variation="red-invert">Block</mc-button>
              <mc-button disabled>Disabled button</mc-button>
            </template>
          </mc-table-card>
        </div>
      `
    }
  }
}
