import fontWeights from '../../assets/tokens/json/font-weights.json'
export const FontWeights = fontWeights['$token-font-weights']

const modes = { ...fontWeights['$token-font-weights'] } as const
export type FontWeightTypes = keyof typeof modes
export type FontWeightsUnion = (typeof FontWeights)[keyof typeof FontWeights]
