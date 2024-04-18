## Configuration de Tailwinds sur le container docker
docker exec artfolio-frontend-main npm install -D tailwindcss postcss autoprefixer
docker exec artfolio-frontend-main npx tailwindcss init -p

## Configuration de de vue-router sur le container docker
docker exec artfolio-frontend-backoffice npm install vue-router@4

## Ajout de headlessui
npm install @headlessui/vue@latest

## Ajout de auth0
npm install @auth0/auth0-vue


# frontend-backoffice

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

