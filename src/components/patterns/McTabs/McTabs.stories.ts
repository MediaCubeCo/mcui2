import type { Meta, StoryObj } from '@storybook/vue3'
import McTabs from '@/components/patterns/McTabs/McTabs.vue'
import McTab from '@/components/patterns/McTab/McTab.vue'
import { TabVariations } from '@/enums/Tab'
import { Colors } from '@/types/styles/Colors'
import sprite from '@/assets/iconsSprite.svg?raw'

const meta = {
    title: 'McTabs',
    component: McTabs,
    tags: ['autodocs'],
    argTypes: {
        tabVariation: { control: 'select', options: Object.keys(TabVariations) },
        color: { control: 'select', options: Object.keys(Colors) },
        accentColor: { control: 'select', options: Object.keys(Colors) },
        uppercase: { control: 'boolean' },
        loading: { control: 'boolean' },
        sticky: { control: 'boolean' },
    },
    args: {
        uppercase: false,
        loading: false,
        sticky: false,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McTabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: {
                McTabs,
                McTab,
            },
            data() {
                return {
                    v: null,
                }
            },
            computed: {
                iconsSprite() {
                    return sprite
                }
            },
            methods: {
                handleChange(payload) {},
            },
            template: `
                <div v-html="iconsSprite"></div>
            <mc-tabs v-model="v" color="black" accent-color="purple" tab-variation="caption" @tab-changed="handleChange">
                <mc-tab id="custom" name="Custom fragment">Custom fragment content</mc-tab>
                <mc-tab 
                    name="With icon prep" 
                    icon-prepend="close" 
                    icon-prepend-color="red"
                >
                    With icon prepend.
                </mc-tab>
                <mc-tab 
                    name="With icon app" 
                    icon-append="link_external_new" 
                    icon-append-color="purple"
                >
                    With icon append.
                </mc-tab>
                <mc-tab
                    name="Href link"
                    icon-append-classes="las la-external-link-alt"
                    href="https://ya.ru"
                >
                    Href link
                </mc-tab>
                <mc-tab
                    name="with counter"
                    :append-count="5"
                    append-count-color="purple"
                >
                    with counter
                </mc-tab>
                <mc-tab
                    name="Router link" 
                    icon-append-classes="las la-external-link-alt" 
                    :to="{name: 'test', params: { id: 123 }}"
                >
                    Сработает только при наличии router = useRouter()
                </mc-tab>
                <mc-tab prefix="<<< " suffix=" >>>" name="With prefix and suffix">
                    With prefix and suffix
                </mc-tab>
                <mc-tab name="Disabled" is-disabled>Disabled content</mc-tab>
            </mc-tabs>
            `
        }
    },
};