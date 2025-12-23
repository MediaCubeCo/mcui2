import type { Meta, StoryObj } from '@storybook/vue3'
import McDatepicker from './McDatepicker.vue'
import { dayjs } from '@/utils/dayjs'
import { Colors } from '@/types/styles/Colors'
import { DatepickerTypes } from '@/enums/Datepicker'

const meta = {
    title: 'McDatepicker',
    component: McDatepicker,
    tags: ['autodocs'],
    argTypes: {
        range: { control: 'boolean' },
        toIsoFormat: { control: 'boolean' },
        editable: { control: 'boolean' },
        disabled: { control: 'boolean' },
        inline: { control: 'boolean' },
        useTimezone: { control: 'boolean' },
        clearable: { control: 'boolean' },
        loading: { control: 'boolean' },
        setDefaultToday: { control: 'boolean' },
        title: { control: 'text' },
        name: { control: 'text' },
        helpText: { control: 'text' },
        placeholder: { control: 'text' },
        modelValue: { control: 'none' },
        lang: { control: 'select', options: { en: 'en', es: 'es', ar: 'ar' } },
        type: { control: 'select', options: DatepickerTypes }
    },
    args: {
        range: false,
        toIsoFormat: false,
        editable: true,
        disabled: false,
        inline: false,
        useTimezone: false,
        clearable: false,
        loading: false,
        setDefaultToday: false,
        title: 'McDatepicker',
        helpText: 'Just pick date',
        placeholder: 'Pick date',
        lang: 'en',
        name: 'datepicker',
        placeholders: {},
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=0%3A1',
        },
        documentation: 'https://vue3datepicker.com/installation/',
    },
} satisfies Meta<typeof McDatepicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};
export const Disabled: Story = {
    args: {
        disabled: true
    }
};
export const TimePicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="time-picker" name="TimePicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="date-picker" name="DatePicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePickerError: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker
                      v-model="v"
                      placeholder="Select date"
                      :errors="['Error text']"
                      help-text="Help text - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloribus itaque omnis quasi quidem reprehenderit sed. Aliquid beatae deserunt eligendi in officiis! Aliquam consectetur distinctio expedita omnis optio quam recusandae."
                      type="date-picker"
                      name="DatePicker"
                      :set-default-today="false"
                    />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePickerISO: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="date-picker" to-iso-format name="DatePickerISO"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePickerTimezone: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div>
                    <mc-datepicker v-model="v" type="date-picker" use-timezone timezone="America/Toronto" name="DatePickerTimezone"></mc-datepicker>
                    <p>
                        Timezone - "America/Toronto" <br />
                        Output: {{ v }}
                    </p>
                </div>
            `
        }
    }
};
export const DateTimePicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="date-time-picker" name="DateTimePicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const WeekPicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="week-picker" name="MonthPicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const MonthPicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="month-picker" name="MonthPicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const YearPicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="year-picker" name="YearPicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const InlinePicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" inline name="InlinePicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const WithMarkerPicker: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
                markers: [
                  {
                      date: dayjs().add(3, 'day').toDate(),
                      type: 'line',
                      color: Colors.purple,
                      tooltip: [
                          { text: 'First tooltip', color: Colors.red },
                          { text: 'Second tooltip', color: Colors.azure },
                      ],
                  },
                    {
                        date: dayjs().add(2, 'day').toDate(),
                        type: 'dot',
                        color: Colors.green,
                        tooltip: [
                            { text: 'First tooltip', color: Colors.blue },
                            { text: 'Second tooltip', color: Colors.black },
                        ],
                    }
                ],
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" :markers="markers" name="WithMarkerPicker"></mc-datepicker>
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};

/**
 * Ranges below
 * */

export const TimePickerRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="time-picker" range name="TimePickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePickerRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="date-picker" range name="DatePickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePickerISORange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="date-picker" to-iso-format range name="DatePickerISORange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePickerTimezoneRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div>
                    <mc-datepicker v-model="v" type="date-picker" use-timezone timezone="America/Toronto" range name="DatePickerTimezoneRange" />
                    <p>
                        Timezone - "America/Toronto" <br />
                        Output: {{ v }}
                    </p>
                </div>
            `
        }
    }
};
export const DateTimePickerRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="date-time-picker" range name="DateTimePickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const WeekPickerRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="week-picker" range name="WeekPickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const MonthPickerRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="month-picker" range name="MonthPickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const YearPickerRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" type="year-picker" range name="YearPickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const InlinePickerRange: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v" range inline name="InlinePickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};
export const DatePickerRangePresets: Story = {
    render() {
        return {
            components: { McDatepicker },
            data: () => ({
                v: null,
            }),
            template: `
                <div> 
                    <mc-datepicker v-model="v"  type="date-picker" range name="DatePickerRange" />
                    <p>Output: {{ v }}</p>
                </div>
            `
        }
    }
};