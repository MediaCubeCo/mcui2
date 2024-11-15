import durations from '../../assets/tokens/json/durations.json'
export const Durations = durations['$token-durations']

const DurationsObj = { ...durations['$token-durations'] } as const
export type DurationsTypes = keyof typeof DurationsObj
export type DurationsTypesUnion = (typeof DurationsObj)[keyof typeof Durations]
