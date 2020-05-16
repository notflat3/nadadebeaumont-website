<template>
 <div class="project-container">
    <div class="project-content">
      <div class="project-header">
        <div class="flex-container vertical">
          <h1><span>01</span><span>. {{ $prismic.asText(project.data.project_title) }}</span></h1>
          <p>{{ project.data.project_type }} |  {{ project.data.project_publish_date }}</p>
        </div>
         <div v-if="project.data.project_collaborators[0].text !== '' || project.data.project_features[0].text !== ''" 
          class="flex-container vertical captions">
          <p>Collaborators: <prismic-rich-text :field="project.data.project_collaborators" /></p>
          <p>Features: <prismic-rich-text :field="project.data.project_features" /></p>

        </div>
      </div>
      <div class="project-main">
        <div class="flex-container">
          <slices-block :slices="slices"/>
        </div>
      </div>
      <div class="project-end">
        <div class="flex-container">
          <p>End</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js"
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  props: ['project'],
  components: {
    SlicesBlock
  },
  name: 'project-widget',
  data: function() {
    return {
      link: '',
      tags: '',
      slices: '',
      background_color: '',
      isOpen: false,
      collaborators: null,
      features: null,
    }
  },
  // async asyncData({ $prismic, params, error }) {
  //   try{
  //     // Query to get post content
  //     const content = (await $prismic.api.getByUID('project', this.project.uid))

  //     // Returns data to be used in template
  //     return {
  //       content: content.data,
  //       contentId: content.id,
  //       slices: content.data.body,
  //       // formattedDate: Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(post.date)),
  //     }
  //   } catch (e) {
  //     // Returns error page
  //     error({ statusCode: 404, message: 'Page not found' })
  //   }
  // },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    getContent() {
    },
  },
  created () {
    // console.log(this.project)
    this.slices = this.project.data.body,
    this.link = LinkResolver(this.project)
    this.background_color = this.project.data.project_color
  },
}
</script>
