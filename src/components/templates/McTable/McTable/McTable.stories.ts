import type { Meta, StoryObj } from '@storybook/vue3'
import McTable from '@/components/templates/McTable/McTable/McTable.vue'
import McPreview from '@/components/patterns/McPreview/McPreview.vue'
import McAvatar from '@/components/elements/McAvatar/McAvatar.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McChip from '@/components/elements/McChip/McChip.vue'
import McStack from '@/components/elements/McStack/McStack.vue'
import McBadge from '@/components/elements/McBadge/McBadge.vue'
import McFieldText from '@/components/elements/McFieldText/McFieldText.vue'
import McGridRow from '@/components/patterns/McGridRow/McGridRow.vue'
import McGridCol from '@/components/patterns/McGridCol/McGridCol.vue'
import McButton from '@/components/elements/McButton/McButton.vue'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McTooltip from '@/components/elements/McTooltip/McTooltip.vue'
import McTableCard from '../McTableCard/McTableCard.vue'
import McTableCardHeader from '../McTableCard/McTableCardHeader/McTableCardHeader.vue'
import { tableData, tableColumns, tableTotals } from '@/mocks/tableData'
import type { ITableColumn, ITableData, ITableSort, ITableTotals } from '@/types/ITable'

const meta = {
  title: 'McTable',
  component: McTable,
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
} satisfies Meta<typeof McTable>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render() {
    return {
      components: {
        McTable,
        McPreview,
        McAvatar,
        McTitle,
        McChip,
        McStack,
        McBadge,
        McFieldText,
        McGridRow,
        McGridCol,
        McButton,
        McSvgIcon,
        McTooltip,
        McTableCard,
        McTableCardHeader,
      },
      data() {
        return {
          sort: {
            sort_column: 'views_count',
            sort_direction: 'desc'
          },
          cardId: null
        }
      },
      computed: {
        columns(): ITableColumn[] {
          return tableColumns
        },
        data(): ITableData {
          return tableData
        },
        totals(): ITableTotals<ITableColumn> {
          return tableTotals
        }
      },
      methods: {
        handleLoading() {
          console.log('handleLoading')
        },
        handleSort(payload: ITableSort) {
          this.sort = payload
          console.log('handleSort')
        },
        handleBtnClick() {
          console.log('handleBtnClick')
        },
        handleRowClick(payload) {
          console.log(this.cardId = payload.id)
        }
      },
      template: `
        <div style="height: 500px; display: flex">
          <mc-table 
            :data="data" 
            :columns="columns"
            :sort="sort"
            fixed-last-column 
            :totals="totals"
            :header-row-height="55"
            @sort="handleSort"
            @loading="handleLoading"
            @row-click="handleRowClick"
          >
            <template #channel="{ column, cellValue, row }">
              <mc-preview>
                <template #left>
                  <mc-avatar rounded border-color="purple" dot-color="orange" :src="row.image_small" />
                </template>
                <template #top>
                  <mc-title ellipsis> {{ row.title }} </mc-title>
                </template>
                <template #bottom>
                  <mc-title color="gray" variation="overline"> {{ row.youtube_id }} </mc-title>
                </template>
              </mc-preview>
            </template>
            <template #channel-right>
              <mc-button size="xs-compact" variation="purple-link" tooltip="Edit">
                <mc-svg-icon name="edit" />
              </mc-button>
              <mc-button size="xs-compact" variation="purple-link" tooltip="Delete">
                <mc-svg-icon name="delete" />
              </mc-button>
            </template>
            <template #channel-header-right>
              <mc-svg-icon name="filter_list" color="purple" />
            </template>
            <template #user>
              <mc-title ellipsis>Почтальон Печкин Почтальонович</mc-title>
            </template>
            <template #user-right>
              <mc-button size="xs-compact" variation="purple-link" tooltip="Copy">
                <mc-svg-icon name="copy" />
              </mc-button>
            </template>
            <template #user-header-right>
              <mc-tooltip content="ФИО юзера">
                <mc-svg-icon name="info" color="gray" size="200" />
              </mc-tooltip>
            </template>
            <template #language="{ row }">
              <mc-chip variation="gray-invert" text-color="gray" size="s" counter="+1">
                {{ row.language.name }}
              </mc-chip>
            </template>
            <template #channels="{ row }">
              <mc-stack :visible-count="3" collapsed>
                <mc-avatar border-color="purple" rounded lazy size="300" :src="row.image_small" />
                <mc-avatar border-color="purple" rounded lazy size="300" :src="row.image_small" />
                <mc-avatar border-color="purple" rounded lazy size="300" :src="row.image_small" />
                <mc-avatar border-color="purple" rounded lazy size="300" :src="row.image_small" />
                <mc-avatar border-color="purple" rounded lazy size="300" :src="row.image_small" />
              </mc-stack>
            </template>
            <template #status>
              <mc-badge variation="red">Отклонен</mc-badge>
            </template>
            <template #owner="{ row }">
              <mc-field-text :name="row.id + ''" placeholder="Владелец" />
            </template>
            <template #action="{ row }">
              <mc-grid-row justify="right" :wrap="false" align="middle" :gutter-x="5">
                <mc-grid-col>
                  <mc-button size="xs" @click.stop="handleBtnClick">Да</mc-button>
                </mc-grid-col>
                <mc-grid-col>
                  <mc-button variation="red" size="xs" @click.stop="handleBtnClick">Нет</mc-button>
                </mc-grid-col>
              </mc-grid-row>
            </template>
            
            <!-- CARD -->
            <template #default="tableProps">
              <mc-table-card v-if="cardId" :id="cardId" v-bind="tableProps">
                <template #header>
                  <mc-table-card-header>
                    <div>Card id - {{ cardId }}</div>
                  </mc-table-card-header>
                </template>
                Card Content
                <template #footer>
                  Card Footer
                </template>
              </mc-table-card>
            </template>
          </mc-table>
        </div>
      `
    }
  }
}
