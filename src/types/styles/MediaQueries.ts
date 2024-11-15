import mediaQueries from '../../assets/tokens/json/media-queries.json'
export const MediaQueries = mediaQueries['$token-media-queries']

const modes = { ...mediaQueries['$token-media-queries'] } as const
export type MediaQueryTypes = keyof typeof modes
