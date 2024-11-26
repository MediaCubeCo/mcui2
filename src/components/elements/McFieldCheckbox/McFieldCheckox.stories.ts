import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldCheckbox from './McFieldCheckbox.vue'
import { Sizes } from '@/types/styles/Sizes'
import { Directions } from '@/enums/ui/Directions'

const meta = {
  title: 'McFieldCheckbox',
  component: McFieldCheckbox,
  tags: ['autodocs'],
  argTypes: {
    helpText: { control: 'text' },
    name: { control: 'text' },
    checkedValue: { control: 'text' },
    unCheckedValue: { control: 'text' },
    mainText: { control: 'text' },
    title: { control: 'text' },
    modelValue: { control: 'none' },
    errors: { control: 'none' },
    disabled: { control: 'boolean' },
    multiple: { control: 'boolean' },
    tabindex: { control: 'number' },
    checkboxSize: { control: 'select', options: Object.keys(Sizes) },
    dir: { control: 'select', options: Object.values(Directions) }
  },
  args: {
    name: 'McCheckbox name',
    helpText: 'Help text',
    mainText: 'McFieldCheckbox',
    checkedValue: 'true',
    uncheckedValue: false,
    title: 'McFieldCheckbox title',
    disabled: false,
    multiple: false,
    tabindex: 0,
    dir: Directions.Ltr
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2'
    }
  }
} satisfies Meta<typeof McFieldCheckbox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const DirectionRtl: Story = {
  args: {
    dir: 'rtl',
    mainText: 'Checkbox rtl orientation'
  }
}
export const CustomCheckedValue: Story = {
  render() {
    return {
      components: { McFieldCheckbox },
      data() {
        return {
          v: null,
          checkedValue: 'McCheckbox'
        }
      },
      template: `
                checkedValue - {{ checkedValue }}
                <br />
                <br />
                <mc-field-checkbox v-model="v" :checked-value="checkedValue">McFieldCheckbox</mc-field-checkbox>
                <br />
                Output: {{ v }}
            `
    }
  }
}
export const MultipleValue: Story = {
  render() {
    return {
      components: { McFieldCheckbox },
      data() {
        return {
          v: []
        }
      },
      template: `
                <mc-field-checkbox v-model="v" multiple :checked-value="1">McFieldCheckbox {1}</mc-field-checkbox>
                <mc-field-checkbox v-model="v" multiple checked-value="McCheckbox">McFieldCheckbox {McCheckbox}</mc-field-checkbox>
                <mc-field-checkbox v-model="v" multiple :checked-value="3">McFieldCheckbox {3}</mc-field-checkbox>
                <br />
                Output: {{ v }}
            `
    }
  }
}
