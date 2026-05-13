import { Media } from '@/enums/ui/Media'
export const adaptivePropsParams = ['size']
export const adaptivePropsSizes = Object.values(Media)

interface ComponentPropType {
  type: StringConstructor,
}
const additionalProps: { [key: string]: ComponentPropType } = {}

adaptivePropsParams.forEach(value => {
  adaptivePropsSizes.forEach(size => {
    additionalProps[`${value}-${size}`] = { type: String }
  })
})
export const adaptiveAdditionalProps = additionalProps