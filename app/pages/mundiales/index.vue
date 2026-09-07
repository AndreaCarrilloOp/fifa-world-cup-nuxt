<script setup>
useHead({ title: 'Ediciones' })

const { data: matches } = await useAsyncData('editions-matches', () => {
  return queryCollection('matches').order('edition_year', 'ASC').all()
})

const editions = computed(() => {
  const list = []

  for (const match of matches.value || []) {
    const found = list.find(item => item.year === match.edition_year)

    if (found) {
      found.matches++
    } else {
      list.push({
        year: match.edition_year,
        name: match.tournament_name,
        matches: 1
      })
    }
  }

  return list.reverse()
})
</script>

<template>
  <div class="container page">
    <AppBreadcrumbs :items="[{ label: 'Inicio', to: '/' }, { label: 'Ediciones' }]" />

    <header class="page-header">
      <p class="eyebrow">NAVEGACIÓN POR EDICIÓN</p>
      <h1>Ediciones de la Copa Mundial</h1>
      <p>Selecciona un torneo para explorar sus rondas y partidos.</p>
    </header>

    <div class="edition-grid">
      <EditionCard
        v-for="edition in editions"
        :key="edition.year"
        :edition="edition"
      />
    </div>
  </div>
</template>
