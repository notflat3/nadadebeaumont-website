<template>
  <nuxt-link :to="link">
    <div class="project-content">
     <div class="project-header">
      <div class="flex-container vertical">
          <h2>{{ $prismic.asText(project.data.title) }}</h2>
          <p>[ {{ $prismic.asText(project.data.title) }} ] </p>
      </div>
      <div class="hero-image" :style="{ backgroundImage: 'url(' + img  + ')' }" ></div>
     </div>
    </div>
  </nuxt-link>
</template>

<script>
import LinkResolver from "~/plugins/link-resolver.js"

export default {
  props: ['project'],
  data: function() {
    return {
      link: '',
      formattedDate: '',
      img: '',
    }
  },
  name: 'blog-widget',
  methods: {
    // Function to get the first paragraph of text in a blog post and limit the displayed text at 300 characters
    getFirstParagraph (project) {

      const textLimit = 300;
      const slices = project.data.title;
      let firstParagraph = '';
      let haveFirstParagraph = false;

      slices.map(function(slice) {
        if (!haveFirstParagraph && slice.slice_type == "text") {
          slice.primary.text.forEach(function(block){
            if (block.type == "paragraph" && !haveFirstParagraph) {
              firstParagraph += block.text;
              haveFirstParagraph = true;
            }
          });
        }
      });
      
      const limitedText = firstParagraph.substr(0, textLimit)

      if (firstParagraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...';
      }
      else {
        return firstParagraph;
      }
    },
  },
  created () {
    this.link = LinkResolver(this.project)
    this.img = this.project.data.hero_image.url
    // this.formattedDate = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(this.post.data.date))
  },
}
</script>
