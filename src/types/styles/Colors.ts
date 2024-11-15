import colors from '../../assets/tokens/json/colors.json'
export const Colors = colors['$token-colors']

const modes = { ...colors['$token-colors'] } as const
export type ColorTypes = keyof typeof modes
export type ColorsUnion = (typeof Colors)[keyof typeof Colors]
