<template>
  <section class="master">
      <!-- Check projects exist -->
      <div v-if="projects.length !== 0" class="projects-container">
        <!-- Template for project thumbnail -->
        <section v-for="project in projects" :key="project.id" v-bind:project="project" class="single-project">
          <!-- Here :project="project" passes the data to the component -->
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
  seoTitle: '',
  seoDescription: '',
  favicon: '',
  components: {
    BlogWidget
  },
  head () {
    // console.log(seo + 'here')
    return {
      title: this.seoTitle,
      meta: [
      { hid: 'description', name: 'description', content: this.seoDescription },
      { property: 'og:url', content: 'https://jackeden.com' },
      { property: 'og:title', content: this.seoTitle },
      { property: 'og:description', content: this.seoDescription },
    ],
      link: [
          { rel: 'icon', type: 'image/x-icon', href: this.favicon.url },
      ]
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get blog home content
      const seoContent = (await $prismic.api.getSingle('about_page')).data

      // Query to get projects to preview
      const projectList = await $prismic.api.query(
        $prismic.predicates.at("document.type", "project_page"),
        { orderings : '[my.project_page.rank desc]' }
      )
      
      // Returns data to be used in template
      return {
        seoTitle: seoContent.meta_title,
        seoDescription: seoContent.meta_description,
        favicon: seoContent.favicon,
        projects: projectList.results
        // image: homepageContent.image.url,
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  created () {
    console.log(this.favicon);
  }
}
</script>