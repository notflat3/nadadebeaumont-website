<template>
 <div class="project-container">
    <div class="project-content" ref="projectContent" :class="{ overflow: showByIndex === project}">
      <div class="project-header">
        <div class="flex-container vertical">
          <h1>0{{ index + 1 }}. 
            <span class="project-title" :class="{ show: showByIndex === project }">{{ $prismic.asText(project.data.project_title) }}</span>
          </h1>
          <div class="project-tags" :class="{ show: showByIndex === project }">
            <p>{{ project.data.project_type }} |  {{ project.data.project_publish_date }}</p>
        </div>
        </div>
         <div class="project-extra-info flex-container vertical captions" :class="{ show: showByIndex === project }"
              v-if="project.data.project_collaborators[0].text !== '' || project.data.project_features[0].text !== ''">
           <prismic-rich-text :field="project.data.project_collaborators" />
           <prismic-rich-text :field="project.data.project_features" />
        </div>
      </div>
      <div class="project-main" :class="{ show: showByIndex === project }">
        <div class="flex-container">
          <slices-block :slices="slices"/>
        </div>
      </div>
      <div class="project-end" :class="{ show: showByIndex === project }">
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
  props: ['project', 'index', 'showByIndex'],
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
      features: null
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    scrollUp() {
    const container = this.$refs.projectContent
    container.scrollTo({ top: 0, behavior: 'smooth' }) 
    },
  },
  created () {
    if (process.client && this.showByIndex != this.project) {
    window.addEventListener('click', this.scrollUp)
    }
    this.slices = this.project.data.body,
    this.link = LinkResolver(this.project)
    this.background_color = this.project.data.project_color
  },
  destroyed () {
    if (process.client && this.showByIndex != this.project ) {
    window.addEventListener('click', this.scrollUp)
   }
  },
}
</script>
