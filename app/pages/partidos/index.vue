<script setup>
useHead({ title: 'Partidos' })

const search = ref('')
const selectedEdition = ref('')
const selectedStage = ref('')
const page = ref(1)
const pageSize = 12

const { data: matches } = await useAsyncData('all-matches', () => {
  return queryCollection('matches').order('date', 'ASC').all()
})

const editions = computed(() => {
  const list = []

  for (const match of matches.value || []) {
    if (!list.includes(match.edition_year)) list.push(match.edition_year)
  }

  return list.reverse()
})

const stages = computed(() => {
  const list = []

  for (const match of matches.value || []) {
    if (!list.includes(match.stage)) list.push(match.stage)
  }

  return list.sort()
})

const filteredMatches = computed(() => {
  const text = search.value.toLowerCase().trim()

  return (matches.value || []).filter(match => {
    const matchesSearch = text === '' ||
      match.home_team.toLowerCase().includes(text) ||
      match.away_team.toLowerCase().includes(text) ||
      match.home_code.toLowerCase().includes(text) ||
      match.away_code.toLowerCase().includes(text) ||
      match.tournament_name.toLowerCase().includes(text) ||
      match.stage.toLowerCase().includes(text) ||
      match.stadium.toLowerCase().includes(text) ||
      match.city.toLowerCase().includes(text)

    const matchesEdition = selectedEdition.value === '' ||
      match.edition_year === Number(selectedEdition.value)

    const matchesStage = selectedStage.value === '' ||
      match.stage === selectedStage.value

    return matchesSearch && matchesEdition && matchesStage
  })
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredMatches.value.length / pageSize))
})

const paginatedMatches = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredMatches.value.slice(start, start + pageSize)
})

const hasActiveFilters = computed(() => {
  return search.value.trim() !== '' ||
    selectedEdition.value !== '' ||
    selectedStage.value !== ''
})

function clearFilters() {
  search.value = ''
  selectedEdition.value = ''
  selectedStage.value = ''
  page.value = 1
}

watch(search, () => { page.value = 1 })
watch(selectedEdition, () => { page.value = 1 })
watch(selectedStage, () => { page.value = 1 })
</script>

<template>
  <div class="container page">
    <AppBreadcrumbs :items="[{ label: 'Inicio', to: '/' }, { label: 'Partidos' }]" />

    <header class="page-header">
      <p class="eyebrow">CATÁLOGO DE PARTIDOS</p>
      <h1>Partidos de la Copa Mundial</h1>
      <p>Busca equipos, filtra por edición o ronda y accede al detalle de cada encuentro.</p>
    </header>

    <section class="filters" aria-label="Búsqueda y filtros">
      <label class="search-field">
        <span>Buscar</span>
        <input
          v-model="search"
          type="search"
          placeholder="Ej.: Costa Rica, BRA, Lusail..."
        />
      </label>

      <label>
        <span>Edición</span>
        <select v-model="selectedEdition">
          <option value="">Todas</option>
          <option
            v-for="edition in editions"
            :key="edition"
            :value="edition"
          >
            {{ edition }}
          </option>
        </select>
      </label>

      <label>
        <span>Ronda</span>
        <select v-model="selectedStage">
          <option value="">Todas</option>
          <option
            v-for="stage in stages"
            :key="stage"
            :value="stage"
          >
            {{ stage }}
          </option>
        </select>
      </label>

      <button
        class="clear-filters"
        type="button"
        :disabled="!hasActiveFilters"
        @click="clearFilters"
      >
        Limpiar
      </button>
    </section>

    <div class="results-toolbar">
      <p class="result-count">
        <strong>{{ filteredMatches.length }}</strong> partidos encontrados
      </p>
      <p v-if="filteredMatches.length" class="page-count">
        Página {{ page }} de {{ totalPages }}
      </p>
    </div>

    <template v-if="paginatedMatches.length">
      <div class="desktop-match-table">
        <table class="match-table">
          <thead>
            <tr>
              <th scope="col">Edición</th>
              <th scope="col">Ronda</th>
              <th scope="col">Partido</th>
              <th scope="col">Marcador</th>
              <th scope="col">Fecha</th>
              <th scope="col"><span class="visually-hidden">Acción</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="match in paginatedMatches" :key="match.match_id">
              <td class="edition-cell">{{ match.edition_year }}</td>
              <td>{{ match.stage }}</td>
              <td class="match-name-cell">
                <strong>{{ match.home_team }} vs {{ match.away_team }}</strong>
                <span v-if="match.penalty_shootout === 1">
                  Penales {{ match.home_penalties }}–{{ match.away_penalties }}
                </span>
              </td>
              <td class="score-cell">{{ match.home_score }}–{{ match.away_score }}</td>
              <td><time :datetime="match.date">{{ match.date }}</time></td>
              <td class="action-cell">
                <NuxtLink :to="`/partidos/${match.match_id}`" class="match-link">Ver detalle →</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mobile-match-list">
        <article
          v-for="match in paginatedMatches"
          :key="match.match_id"
          class="match-list-item"
        >
          <p class="match-context">{{ match.edition_year }} · {{ match.stage }}</p>
          <div class="match-list-main">
            <h2>{{ match.home_team }} vs {{ match.away_team }}</h2>
            <strong class="match-list-score">{{ match.home_score }}–{{ match.away_score }}</strong>
          </div>
          <p class="match-list-meta">
            <time :datetime="match.date">{{ match.date }}</time>
            <span v-if="match.penalty_shootout === 1">
              · Penales {{ match.home_penalties }}–{{ match.away_penalties }}
            </span>
          </p>
          <NuxtLink :to="`/partidos/${match.match_id}`" class="match-link">Ver detalle →</NuxtLink>
        </article>
      </div>
    </template>

    <div v-else class="empty-state">
      <h2>No se encontraron partidos</h2>
      <p>Prueba con otro término o cambia los filtros aplicados.</p>
    </div>

    <nav v-if="filteredMatches.length" class="pagination" aria-label="Paginación">
      <button
        type="button"
        :disabled="page === 1"
        @click="page--"
      >
        ← Anterior
      </button>

      <span>Página {{ page }} de {{ totalPages }}</span>

      <button
        type="button"
        :disabled="page === totalPages"
        @click="page++"
      >
        Siguiente →
      </button>
    </nav>
  </div>
</template>
