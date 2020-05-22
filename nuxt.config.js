export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Nada Debeaumont',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width' },
      { hid: 'description', name: 'description', content: 'Nada Debeaumont is a creative researcher and strategist' },
      { property: 'og:type', content: 'website'},
      { property: 'og:url', content: 'http://mynameis.fr/en' },
      { property: 'og:title', content: 'Nada Debeaumont'},
      { property: 'og:description', content: 'Nada Debeaumont is a creative researcher and strategist'},
      { property: 'og:image', content: 'http://mynameis.fr/user/pages/about/mynameis-facebook.jpg'}
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:300,400,700,900' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/resetr.css',
    '@/assets/css/common.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // modules for full static before `nuxt export` (coming in v2.12)
    '@/modules/static',
    '@/modules/crawler',
    // https://prismic-nuxt.js.org/
    '@nuxtjs/prismic',
    'nuxt-lazy-load'
  ],

  prismic: {
    endpoint: 'https://nadadebeaumont-website.cdn.prismic.io/api/v2',
    linkResolver: '@/plugins/link-resolver',
    htmlSerializer: '@/plugins/html-serializer',
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  },

  generate: {
    fallback: '404.html' // Netlify reads a 404.html, Nuxt will load as an SPA
  }
}