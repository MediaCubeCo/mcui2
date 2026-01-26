<script setup lang="ts">
import { computed, type PropType, ref, watch } from 'vue'
import { default as MultiSelect } from 'vue-multiselect'
import { McTitle, McSvgIcon, McAvatar, McTooltip, McPreview, McChip } from '@/components'
import type { ISelectGroupOptions, ISelectOption, ISelectOptions } from '@/types/ISelect'
import { type DirectionsUnion } from '@/types/IDirections'
import { Directions } from '@/enums/ui/Directions'
import { type ColorTypes } from '@/types/styles/Colors'
import { useFieldErrors } from '@/composables'
import type { IconsListUnion } from '@/types/styles/Icons'
import { SelectGroupKeys, SelectListDirections } from '@/enums/Select'
import type { SelectListDirectionsUnion } from '@/types/ISelect'
import { PreviewSizes, TitleVariations, TooltipPositions, Weights, ChipSize } from '@/enums'
import { useTheme } from '@/composables/useTheme'

const emit = defineEmits<{
  (e: 'original-input', value: ISelectOptions[]): void
  (e: 'tag', value: string): void
  (e: 'search-change', value: string): void
  (e: 'update:modelValue', value: string[] | number[] | string | number | null): void
  (e: 'handle-open'): void
  (e: 'handle-close'): void
}>()
const props = defineProps({
  /**
   *  Значение
   */
  modelValue: {
    type: [Array, String, Number] as PropType<string[] | number[] | string | number | null>
  },
  /**
   *  Заголовок поля:
   *
   */
  title: {
    type: String as PropType<string>,
    default: null
  },

  /**
   *  Вспомогательный текст под инпутом:
   *
   */
  helpText: {
    type: String as PropType<string>,
    default: null
  },
  /**
   *  Массив элементов
   *  выпадающего списка
   *  [
   *      {
   *          name: String,
   *          value: String | Number,
   *          text: String - доступен, если optionWithPreview=true
   *          icon: String - доступен, если optionWithPreview=true
   *      }
   *  ]
   */
  options: {
    type: Array as PropType<ISelectOptions | ISelectGroupOptions>,
    default: () => [] as ISelectOptions
  },
  /**
   *  Выполняется ли поиск из списка
   *  при вводе в инпут
   */
  searchable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Множественный выбор
   */
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Скрывать из списка
   *  выбранные элементы
   */
  hideSelected: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Допустимо ли
   *  пустое значение
   */
  allowEmpty: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Отключенное состояние
   */
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Ссылка на аватар/картинку
   *  в начале label
   */
  avatar: {
    type: String as PropType<string>,
    default: null
  },
  /**
   *  Имя иконки
   *  в начале label
   */
  icon: {
    type: String as () => IconsListUnion,
    default: null
  },
  /**
   *  Цвет фона
   */
  backgroundColor: {
    type: String as () => ColorTypes,
    default: null
  },
  /**
   *  placeholder
   */
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  /**
   * Направление открытия списка:
   * `above (top), below (bottom), auto`
   */
  openDirection: {
    type: String as () => SelectListDirectionsUnion,
    default: 'auto'
  },
  /**
   * Селект в режиме тэгирования, когда можно вводить свои значения и добавлять их в опции
   * */
  taggable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Помечать в списке выбранные
   *  элементы
   */
  showLabels: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Поиск по опциям
   * */
  internalSearch: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  /**
   *  Ошибки
   */
  errors: {
    type: Array as PropType<string[]>,
    default: null
  },
  /**
   *  Name
   */
  name: {
    type: String as PropType<string>,
    required: true
  },
  /**
   *  Если нужен тултип
   *  над элементами списка
   */
  optionsTooltip: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * При группировке опций, дает возвожность выбрать сразу группу
   * */
  groupSelect: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   *  Если айтемам в селекте нужны превью с иконками и описанием
   */
  optionWithPreview: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  tabindex: {
    type: [String, Number],
    default: null
  },
  /**
   * Если нужно ограничить максимальную высоту блока с выбранными элементами
   */
  maxHeight: {
    type: String as PropType<string>,
    default: null
  },
  /**
   * Рендерить ли выпадающий список абсолютно, что бы помещался в ограниченном пространстве
   * */
  renderAbsoluteList: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  /**
   * Для какого языка селект
   */
  locale: {
    type: String as PropType<string>,
    default: null
  },
  /**
   * Текст для пустого селекта, когда неичего не найдено
   */
  noResultsText: {
    type: String as PropType<string>,
    default: 'No results'
  },
  /**
   * Показывать ли состояние лоадинга
   */
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  dir: {
    type: String as () => DirectionsUnion,
    default: Directions.Ltr
  },
  /**
   * На какое после смотреть что бы считать его заголовком строки
   * */
  titleField: {
    type: String as PropType<string>,
    default: 'name'
  },
  /**
   * На какое после смотреть что бы считать его значением строки
   * */
  valueField: {
    type: String as PropType<string>,
    default: 'value'
  }
})
const theme = useTheme('select')
const fieldErrors = useFieldErrors(props.errors)
const searchValue = ref<string | null>(null)
const field_select_ref = ref<InstanceType<typeof MultiSelect> | null>(null)
const field_select_wrapper_ref = ref<InstanceType<typeof HTMLDivElement> | null>(null)
const local_options = ref<ISelectOptions>([])
const closest_scroll_element = ref<HTMLElement>(document?.documentElement)
const scroll_resize_observer = ref<ResizeObserver>()
const field_key = ref(`field-${props.name}`)

const isGroupedOptions = computed((): boolean => {
  return props.options.some(
    (o) =>
      Object.prototype.hasOwnProperty.call(o, SelectGroupKeys.Label) &&
      Object.prototype.hasOwnProperty.call(o, SelectGroupKeys.Values) &&
      //@ts-ignore
      Array.isArray(o[SelectGroupKeys.Values])
  )
})
const hasTitle = computed(() => {
  return !!props.title
})
const hasPrepend = computed(() => {
  return props.avatar || props.icon
})
const isValueMustBeArray = computed(() => {
  return props.multiple
})

const tagBind = computed(() => {
  return {
    label: props.titleField,
    trackBy: props.valueField,
    loading: props.loading,
    options: computedOptions.value,
    searchable: props.searchable,
    showLabels: props.showLabels,
    multiple: props.multiple,
    hideSelected: props.hideSelected,
    allowEmpty: props.allowEmpty,
    openDirection: props.openDirection,
    id: props.name,
    taggable: props.taggable,
    tagPlaceholder: '',
    placeholder: props.placeholder,
    disabled: props.disabled,
    internalSearch: props.internalSearch,
    tabindex: +props.tabindex,
    groupSelect: props.groupSelect && props.multiple,
    appendToBody: props.renderAbsoluteList,
    ...(isGroupedOptions.value ? { groupLabel: SelectGroupKeys.Label } : {}),
    ...(isGroupedOptions.value ? { groupValues: SelectGroupKeys.Values } : {})
  }
})

const computedOptions = computed((): ISelectOptions => {
  //@ts-ignore
  return !isGroupedOptions.value
    ? ([...props.options, ...local_options.value].filter(
        //@ts-ignore
        (v, i, a) => a.findIndex((afi: ISelectOption) => afi[props.valueField] === v[props.valueField]) === i
      ) as ISelectOptions)
    : props.options
})
const rtl = computed((): boolean => {
  return props.dir === Directions.Rtl
})
const classes = computed((): { [key: string]: boolean } => {
  return {
    'mc-field-select': true,
    'mc-field-select--error': !!fieldErrors.errorText.value,
    'mc-field-select--disabled': props.disabled,
    [`mc-field-select--bg-${props.backgroundColor}`]: !!props.backgroundColor,
    'mc-field-select--is-empty-options-list': isEmptyOptionsList.value || props.loading,
    'mc-field-select--with-preview': props.optionWithPreview,
    'mc-field-select--max-height': !!props.maxHeight,
    'mc-field-select--rtl': rtl.value
  }
})
const computedTitle = computed(() => {
  return `${props.title}${props.required ? ' *' : ''}`
})
const styles = computed((): { [key: string]: string } => {
  const darkColors = ['gray', 'dark-gray', 'black']
  const lightColors = ['white']
  let placeHolderColor: ColorTypes = 'gray'
  let borderColor: ColorTypes = props.backgroundColor
  let backgroundColor: ColorTypes = props.backgroundColor
  let labelColor: ColorTypes = 'black'
  if (!props.backgroundColor || lightColors.includes(props.backgroundColor)) {
    borderColor = theme.component.color as ColorTypes
  }
  if (darkColors.includes(props.backgroundColor)) {
    labelColor = 'white'
    placeHolderColor = 'white'
    borderColor = 'black'
  }
  if (props.disabled && !props.backgroundColor) {
    backgroundColor = 'hover-gray'
  }
  return {
    '--mc-field-select-max-height': props.maxHeight,
    '--mc-field-select-bg-color': backgroundColor && theme.colors[backgroundColor],
    '--mc-field-select-color': theme.colors[theme.component.color as ColorTypes],
    '--mc-field-select-selected-color': theme.colors[theme.component.selected as ColorTypes],
    '--mc-field-select-border-color': borderColor && theme.colors[borderColor],
    '--mc-field-select-label-color': theme.colors[labelColor],
    '--mc-field-select-placeholder-color': theme.colors[placeHolderColor]
  }
})

const isEmptyOptionsList = computed((): boolean => {
  if ((props.hideSelected && !searchValue.value) || !props.options.length) {
    if (props.multiple) {
      if (isGroupedOptions.value) return false
      return Array.isArray(props.modelValue) && props.options.length === props.modelValue.length
    } else {
      return !!props.modelValue && computedOptions.value?.length === 1 && !searchValue.value
    }
  } else if (props.options.length === 0) return !props.options.length
  return false
})

const computedModelValue = computed({
  get() {
    let preparedValue: any = isValueMustBeArray.value ? props.modelValue || [] : [props.modelValue].filter(Boolean)
    preparedValue = preparedValue.map((pv: string): ISelectOption => {
      //@ts-ignore
      const options = isGroupedOptions.value
        ? computedOptions.value.map((co) => co[SelectGroupKeys.Values]).flat()
        : computedOptions.value
      const item = options.find((co) => String(co[props.valueField]) === String(pv))

      return {
        [props.titleField]: item?.[props.titleField],
        [props.valueField]: item?.[props.valueField],
        text: item?.text,
        icon: item?.icon,
        is_closable: item && (!Object.prototype.hasOwnProperty.call(item, 'is_closable') || item.is_closable)
      }
    })

    const [first] = preparedValue
    return isValueMustBeArray.value ? preparedValue : first
  },
  set(value) {
    let preparedValue = isValueMustBeArray.value ? (Array.isArray(value) ? value : []) : [value]
    preparedValue = preparedValue.filter(Boolean).map((v) => v[props.valueField])

    const [first] = preparedValue
    emitOriginalInput(value)
    emitInput(isValueMustBeArray.value ? preparedValue : first)
  }
})

const actualizeSavedOptions = (): void => {
  //Фильтруем локальные опции и оставляем только те, значения которых выбраны в селекте
  local_options.value = local_options.value.filter((lo: ISelectOption) =>
    props.modelValue?.constructor === Array
      ? props.modelValue.map((v) => String(v)).includes(String(lo[props.valueField]))
      : String(lo[props.valueField]) === String(props.modelValue)
  )

  //Делаем Юник, что бы опции не повторялись
  local_options.value = local_options.value.filter(
    (v, i, a) => a.findIndex((afi) => String(afi[props.valueField]) === String(v[props.valueField])) === i
  )
}

const findClosestScrollElement = (element: HTMLElement): HTMLElement => {
  if (!element) return document?.documentElement
  //@ts-ignore
  const { overflow, overflowY } = getComputedStyle(element as HTMLElement)
  const scrollableVariants = ['auto', 'scroll']
  return scrollableVariants.some((v) => [overflow, overflowY].includes(v))
    ? element
    : findClosestScrollElement(element.parentNode as HTMLElement)
}
const repositionDropDown = () => {
  const {
    top = 0,
    bottom = 0,
    height = 0,
    width = 0,
    left = 0
  } = field_select_wrapper_ref.value?.getBoundingClientRect() || {}
  const scrollElementRect = closest_scroll_element.value.getBoundingClientRect()
  const ref = field_select_ref.value
  if (!ref) return
  const ios_devices = ['iPhone', 'iPad']
  // Добавляем к позиции отступ visualViewport?.offsetTop, который добавляет iOs при открытии вирутальной клавиатуры
  const iosViewportIndent = ios_devices?.some((device) => navigator?.platform?.includes(device))
    ? window.visualViewport?.offsetTop || 0
    : 0
  // Высчитываем реальную позицию селекта относительно первого скроллящегося родителя
  const actualTop = top - scrollElementRect.top
  const actualBottom = bottom - scrollElementRect.bottom
  // if field hides under scrolled element borders -> blur select to prevent overlap
  if (actualTop >= -height && actualBottom < height) {
    //@ts-ignore
    const { list } = ref.$refs
    list.style.width = `${width}px`
    list.style.position = 'fixed'
    list.style.left = `${left}px`
    //@ts-ignore
    const title_height = document.querySelector('.mc-field-select__header')?.offsetHeight
    const title_margin = 8
    let openDir = props.openDirection
    //@ts-ignore
    if (openDir === SelectListDirections.Auto) openDir = ref?.isAbove ? 'top' : 'bottom'
    switch (openDir) {
      //@ts-ignore
      case 'top':
        list.style.top = `${
          top +
          (hasTitle.value ? title_height + title_margin : 0) +
          iosViewportIndent -
          list.getBoundingClientRect().height -
          8
        }px`
        list.style.bottom = 'auto'
        break
      //@ts-ignore
      case 'bottom':
        list.style.bottom = 'auto'
        list.style.top = `${top + iosViewportIndent + height}px`
        break
    }
    // Для андроидов не прячем селект при оверлапе, так как там работает все криво
    //  при открытии из нижней позиции клавиатура его перекрывает и он сразу сам закрывается
  } else if (!/Android/i.test(navigator.userAgent)) {
    // прячем селект, если его не видно юзеру
    return ref.deactivate()
  }
}

const initScroll = () => {
  // looking for closest scroll elemen to track select list position dynamically
  //@ts-ignore
  closest_scroll_element.value = findClosestScrollElement(field_select_ref.value.$el)
  closest_scroll_element.value.addEventListener('scroll', repositionDropDown)
  scroll_resize_observer.value = new ResizeObserver(repositionDropDown)
  scroll_resize_observer.value.observe(closest_scroll_element.value)
}

const handleTag = (value: string): void => {
  const preparedValue = { [props.titleField]: value, [props.valueField]: value }
  local_options.value.push(preparedValue)

  computedModelValue.value = isValueMustBeArray.value ? [...computedModelValue.value, preparedValue] : preparedValue
  /**
   * Событие по добавлению
   * тега в опции (по Enter)
   */
  emit('tag', value)
}

const handleSearchChange = (value: string): void => {
  searchValue.value = value
  /**
   * Событие по вводу данных в инпут
   */
  emit('search-change', value)
}

const emitInput = (value: number[] | string[] | number | string): void => {
  fieldErrors.toggleErrorVisible()
  /**
   * Событие инпута (выбранное значение)
   */
  emit('update:modelValue', value)
}
const emitOriginalInput = (value: ISelectOptions[]): void => {
  /**
   * Истинное значение инпута
   */
  emit('original-input', value)
}

const handleOpen = (): void => {
  emit('handle-open')
  props.renderAbsoluteList && initScroll()
}
const handleClose = (): void => {
  emit('handle-close')
}

watch(
  () => props.options,
  (val) => {
    //Пушим все входящие опции в локальные опции
    local_options.value.push(...val)
    actualizeSavedOptions()
  },
  { immediate: true }
)

watch(
  () => props.modelValue,
  () => {
    actualizeSavedOptions()
  },
  { immediate: true, deep: true }
)

watch(
  () => props.errors,
  (value: string[]): void => {
    fieldErrors.setError(value)
  }
)
</script>

<template>
  <div ref="field_select_wrapper_ref" :dir="dir" :class="classes" :style="styles">
    <div class="mc-field-select__header">
      <!-- @slot Слот заголовка -->
      <slot name="header">
        <mc-title v-if="hasTitle" max-width="100%" :weight="Weights.Medium">
          {{ computedTitle }}
        </mc-title>
      </slot>
    </div>
    <div class="mc-field-select__main">
      <multi-select
        ref="field_select_ref"
        v-model="computedModelValue"
        v-bind="tagBind"
        @tag="handleTag"
        @search-change="handleSearchChange"
        @open="handleOpen"
        @close="handleClose"
      >
        <template #singleLabel="{ option }">
          <mc-preview v-if="props.optionWithPreview" class="option__desc" :size="PreviewSizes.L">
            <template v-if="!!option.icon" #left>
              <mc-svg-icon :name="option.icon" size="400" />
            </template>
            <template #top>
              <mc-title :weight="Weights.SemiBold" :html-data="option[props.titleField]" />
            </template>
            <!-- Слот для замены стандартной стрелки при выведенном превью -->
            <template #right>
              <!-- @slot -->
              <slot name="arrow" />
            </template>
            <template v-if="!!option.text" #bottom>
              <mc-title color="gray">{{ option.text }}</mc-title>
            </template>
          </mc-preview>
          <div v-else class="mc-field-select__single-label">
            <div v-if="hasPrepend" class="mc-field-select__prepend">
              <mc-avatar v-if="avatar" :src="avatar" />
              <mc-svg-icon v-else :name="props.icon" />
            </div>
            <div
              class="mc-field-select__label-text"
              :class="hasPrepend ? 'mc-field-select__label-text--indent-left' : ''"
            >
              {{ option ? option[props.titleField] : placeholder }}
            </div>
          </div>
        </template>

        <template v-if="optionsTooltip || props.optionWithPreview" #option="{ option }">
          <mc-preview v-if="props.optionWithPreview" class="option__desc" :size="PreviewSizes.L">
            <template v-if="!!option.icon" #left>
              <mc-svg-icon :name="option.icon" size="400" />
            </template>
            <template #top>
              <mc-title :weight="Weights.SemiBold" :html-data="option[props.titleField]" />
            </template>
            <template v-if="!!option.text" #bottom>
              <mc-title color="gray">{{ option.text }}</mc-title>
            </template>
          </mc-preview>
          <mc-tooltip
            v-else
            class="mc-field-select__options-tooltip-target"
            max-width="m"
            color="black"
            :placement="TooltipPositions.Top"
            :content="option[props.titleField]"
          >
            <span>{{ option[props.titleField] }}</span>
          </mc-tooltip>
        </template>
        <template #noResult>
          <!-- @slot Слот для текста, если ничего не найдено -->
          <slot name="noResult">
            <span>{{ props.noResultsText }}</span>
          </slot>
        </template>

        <!-- multiselect selected tag -->
        <template #tag="multiselectTag">
          <mc-chip
            :size="ChipSize.Xs"
            class="multiselect__tag"
            variation="main-invert"
            :closable="!multiselectTag?.option?.hasOwnProperty('is_closable') || multiselectTag?.option?.is_closable"
            @close="multiselectTag.remove(multiselectTag.option)"
          >
            {{ multiselectTag.option[props.titleField] }}
            <template #button>
              <mc-svg-icon size="250" name="cancel" />
            </template>
          </mc-chip>
        </template>
      </multi-select>
    </div>
    <div v-if="fieldErrors.errorText.value || props.helpText || $slots.footer" class="mc-field-select__footer">
      <mc-title
        v-if="fieldErrors.errorText.value"
        tag-name="div"
        color="red"
        :variation="TitleVariations.Overline"
        max-width="100%"
      >
        {{ fieldErrors.errorText.value }}
      </mc-title>
      <br v-if="fieldErrors.errorText.value" />
      <!-- @slot Слот доп. текста под инпутом -->
      <slot name="footer">
        <mc-title
          v-if="props.helpText"
          tag-name="div"
          :variation="TitleVariations.Overline"
          color="gray"
          max-width="100%"
        >
          {{ props.helpText }}
        </mc-title>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@use 'vue-multiselect/dist/vue-multiselect.css' as *;
@use '../../../assets/styles/mixins' as *;
@use '../../../assets/tokens/durations' as *;
@use '../../../assets/tokens/font-families' as *;
@use '../../../assets/tokens/box-shadows' as *;
@use '../../../assets/tokens/colors' as *;
@use '../../../assets/tokens/spacings' as *;
@use '../../../assets/tokens/line-heights' as *;
@use '../../../assets/tokens/font-sizes' as *;
@use '../../../assets/tokens/sizes' as *;
@use '../../../assets/tokens/font-weights' as *;
@use '../../../assets/tokens/border-radius' as *;
@use '../../../assets/tokens/z-indexes' as *;
.mc-field-select {
  $block-name: &;
  --mc-field-select-bg-color: initial;
  --mc-field-select-label-color: #{$color-black};
  --mc-field-select-border-color: initial;
  --mc-field-select-max-height: initial;
  --mc-field-select-placeholder-color: #{$color-gray};
  font-family: $font-family-main;
  @include custom-scroll($space-100);
  &__header {
    @include reset-text-indents();
    display: block;
    margin-bottom: $space-100;

    &:empty {
      display: none;
    }
  }
  &__footer {
    margin-top: $space-50;
    line-height: $line-height-150;
    &:empty {
      display: none;
    }
  }
  &__single-label {
    @include reset-text-indents();
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    @include child-indent-right($space-50);
  }
  &__prepend {
    position: absolute;
  }
  &__label-text {
    @include ellipsis();
    font-size: $font-size-200;
    line-height: $line-height-200;
    padding-inline-start: $space-50;
    color: var(--mc-field-select-label-color);
    &--indent-left {
      margin-inline-start: $space-300;
    }
  }
  .multiselect {
    &__placeholder {
      @include ellipsis();
      color: var(--mc-field-select-placeholder-color);
      font-size: $font-size-200;
      line-height: $line-height-200;
      margin-bottom: calc(#{$space-150} - 1px);
      padding-top: calc(#{$space-150} - 1px);
      padding-inline-start: $space-50;
      width: 100%;
    }
    &__single {
      font-size: $font-size-200;
      line-height: $line-height-200;
      padding-inline-start: $space-50;
      margin-bottom: calc(#{$space-150} - 1px);
      margin-top: calc(#{$space-150} - 1px);
      background-color: transparent;
      min-height: auto;
      @include input-placeholder() {
        color: $color-gray;
      }
    }
    &__input {
      padding-inline-start: $space-50;
      margin-bottom: calc(#{$space-150} - 2px);
      padding-top: calc(#{$space-150} - 1px);
      font-size: $font-size-200;
      line-height: $line-height-200;
      min-height: auto;
      background-color: $color-transparent;
      @include input-placeholder() {
        color: $color-gray;
      }
    }
    &__select {
      overflow: hidden;
      height: $space-350;
      width: $space-300;
      inset-inline-end: $space-100;
      top: 6px;
      padding: 0;
      z-index: 1;
      &::before {
        direction: ltr;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-top: 5px solid var(--mc-field-select-label-color);
      }
    }
    &__tags {
      @include reset-text-indents();
      position: relative;
      border: 1px solid $color-outline-gray;
      border-radius: $radius-100 !important;
      padding: 0;
      padding-inline: $space-100 $space-500;
      overflow: hidden;
      text-align: start;
      &:hover {
        border-color: var(--mc-field-select-color);
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        @include size(100%);
        background-color: var(--mc-field-select-bg-color);
        opacity: 0.6;
      }
    }
    &__tags-wrap {
      position: relative;
      padding-top: 4px;
      padding-bottom: 3px;
      top: 0;
      display: flex;
      flex-wrap: wrap;
      margin-top: -1px;
      min-height: calc(#{$size-500} - 2px);
      @include child-indent-right($space-100);
    }
    &__tag {
      display: inline-flex;
      align-items: center;
      height: $size-300;
      font-family: $font-family-main;
      margin-top: $space-50;
      margin-bottom: $space-50;
      margin-right: unset;
      background-color: var(--mc-field-select-selected-color);
      padding: $size-50;
      border-radius: 100px;
      font-size: $font-size-200;
      line-height: $line-height-200;
      span {
        @include ellipsis();
        flex: 1 1 auto;
        //overflow: visible;
      }
      .mc-chip__button {
        opacity: 1;
        border-radius: 50%;
        background-color: $color-white;
        .mc-svg-icon {
          color: var(--mc-field-select-color);
        }
        &:hover {
          .mc-svg-icon {
            color: $color-red;
          }
        }
      }
    }
    &__tag-icon {
      @include size($size-200);
      position: relative;
      background-color: var(--mc-field-select-color);
      border-radius: $radius-circle;
      flex: 0 0 auto;
      margin-inline-start: $space-100;
      &:hover {
        background-color: $color-red;
      }
      &::after {
        @include align(true, true, absolute);
        top: 45%;
        color: $color-white;
      }
    }
    &__content {
      padding: $size-100;
      max-width: 100%;
      font-size: $font-size-200;
      line-height: $line-height-200;
    }
    &__content-wrapper {
      top: calc(100% + #{$size-100});
      border: none;
      border-radius: $radius-150;
      box-shadow: $shadow-s;
      transition: opacity $duration-s ease;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 300px;
      z-index: $z-index-toasted;
    }
    &--above {
      .multiselect__content-wrapper {
        bottom: calc(100% + #{$size-100});
        top: auto;
      }
    }
    &__option {
      min-height: $size-500;
      display: flex;
      align-items: center;
      border-radius: $radius-100;
      padding: $space-150;
      span {
        @include ellipsis();
      }
      &--highlight {
        background-color: $color-hover-gray;
        color: $color-black;
      }
      &--selected {
        background-color: var(--mc-field-select-selected-color) !important;
        color: $color-black !important;
        font-weight: $font-weight-medium;
      }
      &--group.multiselect__option--disabled {
        background-color: $color-white !important;
      }
    }

    &--active {
      .multiselect {
        &__tags {
          border-color: var(--mc-field-select-border-color);
          &:before {
            background-color: $color-transparent;
          }
        }
        &__select {
          &::before {
            border-color: var(--mc-field-select-color) $color-transparent $color-transparent;
          }
        }
      }
    }
    &__spinner {
      &:after,
      &:before {
        border-top-color: var(--mc-field-select-color);
        @include size($space-300);
        top: calc(50% - 8px);
        left: calc(50% - 3px);
      }
    }
  }

  &--error {
    .multiselect {
      &__tags {
        border-color: $color-red !important;
      }
    }
  }

  &--is-empty-options-list {
    .multiselect {
      &__content-wrapper {
        display: none !important;
      }
    }
  }

  &--disabled {
    cursor: not-allowed;
    .multiselect--disabled {
      opacity: 1;
      background: transparent;
      .multiselect {
        &__placeholder {
          color: $color-gray;
        }
        &__single {
          & #{$block-name}__label-text {
            color: $color-gray;
          }
        }
        &__select {
          background-color: transparent;
          &::before {
            border-color: $color-outline-gray transparent transparent;
          }
        }
      }
    }
  }

  &--with-preview {
    .mc-preview {
      align-items: center;
    }
    .multiselect {
      &__select {
        display: none;
      }
      &__tags {
        padding: 0;
        padding-inline: $space-100;
        cursor: pointer;
        border-color: $color-outline-light;
      }
    }
  }

  &--max-height {
    .multiselect {
      &__tags {
        max-height: var(--mc-field-select-max-height);
        overflow-y: auto;
        position: initial;
      }
      &__spinner {
        background: transparent;
        right: calc(#{$space-50} / 2);
        top: calc(#{$space-50} / 2);
      }
    }
  }

  &__options-tooltip-target {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--rtl {
    direction: rtl;
  }
}
</style>
