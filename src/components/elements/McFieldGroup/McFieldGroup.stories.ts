import type { Meta, StoryObj } from '@storybook/vue3'
import McFieldGroup from './McFieldGroup.vue'
import McGridRow from '../../patterns/McGridRow/McGridRow.vue'
import McGridCol from '../../patterns/McGridCol/McGridCol.vue'
import McFieldText from '../McFieldText/McFieldText.vue'
import McFieldSelect from '../McFieldSelect/McFieldSelect.vue'
import McDatepicker from '../McDatepicker/McDatepicker.vue'

const meta = {
    title: 'McFieldGroup',
    component: McFieldGroup,
    tags: ['autodocs'],
    argTypes: {},
    args: {},
    parameters: {
        componentSubtitle: 'Status: Ready (Wrapper for input fields for balance title height)',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McFieldGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render() {
        return {
            components: {
                McFieldGroup,
                McGridRow,
                McGridCol,
                McFieldText,
                McFieldSelect,
                McDatepicker,
            },
            data() {
                return {
                    v: 0.5,
                }
            },
            template: `
                <mc-field-group>
                    <mc-grid-row :gutter-y="16" :gutter-x="16">
                        <mc-grid-col span="4">
                            <mc-field-text name="" title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad architecto enim eos et eum explicabo illo officiis porro provident quaerat sint vel, voluptatibus." />
                        </mc-grid-col>
                        <mc-grid-col span="4">
                            <mc-field-select name="" title="Animi" :errors="['With some error']" />
                        </mc-grid-col>
                        <mc-grid-col span="4">
                            <mc-datepicker name="" title="soluta vero vitae voluptatem voluptatibus! soluta vero vitae voluptatem voluptatibus!" />
                        </mc-grid-col>
                        <mc-grid-col span="4">
                            <mc-datepicker name="" title="soluta vero vitae voluptatem voluptatibus! soluta vero vitae voluptatem voluptatibus!" />
                        </mc-grid-col>
                        <mc-grid-col span="4">
                            <mc-datepicker name="" title="soluta vero vitae voluptatem voluptatibus! soluta vero vitae voluptatem voluptatibus voluptatibus! soluta voluptatibus! soluta vero vitae voluptatem voluptatibus!" />
                        </mc-grid-col>
                        <mc-grid-col span="4">
                            <mc-datepicker name="" title="soluta vero vitae voluptatem voluptatibus! soluta vero vitae voluptatem voluptatibus!" />
                        </mc-grid-col>
                    </mc-grid-row>
                </mc-field-group>
            `
        }
    },
};