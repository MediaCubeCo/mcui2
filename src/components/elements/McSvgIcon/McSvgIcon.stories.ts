import type { Meta, StoryObj } from '@storybook/vue3'
import McSvgIcon from '@/components/elements/McSvgIcon/McSvgIcon.vue'
import McTitle from '@/components/elements/McTitle/McTitle.vue'
import McFieldText from '@/components/elements/McFieldText/McFieldText.vue'
import McSeparator from '@/components/elements/McSeparator/McSeparator.vue'
import { Colors } from '@/types/styles/Colors'
import { Sizes } from '@/types/styles/Sizes'
import { Directions } from '@/enums/ui/Directions'
import iconsList from '@/mocks/icons.json'

const iconsArrayList = Object.keys(iconsList)

const meta = {
  title: 'McSvgIcon',
  component: McSvgIcon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: iconsArrayList },
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
    name: 'bank_card'
  }
}
export const FullList: Story = {
  render() {
    return {
      components: {
        McSvgIcon,
        McTitle,
        McFieldText,
          McSeparator,
      },
      data: () => ({
        search: null
      }),
      computed: {
        iconsSections() {
          const iconsObject = {
            colored: [],
            blue: [],
            arrows: [],
            flags: [],
            checks: [],
            mediacube: [],
            other: []
          }
          iconsArrayList.forEach((icon) => {
            switch (true) {
              case icon.includes('_colored'):
                return iconsObject.colored.push(icon)
              case icon.includes('_blue'):
                return iconsObject.blue.push(icon)
              case icon.includes('arrow'):
                return iconsObject.arrows.push(icon)
              case icon.includes('flag'):
                return iconsObject.flags.push(icon)
              case icon.includes('check'):
                return iconsObject.checks.push(icon)
              case icon.includes('mc'):
              case icon.includes('mediacube'):
                return iconsObject.mediacube.push(icon)
              default:
                return iconsObject.other.push(icon)
            }
          })
          const defaultSections = Object.keys(iconsObject).map((key) => ({
            title: key.replace(/^./, key[0].toUpperCase()),
            icons: iconsObject[key],
            id: key
          }))

          return this.search
            ? [
                {
                  title: 'Search results',
                  icons: iconsArrayList.filter((icon) => icon.includes(this.search))
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
                        <mc-separator indent-bottom="400" indent-top="400" />
                        <template v-if="section.icons.length">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, 160px); gap: 16px">
                                <div
                                    v-for="icon in section.icons"
                                    :key="icon"
                                    style="display: flex; flex-direction: column; align-items: center; justify-content: center"
                                >
                                    <mc-svg-icon :name="icon" size="400" />
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
