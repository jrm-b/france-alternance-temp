export const WatchedJobsStatus = {
  watching: 1,
  waitingReply: 2,
  meetingPlanned: 3,
  neverAnswered: 4,
  denied: 5,
  accepted: 6,
} as const

export type WatchedJobsStatus = (typeof WatchedJobsStatus)[keyof typeof WatchedJobsStatus]
