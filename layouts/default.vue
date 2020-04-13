<template>
  <div>
    <navigation></navigation>
    <nuxt />
  </div>
</template>

<script>
import Navigation from '~/components/Navigation.vue'


export default {
  components: {
    Navigation
  },
  head () {
    return {
      title: 'jack eden',
    }
  }
}
</script>