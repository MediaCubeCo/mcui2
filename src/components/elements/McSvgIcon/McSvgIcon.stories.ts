import type { Meta, StoryObj } from '@storybook/vue3'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McFieldText from '@/components/elements/McFieldText/McFieldText.vue'
import McSeparator from '@/components/elements/McSeparator/McSeparator.vue'
import { Colors } from '@/types/styles/Colors'
import { Sizes } from '@/types/styles/Sizes'
import { Directions } from '@/enums/ui/Directions'
import { SPRITE_IDS } from '@/consts/iconsSpriteIds.js'
import allIconsList from '@/mocks/icons.json'
import flagsIconsList from '@/mocks/icons_flags.json'
import gradIconsList from '@/mocks/icons_grad.json'

const allIconsArrayList = Object.keys(allIconsList)
const flagsIconsArrayList = Object.keys(flagsIconsList)
const gradsIconsArrayList = Object.keys(gradIconsList)

const meta = {
  title: 'McSvgIcon',
  component: McSvgIcon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: allIconsArrayList },
    color: { control: 'select', options: Object.keys(Colors) },
    size: { control: 'select', options: Object.keys(Sizes) },
    weight: { control: 'number' },
    dir: { control: 'select', options: Directions },
    spritePath: { control: 'none' }
  },
  args: {
    color: 'purple',
    size: '400',
    weight: 1.5,
    dir: Directions.Ltr
  },
  parameters: {
    componentSubtitle: 'Status: Ready',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LXNkU1vlAYmydEiC0l0gDa/MC-Design-System?node-id=1%3A2'
    }
  }
} satisfies Meta<typeof McSvgIcon>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'alert_solid'
  }
}
export const FullList: Story = {
  render() {
    return {
      components: {
        McSvgIcon,
        McTitle,
        McFieldText,
        McSeparator
      },
      data: () => ({
        search: null
      }),
      computed: {
        iconsSections() {
          const iconsObject = {
            gradiented: {
              sprite_id: SPRITE_IDS.GRADS,
              icons: gradsIconsArrayList
            },
            flags: {
              sprite_id: SPRITE_IDS.FLAGS,
              icons: flagsIconsArrayList
            },
            colored: {
              sprite_id: SPRITE_IDS.MAIN,
              icons: []
            },
            blue: {
              sprite_id: SPRITE_IDS.MAIN,
              icons: []
            },
            arrows: {
              sprite_id: SPRITE_IDS.MAIN,
              icons: []
            },
            checks: {
              sprite_id: SPRITE_IDS.MAIN,
              icons: []
            },
            mediacube: {
              sprite_id: SPRITE_IDS.MAIN,
              icons: []
            },
            other: {
              sprite_id: SPRITE_IDS.MAIN,
              icons: []
            }
          }
          const other_icons = allIconsArrayList.filter(
            (icon) => !flagsIconsArrayList.includes(icon) && !gradsIconsArrayList.includes(icon)
          )
          for (const icon of other_icons) {
            switch (true) {
              case icon.includes('_colored'):
                iconsObject.colored.icons.push(icon)
                break
              case icon.includes('_blue'):
                iconsObject.blue.icons.push(icon)
                break
              case icon.includes('arrow'):
                iconsObject.arrows.icons.push(icon)
                break
              case icon.includes('check'):
                iconsObject.checks.icons.push(icon)
                break
              case icon.includes('mc'):
              case icon.includes('mediacube'):
                iconsObject.mediacube.icons.push(icon)
                break
              default:
                iconsObject.other.icons.push(icon)
                break
            }
          }
          const defaultSections = Object.entries(iconsObject).map(([key, value]) => ({
            title: key.replace(/^./, key[0].toUpperCase()),
            icons: value.icons,
            sprite_id: value.sprite_id,
            id: key
          }))
          return this.search
            ? [
                {
                  title: 'Search results',
                  icons: allIconsArrayList.filter((icon) => icon.includes(this.search))
                }
              ]
            : defaultSections
        }
      },
      template: `
                <section>
                    <mc-field-text v-model="search" name="search" title="Search" placeholder="Start typing to search..." />
                    <div v-for="section in iconsSections" :key="section.id" :id="section.id">
                        <mc-separator indent-bottom="400" indent-top="400" />
                        <mc-title variation="h3">
                            {{ section.title }}
                        </mc-title>
                      <br />
                      <small>sprite id: {{ section.sprite_id }}</small>
                        <mc-separator indent-bottom="400" indent-top="400" />
                        <template v-if="section.icons.length">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, 160px); gap: 16px">
                                <div
                                    v-for="icon in section.icons"
                                    :key="icon"
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                                >
                                    <mc-svg-icon :name="icon" :sprite-id="section.sprite_id" size="400" />
                                    <mc-title text-align="center" class="mt-150">{{ icon }}</mc-title>
                                </div>
                            </div>
                        </template>
                        <div v-else style="width: 100%; height: 300px; display: flex; align-items: center; justify-content: center; flex-direction: column">
                            <mc-svg-icon name="info" color="gray" size="800" />
                            <mc-title text-align="center" color="gray" variation="h3">No results</mc-title>
                        </div>
                    </div>
                </section>
            `
    }
  }
}
