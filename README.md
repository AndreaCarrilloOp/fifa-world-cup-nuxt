# FIFA World Cup Explorer

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Nuxt Content](https://img.shields.io/badge/Nuxt%20Content-CSV-00DC82)](https://content.nuxt.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white)](https://fifa-world-cup-nuxt.netlify.app)
[![Data License](https://img.shields.io/badge/Data%20License-CC%20BY--SA%204.0-lightgrey)](https://creativecommons.org/licenses/by-sa/4.0/)

Proyecto académico de **EIF 511 · Arquitectura de Información** para explorar los partidos de la Copa Mundial masculina de la FIFA entre **1930 y 2022** mediante una navegación clara y jerárquica.

**Sitio publicado:** https://fifa-world-cup-nuxt.netlify.app

## Vista previa

![Vista previa de FIFA World Cup Explorer](preview.png)

## Arquitectura de información

**Ediciones → Rondas → Partidos → Detalle**

- **Ediciones:** acceso a las 22 ediciones del torneo.
- **Ver edición:** búsqueda, filtro por ronda y paginación.
- **Partidos:** catálogo general con búsqueda, filtros y paginación.
- **Detalle:** marcador e información relevante del encuentro.

## Funcionalidades

- 964 partidos de 22 ediciones.
- Búsqueda y filtros contextuales.
- Paginación de 12 registros por página.
- Rutas dinámicas para ediciones y partidos.
- Diseño responsive, limpio y sin animaciones innecesarias.

## Tecnologías

- Nuxt 4
- Vue 3
- Nuxt Content
- CSV
- CSS propio

## Datos

Se utiliza una adaptación de `matches.csv` de **The Fjelstul World Cup Database**, creada por **Joshua C. Fjelstul, Ph.D.**

La adaptación conserva únicamente los partidos masculinos de 1930–2022 y los campos necesarios para la navegación y presentación.

- **Fuente:** https://github.com/jfjelstul/worldcup/blob/master/data-csv/matches.csv
- **Licencia de datos:** CC BY-SA 4.0
- **Copyright:** © 2023 Joshua C. Fjelstul, Ph.D.

## Ejecución local

```bash
npm install
npm run dev
```
