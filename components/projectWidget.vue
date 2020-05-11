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

export default {
  props: ['project'],
  data: function() {
    return {
      link: '',
      tags: '',
      background_color: '',
      isOpen: false,
      collaborators: null,
      features: null,
    }
  },
  name: 'project-widget',
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    getContent() {
    },
  },
  created () {
    this.link = LinkResolver(this.project)
    this.background_color = this.project.data.project_color
  },
}
</script>
