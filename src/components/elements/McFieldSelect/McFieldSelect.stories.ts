import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldSelect from './McFieldSelect.vue'
import selectOptions from '@/mocks/selectOptions.json'
import { Directions } from '@/enums/ui/Directions'
import iconsList from '@/mocks/icons.json'
import { Colors } from '@/types/styles/Colors'
import { SelectListDirections } from '@/enums/Select'
const iconsArrayList = Object.keys(iconsList)

const meta = {
    title: 'McFieldSelect',
    component: McFieldSelect,
    tags: ['autodocs'],
    argTypes: {
      modelValue: { control: 'none' },
      title: { control: 'text' },
      searchable: { control: 'boolean' },
      multiple: { control: 'boolean' },
      hideSelected: { control: 'boolean' },
      allowEmpty: { control: 'boolean' },
      disabled: { control: 'boolean' },
      taggable: { control: 'boolean' },
      internalSearch: { control: 'boolean' },
      loading: { control: 'boolean' },
      optionsTooltip: { control: 'boolean' },
      showLabels: { control: 'boolean' },
      renderAbsoluteList: { control: 'boolean' },
      required: { control: 'boolean' },
      optionWithPreview: { control: 'boolean' },
      dir: { control: 'select', options: Directions },
      icon: { control: 'select', options: iconsArrayList },
      openDirection: { control: 'select', options: SelectListDirections },
      avatar: { control: 'text' },
      locale: { control: 'text' },
      noResultsText: { control: 'text' },
      maxHeight: { control: 'text' },
      tabindex: { control: 'number' },
      backgroundColor: { control: 'select', options: Object.keys(Colors) },
    },
    args: {
      title: 'McPay benefits',
      searchable: true,
      multiple: false,
      hideSelected: true,
      allowEmpty: true,
      disabled: false,
      taggable: false,
      internalSearch: true,
      loading: false,
      optionsTooltip: false,
      showLabels: false,
      renderAbsoluteList: false,
      required: false,
      groupSelect: false,
      optionWithPreview: false,
      dir: Directions.Ltr,
      avatar: '',
      locale: 'en',
      tabindex: 0,
      noResultsText: 'No results for now',
      maxHeight: '',
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=19%3A280',
        },
    },
} satisfies Meta<typeof McFieldSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: selectOptions,
    name: 'McFieldSelectDefault',
    titleField: 'title',
    valueField: 'id',
    placeholder: 'Select McPay feature',
    errors: ['Error'],
    helpText: 'Help text'
  }
}
export const Single: Story = {
    render() {
      return {
        data() {
          return {
            v: null,
            titleField: 'title',
            valueField: 'id',
            options: selectOptions
          }
        },
        components: { McFieldSelect },
        template: `
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `
      }
    }
}
export const SingleWithIcon: Story = {
    render() {
      return {
        data() {
          return {
            v: 2,
            titleField: 'title',
            valueField: 'id',
            options: selectOptions
          }
        },
        components: { McFieldSelect },
        template: `
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            icon="mc_pay_app"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `
      }
    }
}
export const SingleWithPreview: Story = {
    render() {
      return {
        data() {
          return {
            v: 3,
            titleField: 'title',
            valueField: 'id',
            options: selectOptions
          }
        },
        components: { McFieldSelect },
        template: `
          <mc-field-select 
            v-model="v"
            name="McFieldSelect" 
            placeholder="Select McPay feature"
            :title-field="titleField"
            :value-field="valueField"
            option-with-preview
            :options="options"
          />
          <br />
          Output: {{ v }}
        `
      }
    }
}
export const Multiple: Story = {
    render() {
      return {
        data() {
          return {
            v: [],
            titleField: 'title',
            valueField: 'id',
            options: selectOptions
          }
        },
        components: { McFieldSelect },
        template: `
          <mc-field-select 
            v-model="v"
            placeholder="Select McPay benefits"
            multiple
            name="McFieldSelectMulti" 
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `
      }
    }
}
export const Taggable: Story = {
    render() {
      return {
        data() {
          return {
            v: [],
            titleField: 'title',
            valueField: 'id',
            options: selectOptions
          }
        },
        components: { McFieldSelect },
        template: `
          <mc-field-select
            v-model="v"
            placeholder="Select McPay benefits or add manually"
            taggable 
            multiple
            name="McFieldSelectTag"
            :title-field="titleField"
            :value-field="valueField" 
            :options="options"
          />
          <br />
          Output: {{ v }}
        `
      }
    }
}
export const Grouped: Story = {
    render() {
      return {
        data() {
          return {
            v: null,
            titleField: 'title',
            valueField: 'id',
            options: [
              {
                label: 'McPay benefits',
                values: selectOptions,
              },
            ]
          }
        },
        components: { McFieldSelect },
        template: `
          <mc-field-select 
            v-model="v"
            placeholder="Select McPay features from group"
            multiple
            name="McFieldSelectGrouped"
            :title-field="titleField"
            :value-field="valueField"
            :options="options"
          />
          <br />
          Output: {{ v }}
        `
      }
    }
}