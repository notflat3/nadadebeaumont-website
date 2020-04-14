<template>
  <nuxt-link :to="link">
    <div @mouseover="hover = true"
         @mouseleave="hover = false"
         class="project-content">
     <div class="project-header">
      <div :class="{ hide: hover }" class="flex-container vertical">
          <h2>{{ $prismic.asText(project.data.title) }}</h2>
          <p>[ {{ tags }} ] </p>
      </div>
      <div :class="{ visible: hover }" class="click-enter"><h2>Click to enter</h2></div>
      <div :class="{ visible: hover }" class="hero-image" :style="{ backgroundImage: 'url(' + img  + ')' }" ></div>
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
      tags: '',
      img: '',
      hover: false,
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
    let tagList = this.project.data.project_tags
    tagList = tagList.map(a => ` ` + a.tag);
    let tagCounter = '';
    let cc = 0;

    tagList = tagList.map(function (current, index, arr){
      //counter
      tagCounter = tagCounter + current.toString()

      if (tagCounter.length > 40 && arr.length === index) {
        return 
      }
      else if (tagCounter.length > 40 && index === cc ) {
        return current = ` ...`
      }
       else if (tagCounter.length > 40) {
         return current = null
       }
      else if (tagCounter.length < 40) {
        cc++
        return current 
      }
    })

    tagList = tagList.filter(function (el) {
      return el != null;
    });

    let tagArray = tagList.toString()

   
    this.tags = tagArray
    this.link = LinkResolver(this.project)
    this.img = this.project.data.hero_image.url
  },
}
</script>
