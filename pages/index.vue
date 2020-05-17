<template>
  <section class="master">
      <!-- Check projects exist -->
      <div v-if="projects.length !== 0" ref="allProjects" class="all-projects-container">
        
         <section :ref="'qty' + aboutIndex"
                  @click="showProject(aboutIndex, aboutIndex)"
                  class="project"
                  id="about"
                  :class="{ active: showByIndex === aboutIndex }"
                  >
            <about-widget :about="about"></about-widget>
        </section>
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
          <project-widget :project="project"
                          :class="{ default: showByIndex === project }" 
                          :style="{ background: project.data.project_color }"
                          ></project-widget>
        </section>
      </div>
      <!-- If no blog posts return message -->
      <div v-else class="blog-main">
      <p>No Posts published at this time.</p>
      </div>
    </section>
</template>

<script>
// Importing blog posts widget
import projectWidget from '~/components/projectWidget.vue'
import aboutWidget from '~/components/aboutWidget.vue'

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
    aboutIndex: 'value',
    showByIndex: null,
    }
  },
  components: {
    projectWidget,
    aboutWidget
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
      const about = (await $prismic.api.getSingle('about')).data

      // Query to get projects to preview
      const projectList = await $prismic.api.query(
        $prismic.predicates.at("document.type", "project"),
        { orderings : '[my.project.rank desc]'}
      )
      // Returns data to be used in template
      return {
        about: about,
        seoTitle: about.about_title,
        seoDescription: about.meta_description,
        favicon: about.favicon,
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
    const object = this.$refs['qty' + index]
    const container = this.$refs.allProjects
    this.showByIndex = project

    setTimeout( function() {
      let posLeft, posTop;
      if (object[0] === undefined) {
        posLeft = 0;
        posTop = 2;
      }
      else {
        posLeft = (object[0].offsetLeft - 64);
        posTop = (object[0].offsetTop + 2);
      } 
      container.scrollTo({ top: posTop, left: posLeft, behavior: 'smooth' }) 
    }, 600)
  },
  handleScroll () {
    }
  },
  created () {
      if (process.client) { 
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