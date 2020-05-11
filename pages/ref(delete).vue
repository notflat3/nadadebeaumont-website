<template>
  <section class="home">
    <article>
      <!-- <div class="blog-avatar" :style="{ backgroundImage: 'url(' + image + ')' }" ></div> -->
      <!-- Template for page title -->
      <h1 class="blog-title">
        {{ $prismic.asText(homepageContent.name) }}
      </h1>
      <!-- Template for page description -->
      <p class="blog-description">{{ $prismic.asText(homepageContent.field_one_text) }}</p>
      
      <!-- Check blog posts exist -->
      <div v-if="projects.length !== 0" class="blog-main">
        <!-- Template for blog posts -->
        <section v-for="project in projects" :key="project.id" v-bind:project="project" class="blog-post">
          <!-- Here :post="post" passes the data to the component -->
          <project-widget :project="project"></project-widget>
        </section>
      </div>
      <!-- If no blog posts return message -->
      <!-- <div v-else class="blog-main"> -->
        <!-- <p>No Posts published at this time.</p> -->
      <!-- </div> -->
    </article>
  </section>
</template>

<script>
// Importing blog posts widget
import projectWidget from '~/components/projectWidget.vue'

export default {
  name: 'Home',
  components: {
    projectWidget
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Blog',
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get blog home content
      const homepageContent = (await $prismic.api.getSingle('about_page')).data

      // Query to get posts content to preview
      const projectList = await $prismic.api.query(
        $prismic.predicates.at("document.type", "project_page")
        // { orderings : '[my.post.date desc]' }
      )

      // Returns data to be used in template
      return {
        homepageContent,
        projects: projectList.results,
        // image: homepageContent.image.url,
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>

<style lang="sass" scoped>
.home
  max-width: 700px
  margin: auto
  text-align: center
  .blog-avatar
    height: 140px
    width: 140px
    border-radius: 50%
    background-position: center
    background-size: cover
    margin: 1em auto
    
  .blog-description
    font-size: 18px
    color: #9A9A9A
    line-height: 30px
    margin-bottom: 3rem
    padding-bottom: 3rem
    font-family: 'Lato', sans-serif
    border-bottom: 1px solid #DADADA

.blog-main
  max-width: 700px
  margin: auto
  text-align: left
  &.single img
    width: 100%
    height: auto
  &.single a
    text-decoration: none
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background-repeat: repeat-x
    background-size: 2px 2px
    background-position: 0 23px

.blog-post
  margin: 0
  margin-bottom: 3rem

@media (max-width: 767px)
  .home
    padding: 0 20px
  .blog-main
    padding: 0
    font-size: 18px
</style>