import { TitleSizes } from '@/enums/Title'
export const adaptivePropsParams = ['variation', 'weight']
export const adaptivePropsSizes = Object.values(TitleSizes)

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