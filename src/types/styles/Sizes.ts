import sizes from '../../assets/tokens/json/sizes.json'
export const Sizes = sizes['$token-icon-sizes']

const modes = { ...sizes['$token-icon-sizes'] } as const
export type SizeTypes = keyof typeof modes
export type SizesUnion = (typeof Sizes)[keyof typeof Sizes]
