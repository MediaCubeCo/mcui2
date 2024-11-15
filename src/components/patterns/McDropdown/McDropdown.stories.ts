import type { Meta, StoryObj } from '@storybook/vue3'
import selectOptions from '@/mocks/selectOptions.json'
import McDropdown from './McDropdown.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import { DropdownListPositions, DropdownPositions } from '@/enums'

const meta = {
    title: 'McDropdown',
    component: McDropdown,
    tags: ['autodocs'],
    argTypes: {
        modelValue: { control: 'none' },
        items: { control: 'array' },
        listPosition: { control: 'select', options: Object.values(DropdownListPositions) },
        position: { control: 'select', options: Object.values(DropdownPositions) },
        listMinWidth: { control: 'select' },
        hideOnSelect: { control: 'boolean' },
    },
    args: {
        items: [1, 2, 3],
        listPosition: DropdownListPositions.Bottom,
        position: DropdownPositions.Left,
        hideOnSelect: true,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
        },
    },
} satisfies Meta<typeof McDropdown>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            data() {
                return {
                    v: null,
                }
            },
            components: {
                McDropdown,
                McButton,
            },
            computed: {
                items() {
                    return selectOptions
                },
            },
            template: `
              <mc-dropdown :items="this.items" @select="v = $event">
                  <template #activator>
                      <mc-button>{{ v?.title || 'Select McPay service' }}</mc-button>
                  </template>
                  <template #item="{ item }">
                      <mc-button variation="purple-link">{{ item.title }}</mc-button>
                  </template>
              </mc-dropdown>
            `
        }
    },
};