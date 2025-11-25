import type { Meta, StoryObj } from '@storybook/vue3'
import McChat from './McChat.vue'
import McButton from '../../elements/McButton/McButton.vue'

const meta = {
    title: 'McChat',
    component: McChat,
    tags: ['autodocs'],
    argTypes: {},
    args: { },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McChat>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            data() {
                return {
                    v: null,
                    props: {
                        title: 'Example of chat',
                        emptyMessage: 'No one message in chat',
                        placeholder: 'Start messaging',
                        avatar: 'https://avatars.githubusercontent.com/u/63395408?s=400&u=5f3ae555700cfcacf278425bf37c1433c3ed43c1&v=4',
                        comments: [],
                        editable: true,
                        showInput: true,
                        defaultUserName: 'John Abvgd',
                        dateFormat: 'DD.MM.YYYY HH:mm',
                    }
                }
            },
            components: { McChat, McButton },
            methods: {
                handleAddNewMessage(v) {
                    this.props.comments.push(
                      {
                          message: v,
                          created_at: new Date().toISOString(),
                          user: {
                              full_name: 'Den Sad',
                              avatar: 'https://avatars.githubusercontent.com/u/63395408?s=400&u=5f3ae555700cfcacf278425bf37c1433c3ed43c1&v=4'
                          }
                      }
                  );
                }
            },
            template: `
            <div>
            <mc-chat v-bind="props" v-model="v" @submit="handleAddNewMessage" />
            </div>
            `,
        }
    }
};