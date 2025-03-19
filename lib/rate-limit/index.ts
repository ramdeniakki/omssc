export interface RateLimitConfig {
  max: number;
  timeWindow: number;
}


const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  identifier: string,
  { max, timeWindow }: RateLimitConfig
): { success: boolean; limit: number; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || record.resetTime < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + timeWindow,
    })

    return {
      success: true,
      limit: max,
      remaining: max - 1,
      resetTime: now + timeWindow,
    }
  }


  if (record.count >= max) {
    return {
      success: false,
      limit: max,
      remaining: 0,
      resetTime: record.resetTime,
    }
  }

  record.count += 1
  rateLimitStore.set(identifier, record)

  return {
    success: true,
    limit: max,
    remaining: max - record.count,
    resetTime: record.resetTime,
  }
}

export function getTimeRemaining(resetTime: number): string {
  const secondsRemaining = Math.ceil((resetTime - Date.now()) / 1000)

  if (secondsRemaining < 60) {
    return `${secondsRemaining} second${secondsRemaining !== 1 ? 's' : ''}`
  }

  const minutesRemaining = Math.ceil(secondsRemaining / 60)

  if (minutesRemaining < 60) {
    return `${minutesRemaining} minute${minutesRemaining !== 1 ? 's' : ''}`
  }

  const hoursRemaining = Math.ceil(minutesRemaining / 60)
  return `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`
}
