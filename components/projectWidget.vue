<template>
 <div class="project-container" v-click-outside="scrollUp">
    <div class="project-content" ref="projectContent" :class="{ overflow: showByIndex === project}">
      <div class="project-header">
        <div class="flex-container" :class="{ vertical: title > 30}">
          <div class="project-title-container">
            <h1>0{{ index + 1 }}. 
            <span class="project-title" :class="{ show: showByIndex === project }">{{ $prismic.asText(project.data.project_title) }}</span>
           </h1>
         </div> 
          <div class="project-tags" :class="{ show: showByIndex === project, left: title > 30 }">
            <p>{{ project.data.project_type }} | <span class="project-publishing-date"> {{ date }}</span></p>
          </div>
         <div class="project-extra-info flex-container vertical captions" :class="{ show: showByIndex === project }"
              v-if="project.data.project_collaborators[0].text !== '' || project.data.project_features[0].text !== ''">
           <prismic-rich-text :field="project.data.project_collaborators" />
           <prismic-rich-text :field="project.data.project_features" />
        </div>
      </div>
      </div>
      <div class="project-main" :class="{ show: showByIndex === project }">
        <div class="flex-container">
          <slices-block :slices="slices"/>
        </div>
      </div>
      <div class="project-end" :class="{ show: showByIndex === project }">
        <div class="flex-container">
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js"
import SlicesBlock from '~/components/SlicesBlock.vue'
import ClickOutside from 'vue-click-outside'


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
      features: null,
      date: '',
      title: null
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
    // window.addEventListener('click', this.scrollUp)
    }

    let str01, str02
    let string = this.project.data.project_publishing_date
    if (string !== null) {
        str01 =  string.slice(0, 7);
    }
    this.title = this.project.data.project_title[0].text.length
    console.log(this.title + "title")
    this.date = str01
    this.slices = this.project.data.body,
    this.link = LinkResolver(this.project)
    this.background_color = this.project.data.project_color
  },
  destroyed () {
    if (process.client && this.showByIndex != this.project ) {
    // window.addEventListener('click', this.scrollUp)
   }
  },
   mounted () {
    // prevent click outside event with popupItem.
    this.popupItem = this.$el
  },
 
  // do not forget this section
  directives: {
    ClickOutside
  }
}
</script>
