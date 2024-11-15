import radiuses from '../../assets/tokens/json/border-radius.json'
export const Radiuses = radiuses['$token-radius']

const modes = { ...radiuses['$token-radius'] } as const
export type RadioTypes = keyof typeof modes
