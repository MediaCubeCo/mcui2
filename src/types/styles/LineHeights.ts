import lineHeights from '../../assets/tokens/json/line-heights.json'
export const LineHeights = lineHeights['$token-line-heights']

const modes = { ...lineHeights['$token-line-heights'] } as const
export type LineHeightTypes = keyof typeof modes
