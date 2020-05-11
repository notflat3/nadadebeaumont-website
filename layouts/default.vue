<template>
  <main :style="{ height: ch + 'px'}">
    <nuxt />
  </main>
</template>

<script>

export default {
  components: {
    // Navigation
  },
   data() {
    return {
  ch: '',
  // hh: 500,
    }
  },
  created() {
    if (process.client) {
    window.addEventListener('load', this.pageHeight)
    window.addEventListener('resize', this.pageHeight)
    window.addEventListener('scroll', this.pageHeight)
    }
  },
  destroyed () {
    if (process.client) {
    window.addEventListener('load', this.pageHeight)
    window.addEventListener('resize', this.pageHeight)
    window.addEventListener('scroll', this.pageHeight)
    }
  },
  methods: {
    pageHeight () {
     if (window.innerWidth < 700) {
     this.ch = window.innerHeight
    //  this.hh = ( 0.09 * window.innerHeight )
      }
     if (window.innerWidth > 700) {
     this.ch = window.innerHeight
    //  this.hh = window.innerHeight
       }
    }
  }
}
</script>