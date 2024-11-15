import { ColumnSizes } from '@/enums/Grid'
export const adaptivePropsParams = ['span', 'order', 'offset', 'push', 'pull']
export const adaptivePropsSizes = Object.values(ColumnSizes)

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