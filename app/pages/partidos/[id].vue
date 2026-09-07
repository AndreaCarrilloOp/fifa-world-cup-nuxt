<script setup>
const route = useRoute()
const matchId = String(route.params.id)

const { data: match } = await useAsyncData(`match-${matchId}`, () => {
  return queryCollection('matches')
    .where('match_id', '=', matchId)
    .first()
})

if (!match.value) {
  throw createError({ statusCode: 404, statusMessage: 'Partido no encontrado' })
}

useHead({
  title: `${match.value.home_team} vs ${match.value.away_team} - ${match.value.edition_year}`
})
</script>

<template>
  <div class="container page match-detail-page">
    <AppBreadcrumbs :items="[
      { label: 'Inicio', to: '/' },
      { label: 'Partidos', to: '/partidos' },
      { label: `${match.home_team} vs ${match.away_team}` }
    ]" />

    <p class="back-link detail-back-link">
      <NuxtLink to="/partidos">← Volver a partidos</NuxtLink>
    </p>

    <article class="match-detail">
      <header class="match-detail-header">
        <p class="eyebrow">{{ match.edition_year }} · {{ match.stage }}</p>
        <h1>{{ match.home_team }} vs {{ match.away_team }}</h1>

        <div class="detail-score" aria-label="Marcador final">
          <div class="detail-team">
            <strong>{{ match.home_team }}</strong>
            <span>{{ match.home_code }}</span>
          </div>

          <strong class="detail-score-value">{{ match.home_score }}–{{ match.away_score }}</strong>

          <div class="detail-team detail-team-away">
            <strong>{{ match.away_team }}</strong>
            <span>{{ match.away_code }}</span>
          </div>
        </div>

        <p v-if="match.penalty_shootout === 1" class="detail-penalties">
          Penales: {{ match.home_team }} {{ match.home_penalties }}–{{ match.away_penalties }} {{ match.away_team }}
        </p>
      </header>

      <section class="detail-section" aria-labelledby="match-information-title">
        <h2 id="match-information-title">Información del partido</h2>

        <dl class="detail-list">
          <div v-if="match.group !== 'No aplica'">
            <dt>Grupo</dt>
            <dd>{{ match.group }}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd><time :datetime="match.date">{{ match.date }}</time></dd>
          </div>
          <div>
            <dt>Hora</dt>
            <dd>{{ match.time }}</dd>
          </div>
          <div>
            <dt>Estadio</dt>
            <dd>{{ match.stadium }}</dd>
          </div>
          <div>
            <dt>Ciudad</dt>
            <dd>{{ match.city }}</dd>
          </div>
          <div>
            <dt>País anfitrión</dt>
            <dd>{{ match.host_country }}</dd>
          </div>
          <div v-if="match.extra_time === 1">
            <dt>Tiempo extra</dt>
            <dd>Sí</dd>
          </div>
        </dl>
      </section>
    </article>
  </div>
</template>
