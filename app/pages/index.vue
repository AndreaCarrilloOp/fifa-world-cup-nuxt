<script setup>
useHead({ title: 'Inicio' })

const search = ref('')

const { data: matches } = await useAsyncData('home-search-matches', () => {
  return queryCollection('matches').order('date', 'DESC').all()
})

const searchResults = computed(() => {
  const text = search.value.toLowerCase().trim()

  if (text === '') return []

  return (matches.value || []).filter(match => {
    return match.home_team.toLowerCase().includes(text) ||
      match.away_team.toLowerCase().includes(text) ||
      match.home_code.toLowerCase().includes(text) ||
      match.away_code.toLowerCase().includes(text)
  }).slice(0, 6)
})

const noResults = computed(() => {
  return search.value.trim() !== '' && searchResults.value.length === 0
})
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-content home-hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">FIFA WORLD CUP EXPLORER</p>
          <h1>Explora los partidos de la Copa Mundial</h1>
          <p class="hero-text">
            Navega por edición y ronda, consulta los partidos disputados y accede al detalle
            de cada encuentro registrado entre 1930 y 2022.
          </p>
          <div class="actions">
            <NuxtLink to="/mundiales" class="button">Explorar ediciones</NuxtLink>
            <NuxtLink to="/partidos" class="text-link">Ver todos los partidos →</NuxtLink>
          </div>
        </div>

        <section class="home-search" aria-labelledby="home-search-title">
          <p class="eyebrow">BÚSQUEDA</p>
          <h2 id="home-search-title">Encuentra partidos</h2>

          <label>
            <span>Equipo o país</span>
            <input
              v-model="search"
              type="search"
              placeholder="Ej.: Costa Rica, ARG, Brazil..."
            />
          </label>

         <div v-if="searchResults.length" class="home-search-results">
            <NuxtLink
              v-for="match in searchResults"
              :key="match.match_id"
              :to="`/partidos/${match.match_id}`"
              class="home-search-result"
            >
              <span>
                <small>{{ match.edition_year }} · {{ match.stage }}</small>
                <strong>{{ match.home_team }} vs {{ match.away_team }}</strong>
              </span>
              <b>{{ match.home_score }}–{{ match.away_score }}</b>
            </NuxtLink>
          </div>

          <p v-else-if="noResults" class="home-search-empty">
            No hay partidos para esa búsqueda.
          </p>

          <NuxtLink to="/partidos" class="home-search-all">Ver todos los partidos →</NuxtLink>
        </section>
      </div>
    </section>

    <section class="container information-section">
      <p class="eyebrow">CÓMO EXPLORAR</p>
      <h2>Explora el torneo en pocos pasos</h2>

      <div class="information-steps four-steps">
        <article>
          <span class="step-number">01</span>
          <h3>Ediciones</h3>
          <p>Elige un Mundial entre 1930 y 2022.</p>
        </article>
        <article>
          <span class="step-number">02</span>
          <h3>Rondas</h3>
          <p>Consulta los partidos de cada etapa.</p>
        </article>
        <article>
          <span class="step-number">03</span>
          <h3>Partidos</h3>
          <p>Busca y filtra todos los encuentros.</p>
        </article>
        <article>
          <span class="step-number">04</span>
          <h3>Detalle</h3>
          <p>Consulta marcador, fecha y sede.</p>
        </article>
      </div>
    </section>
  </div>
</template>
