export const PlatformId = {
  'Indeed': 1,
  'La bonne alternance': 2,
  'Welcome to the jungle': 3,
} as const

export type PlatformId = (typeof PlatformId)[keyof typeof PlatformId]

function isPlatformId(value: any): value is PlatformId {
  return Object.values(PlatformId).includes(value as PlatformId)
}
export function getPlatformName(job: any): string {
  if (isPlatformId(job.platformId)) {
    const platformId = job.platformId as PlatformId
    const platformName = Object.keys(PlatformId).find(
      (key) => PlatformId[key as keyof typeof PlatformId] === platformId
    )
    return platformName || 'Unknown platform'
  } else {
    return 'Unknown platform'
  }
}
