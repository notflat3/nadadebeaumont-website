<template>
  <div id="error" class="project">
    <div class="back">
    </div>
    <h1 v-if="error.statusCode === 404">Sorry, this page could not be found</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/">Please, return to home</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  head () {
    return {
      title: 'Prismic Nuxt.js Blog',
    }
  },
}
</script>