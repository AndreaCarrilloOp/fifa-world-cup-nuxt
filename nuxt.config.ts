import { existsSync, readFileSync } from 'node:fs'

// Las colecciones data no crean rutas automáticas: las páginas dinámicas se
// enumeran para asegurar su generación estática al publicar en Netlify.
const dataFile = 'content/matches.csv'
const lines = existsSync(dataFile) ? readFileSync(dataFile, 'utf8').trim().split(/\r?\n/).slice(1) : []
const records = lines.map(line => {
  const parts = line.split(',') // Estas dos columnas no contienen comas.
  return { id: parts[0], year: Number(parts[1]) }
}).filter(row => /^M-\d{4}-\d{2,3}$/.test(row.id) && Number.isInteger(row.year))
const years = [...new Set(records.map(record => record.year))]
const routes = [
  '/', '/ediciones', '/partidos',
  ...years.map(year => `/ediciones/${year}`),
  ...records.map(record => `/partidos/${record.id}`)
]

export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/site.css'],
  app: { head: {
    titleTemplate: '%s · FIFA World Cup',
    meta: [{ name: 'description', content: 'Explorador histórico de los partidos de la Copa Mundial de la FIFA' }]
  } },
  nitro: { prerender: { routes, crawlLinks: true } }
})
