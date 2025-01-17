// guest/[user]/[celebration].get.ts
import { getIsComingGuest } from '~~/supabase'

export default defineEventHandler(
  async (
    event,
  ): Promise<
    boolean | null | { statusCode: number, body: { error: string } }
  > => {
    // Extraire l'ID de l'URL
    const userId = getRouterParam(event, 'user')
    const celebrationId = getRouterParam(event, 'celebration')

    if (!userId || !celebrationId) {
      return {
        statusCode: 400,
        body: { error: 'User ID and celebration ID are required' },
      }
    }

    try {
      const isComing = await getIsComingGuest(userId, celebrationId)

      if (isComing === null) {
        return {
          statusCode: 404,
          body: { error: 'Guest response not found' },
        }
      }

      return isComing
    }
    catch (error) {
      console.error(error)
      return {
        statusCode: 500,
        body: { error: 'Failed to fetch isComing Guest' },
      }
    }
  },
)
