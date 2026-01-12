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
import icons from '../../../../assets/iconsSprite.svg?raw'

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
          cardId: null,
          checkboxes: true,
          zzz: [ 112268, 112903, 715043 ],
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
        },
        miniTableCols() {
          return [
            { header: 'Канал', field: 'channel', width: 248, total: 424 },
            { header: 'Пользователь', field: 'user', minWidth: 200, sortable: true },
            { header: 'Просмотров', field: 'views_count', width: 130, align: 'right', sortable: true },
            { header: 'Пользователь', field: 'user', minWidth: 200, sortable: true },
            { header: 'Просмотров', field: 'views_count', width: 130, align: 'right', sortable: true },
          ]
        },
        miniTableData() {
          return [{
            id: 112268,
            youtube_id: "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
            youtube_url: "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw",
            title: "PewDiePie",
            image:
              "https://yt3.ggpht.com/a/AGF-l79FVckie4j9WT-4cEW6iu3gPd4GivQf_XNSWg=s800-mo-c-c0xffffffff-rj-k-no",
            image_small:
              "https://yt3.ggpht.com/a/AGF-l79FVckie4j9WT-4cEW6iu3gPd4GivQf_XNSWg=s800-mo-c-c0xffffffff-rj-k-no",
            image_medium:
              "https://yt3.ggpht.com/a/AGF-l79FVckie4j9WT-4cEW6iu3gPd4GivQf_XNSWg=s800-mo-c-c0xffffffff-rj-k-no",
            published_at: "2010-04-29T10:54:00+03:00",
            country_id: 87,
            country: {
              id: 87,
              youtube_id: "US",
              code: "US",
              name: "United States",
              order: null,
              flag: "https://www.countryflags.io/us/flat/64.png",
              created_at: "2017-09-27T14:52:00+03:00",
              updated_at: "2019-01-10T00:00:06+03:00",
            },
            language_id: 12,
            language: {
              id: 12,
              youtube_id: "en",
              name: "English",
              created_at: "2018-09-14T13:47:16+03:00",
              updated_at: "2018-09-14T13:47:16+03:00",
            },
            social_networks: [
              {
                id: 742,
                network: "instagram",
                link: "https://www.instagram.com/pewdiepie/",
                full_link: "https://www.instagram.com/pewdiepie/",
                icon: "https://cdn.worldvectorlogo.com/logos/instagram-2-1.svg",
                created_at: "2018-02-23T22:44:55+03:00",
                updated_at: "2018-02-23T22:44:55+03:00",
              },
              {
                id: 743,
                network: "twitter",
                link: "https://twitter.com/pewdiepie",
                full_link: "https://twitter.com/pewdiepie",
                icon: "https://cdn.worldvectorlogo.com/logos/twitter-3.svg",
                created_at: "2018-02-23T22:44:55+03:00",
                updated_at: "2019-04-19T13:31:28+03:00",
              },
              {
                id: 36705,
                network: "email",
                link: "kat@re6l.com",
                full_link: "mailto:kat@re6l.com",
                icon: "https://cdn.worldvectorlogo.com/logos/gmail-icon.svg",
                created_at: "2018-08-07T11:59:48+03:00",
                updated_at: "2019-04-19T13:31:28+03:00",
              },
              {
                id: 493319,
                network: "instagram",
                link: "https://instagram.com/pewdiepie",
                full_link: "https://instagram.com/pewdiepie",
                icon: "https://cdn.worldvectorlogo.com/logos/instagram-2-1.svg",
                created_at: "2018-08-30T12:46:51+03:00",
                updated_at: "2019-04-19T13:31:28+03:00",
              },
            ],
            categories: [
              {
                id: 8,
                title: "Gaming",
                youtube_id: "20",
                created_at: "2017-09-27T14:52:00+03:00",
                updated_at: "2017-09-27T14:52:00+03:00",
              },
              {
                id: 10,
                title: "People & Blogs",
                youtube_id: "22",
                created_at: "2017-09-27T14:52:00+03:00",
                updated_at: "2017-09-27T14:52:00+03:00",
              },
              {
                id: 11,
                title: "Comedy",
                youtube_id: "23",
                created_at: "2017-09-27T14:52:00+03:00",
                updated_at: "2017-09-27T14:52:00+03:00",
              },
              {
                id: 12,
                title: "Entertainment",
                youtube_id: "24",
                created_at: "2017-09-27T14:52:00+03:00",
                updated_at: "2017-09-27T14:52:00+03:00",
              },
            ],
            latest_contact_statuses: [
              {
                id: 30325,
                type: "marketing",
                value: 104,
                title: "Цены получены",
                user_id: 574,
                by_user_id: null,
                created_at: "2019-04-19T13:03:40+03:00",
                updated_at: "2019-04-19T13:03:40+03:00",
              },
              {
                id: 35663,
                type: "support",
                value: null,
                title: null,
                user_id: null,
                by_user_id: null,
                created_at: "2019-01-23T10:04:07+03:00",
                updated_at: "2019-01-23T10:04:07+03:00",
              },
              {
                id: 66,
                type: "recruiting",
                value: null,
                title: null,
                user_id: null,
                by_user_id: null,
                created_at: "2019-01-23T10:03:53+03:00",
                updated_at: "2019-01-23T10:03:53+03:00",
              },
            ],
            owner_id: 443,
            agency_channels: [
              {
                id: 5160,
                agency_id: 3,
                channel_id: 112268,
                type: 0,
                sum: 1,
                percent: 0,
                total: 1,
                created_at: "2018-12-07T11:56:46+03:00",
                updated_at: "2018-12-07T11:56:46+03:00",
              },
            ],
            has_contacts: true,
            daily_dimension_stats_status: 0,
            demographic_stats_status: 0,
            views_count: 22103013928,
            comments_count: 0,
            subscribers_count: 97352854,
            videos_count: 3888,
            average_views_per_video: 5684931.57,
            hot_rate: 0,
            hot_at: "2017-10-10T22:34:21+03:00",
            gender: 0,
            in_data_labs_stats: {
              avg_comments: 53201.4285714286,
              avg_likes: 485851.0171428571,
              engagement_rate: 0.56807814,
              total_posts: 3864,
              percent_sponsored: 0,
              view_per_post: 6178640.302857143,
              dislike_per_post: 9577.0514285714,
              total_view_count: 21782781401,
              comments_count: 9310250,
              likes_count: 85023928,
              dislikes_count: 1675984,
              possible_sensitive: false,
              engagement_rate_median: 0.46203724,
              likes_median: 407623,
              views_median: 5689107,
              comments_median: 38608,
              dislikes_median: 6178,
            },
            created_at: "2017-10-10T22:34:21+03:00",
            updated_at: "2019-07-10T13:28:29+03:00",
          },]
        },
        icons() {
          return icons
        },
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
        },
        handleCloseCard() {
          this.cardId = null
        }
      },
      template: `
        <div style="height: 500px; display: flex">
          <div v-html="icons" style="width: 0; height: 0"></div>
          <mc-table 
            :data="data" 
            :columns="columns"
            :sort="sort"
            fixed-last-column 
            :totals="totals"
            :header-row-height="55"
            height="280px"
            :with-checkboxes="checkboxes"
            :selected-rows="zzz"
            @sort="handleSort"
            @loading="handleLoading"
            @row-click="handleRowClick"
            @update:selected-rows="zzz = $event"
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
                    <mc-button variation="purple-link" tooltip="Close" @click="handleCloseCard">
                      <template #icon-prepend>
                        <mc-svg-icon name="arrow_leftward" />
                      </template>
                    </mc-button>
                    <div>Card id - {{ cardId }}</div>
                  </mc-table-card-header>
                </template>
                Card Content
                
                <mc-table :data="miniTableData" :columns="miniTableCols" height="120px"></mc-table>
                
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
