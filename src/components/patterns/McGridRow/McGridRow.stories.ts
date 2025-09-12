import type { Meta, StoryObj } from '@storybook/vue3'
import McGridRow from './McGridRow.vue'
import McGridCol from '@/components/patterns/McGridCol/McGridCol.vue'

const meta = {
    title: 'McGridRow',
    component: McGridRow,
    tags: ['autodocs'],
    argTypes: {},
    args: {
        gutterX: 20,
    },
    parameters: {
        componentSubtitle: 'Status: Ready',
        design: {
            type: 'figma',
            url: '',
        },
    },
} satisfies Meta<typeof McGridRow>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return {
      components: { McGridRow, McGridCol },
      template: `
                <mc-grid-row :gutter-y="16" :gutter-x="12">
                    <mc-grid-col span="12" span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6"><div style="background: #f1c40f">6</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6"><div style="background: #f1c40f">6</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6"><div style="background: #f1c40f">6</div></mc-grid-col>
                </mc-grid-row>
            `
    }
  }
}
export const NestedGrid: Story = {
    render() {
        return {
            components: { McGridRow, McGridCol },
            template: `
                <mc-grid-row :gutter-x="30" :gutter-y="10">
                    <mc-grid-col span="12" span-m="1"><div style="background: #e74c3c">1</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="2"><div style="background: #1abc9c">2</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="3"><div style="background: #9b59b6">3</div></mc-grid-col>
                    <mc-grid-col span="12" span-m="6">
                        <mc-grid-row :gutter-x="5">
                            <mc-grid-col span="3"><div style="background: violet; color: white;">3</div></mc-grid-col>
                            <mc-grid-col span="3"><div style="background: blue; color: white;">3</div></mc-grid-col>
                            <mc-grid-col span="6"><div style="background: blueviolet; color: white;">6</div></mc-grid-col>
                        </mc-grid-row>
                    </mc-grid-col>
                </mc-grid-row>
            `
        }
    },
};

export const AutoSize: Story = {
    render() {
        return {
            components: { McGridRow, McGridCol },
            template: `
                <mc-grid-row :gutter-x="30" :gutter-y="10" justify="center" align="middle">
                    <mc-grid-col><div style="background: #e74c3c">Auto Size</div></mc-grid-col>
                    <mc-grid-col><div style="background: #f1c40f">Auto Size middle</div></mc-grid-col>
                    <mc-grid-col><div style="background: cornflowerblue">Auto Size large content</div></mc-grid-col>
                </mc-grid-row>
            `
        }
    },
};