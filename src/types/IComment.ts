import { Weights } from '@/enums'
import { ColorTypes } from '@/types/styles/Colors'

export interface IComment {
  id: number | string
  content: string
  created_at: string
  user?: {
    full_name?: string
    avatar?: string
    profile?: {
      avatar?: string
    }
  }
  moderator?: {
    avatar?: string
  }
  status?: {
    title: string
    color: string
  } | null
  statusText?: string
  editing_title?: string
  message?: string
  editable?: boolean
}

export interface ICommentTitle {
  name: string
  weight: Weights
  color: ColorTypes
}