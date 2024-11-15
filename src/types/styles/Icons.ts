import iconsList from '@/mocks/icons.json'

const icons = { ...iconsList } as const
export type IconsListUnion = keyof typeof icons
