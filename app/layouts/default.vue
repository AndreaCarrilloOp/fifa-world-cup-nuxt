<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container header-content">
        <NuxtLink to="/" class="brand" aria-label="FIFA World Cup - Inicio">
          <svg class="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="9.25" />
            <path class="brand-ball-center" d="M12 6.7 15.25 9.05 14 12.85h-4L8.75 9.05 12 6.7Z" />
            <path d="m8.75 9.05-3.1-1.05M15.25 9.05l3.1-1.05" />
            <path d="M10 12.85 8.2 16M14 12.85l1.8 3.15" />
            <path d="m8.2 16-1.55 1.6M15.8 16l1.55 1.6" />
            <path d="M6.65 17.6 12 20.95l5.35-3.35" />
          </svg>
          <span>FIFA World Cup</span>
        </NuxtLink>

        <nav class="main-nav" aria-label="Navegación principal">
          <NuxtLink to="/">Inicio</NuxtLink>
          <NuxtLink to="/mundiales">Ediciones</NuxtLink>
          <NuxtLink to="/partidos">Partidos</NuxtLink>
        </nav>
      </div>
    </header>

    <main><slot /></main>

    <footer class="site-footer">
      <div class="container footer-content">
        <p>Proyecto académico · Nuxt + Nuxt Content</p>

        <div class="footer-meta">
          <p>
            Datos adaptados de
            <a
              href="https://github.com/jfjelstul/worldcup"
              target="_blank"
              rel="noopener noreferrer"
            >The Fjelstul World Cup Database</a>
            · © 2023 Joshua C. Fjelstul, Ph.D. ·
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/legalcode"
              target="_blank"
              rel="noopener noreferrer"
            >CC BY-SA 4.0</a>
          </p>

          <a
            href="https://github.com/AndreaCarrilloOp"
            target="_blank"
            rel="noopener noreferrer"
            class="github-link"
            aria-label="GitHub de AndreaCarrilloOp"
            title="GitHub"
          >
            <svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
