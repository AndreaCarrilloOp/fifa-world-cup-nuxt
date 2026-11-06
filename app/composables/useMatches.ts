export const PAGE_SIZE = 12

export const normalizeSearch = (value: unknown) =>
  String(value ?? '').trim().toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

// Una consulta reutilizable a la colección data definida en content.config.ts.
export function useMatches() {
  return useAsyncData('world-cup-matches', () => queryCollection('matches').order('edition_year', 'DESC').all())
}

export function filterMatches(matches: any[], text: string, year: string, stage: string) {
  const query = normalizeSearch(text)
  return matches.filter(match => {
    if (year && String(match.edition_year) !== year) return false
    if (stage && match.stage !== stage) return false
    if (!query) return true
    return normalizeSearch([
      match.home_team, match.away_team, match.home_code, match.away_code,
      match.city, match.host_country, match.stadium, match.stage,
      match.edition_year, match.group, match.match_id
    ].join(' ')).includes(query)
  })
}
