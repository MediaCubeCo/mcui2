import sizes from '../../assets/tokens/json/sizes.json'
export const AvatarSizes = sizes['$token-avatar-sizes']

const modes = { ...sizes['$token-avatar-sizes'] } as const
export type AvatarSizeTypes = keyof typeof modes
