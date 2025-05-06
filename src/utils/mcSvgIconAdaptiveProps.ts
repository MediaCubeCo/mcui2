import { MediaQueries } from '@/enums/ui/MediaQueries'
export const adaptivePropsParams = ['size']
export const adaptivePropsSizes = Object.values(MediaQueries)

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