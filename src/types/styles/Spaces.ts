import spaces from '../../assets/tokens/json/spacings.json'
export const Spaces = spaces['$token-spaces']

const modes = { ...spaces['$token-spaces'] } as const
export type SpaceTypes = keyof typeof modes
export type SpacesUnion = (typeof Spaces)[keyof typeof Spaces]
