export const CategoryId = {
  'Développement web': 1,
} as const

export type CategoryId = (typeof CategoryId)[keyof typeof CategoryId]
