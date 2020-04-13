<template>
  <section class="master">
      <!-- Check blog posts exist -->
      <div v-if="projects.length !== 0" class="projects-container">
        <!-- Template for blog posts -->
        <section v-for="project in projects" :key="project.id" v-bind:project="project" class="single-project">
          <!-- Here :post="post" passes the data to the component -->
          <blog-widget :project="project"></blog-widget>
        </section>
      </div>
      <!-- If no blog posts return message -->
      <!-- <div v-else class="blog-main"> -->
        <!-- <p>No Posts published at this time.</p> -->
      <!-- </div> -->
    </section>
</template>

<script>
// Importing blog posts widget
import BlogWidget from '~/components/BlogWidget.vue'

export default {
  name: 'Home',
  components: {
    BlogWidget
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