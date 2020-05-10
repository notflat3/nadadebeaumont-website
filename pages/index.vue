<template>
  <section class="master">
      <!-- Check projects exist -->
      <div v-if="projects.length !== 0" ref="x" class="all-projects-container">
        <!-- Template for project thumbnail -->
        <section v-for="(project, index) in projects"
                  :key="project.id" 
                  v-bind:project="project" 
                  :ref="'qty' + index"
                  @click="showProject(project, index)"
                  class="project"
                  :class="{ active: showByIndex === project }"
                  >
          <!-- Here :project="project" passes the data to the component -->
          <blog-widget :project="project"
                        :class="{ default: showByIndex === project }" 
                        :style="{ background: project.data.project_color }"
                        ></blog-widget>
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
  backgroundColor: '',

  data: function () {
    return {
    first: true,
    clicked: false,
    showByIndex: null
    }
  },
  components: {
    BlogWidget
  },
  head () {
    // console.log(seo + 'here')
    return {
      title: this.seoTitle,
      meta: [
      { hid: 'description', name: 'description', content: this.seoDescription },
      { property: 'og:url', content: 'https://nadadebeaumont.com' },
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
      const seoContent = (await $prismic.api.getSingle('about')).data

      // Query to get projects to preview
      const projectList = await $prismic.api.query(
        $prismic.predicates.at("document.type", "project"),
        { orderings : '[my.project.rank desc]'}
      )
      // Returns data to be used in template
      return {
        seoTitle: seoContent.about_title,
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
  methods: {
  showProject(project, index) {
    console.log(this.projects)
    const object = this.$refs['qty' + index]
    const container = this.$refs.x
    const posLeft = object[0].offsetLeft - 64;
    this.showByIndex = project
    setTimeout( function() {container.scrollTo({ top: 0, left: posLeft, behavior: 'smooth' }) }, 600)
    
  },
  handleScroll () {
    console.log('handlescroll')
    }
  },
  created () {
      console.log(this.projects + 'projects')
      if (process.client) { 
        console.log('here')
          window.addEventListener('scroll', this.handleScroll);
      }
  },
  destroyed () {
      if (process.client) { 
          window.removeEventListener('scroll', this.handleScroll);
      }
  }
}
</script>