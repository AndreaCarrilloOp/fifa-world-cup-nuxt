import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    matches: defineCollection({
      type: 'data',
      source: 'matches.csv',
      schema: z.object({
        match_id: z.string(),
        edition_year: z.number(),
        tournament_name: z.string(),
        stage: z.string(),
        group: z.string(),
        date: z.string(),
        time: z.string(),
        stadium: z.string(),
        city: z.string(),
        host_country: z.string(),
        home_team: z.string(),
        home_code: z.string(),
        away_team: z.string(),
        away_code: z.string(),
        home_score: z.number(),
        away_score: z.number(),
        extra_time: z.number(),
        penalty_shootout: z.number(),
        home_penalties: z.number(),
        away_penalties: z.number()
      })
    })
  }
})
