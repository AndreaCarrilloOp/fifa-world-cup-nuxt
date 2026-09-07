<script setup>
useHead({ title: 'Inicio' })
</script>

<template>
  <div>
    <section class="hero">
      <div class="container hero-content">
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
      </div>
    </section>

    <section class="container information-section">
      <p class="eyebrow">ORGANIZACIÓN DE LA INFORMACIÓN</p>
      <h2>Una jerarquía simple para explorar los datos</h2>

      <div class="information-steps four-steps">
        <article>
          <span class="step-number">01</span>
          <h3>Ediciones</h3>
          <p>Explora los torneos cronológicamente.</p>
        </article>
        <article>
          <span class="step-number">02</span>
          <h3>Rondas</h3>
          <p>Recorre cada edición por la etapa del torneo.</p>
        </article>
        <article>
          <span class="step-number">03</span>
          <h3>Partidos</h3>
          <p>Consulta los encuentros registrados en cada ronda.</p>
        </article>
        <article>
          <span class="step-number">04</span>
          <h3>Detalle</h3>
          <p>Revisa marcador, fecha y sede de cada partido.</p>
        </article>
      </div>
    </section>

    <section class="container explore-section">
      <div class="explore-copy">
        <p class="eyebrow">EXPLORAR LOS DATOS</p>
        <h2>Consulta todos los partidos</h2>
        <p>Busca equipos, filtra por edición o ronda y navega los resultados mediante paginación.</p>
      </div>
      <NuxtLink to="/partidos" class="button">Explorar partidos</NuxtLink>
    </section>
  </div>
</template>
