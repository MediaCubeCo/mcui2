import fontSizes from '../../assets/tokens/json/font-sizes.json'
export const FontSizes = fontSizes['$token-font-sizes']

const modes = { ...fontSizes['$token-font-sizes'] } as const
export type FontSizeTypes = keyof typeof modes
