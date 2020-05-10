<template>
  <div class="project-container"
        @click ='toggle()'>
    <div class="project-background"></div>
    <div class="project-content"

       >
     <div class="project-header">
      <div class="flex-container">
          <!-- <h2>{{ $prismic.asText(project.data.title) }}</h2> -->
          <h1>
            <!-- <nuxt-link :to="link"> -->
            <span>01</span>
            <!-- </nuxt-link> -->
            </h1>
          <!-- <p>[ {{ tags }} ] </p> -->
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
    }
  },
  name: 'blog-widget',
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
    
    
  },
  created () {
    //  let tagList = this.project.data.project_tags
    // tagList = tagList.map(a => ` ` + a.tag);
    // let tagCounter = '';
    // let cc = 0;

    // tagList = tagList.map(function (current, index, arr){
    //   //counter
    //   tagCounter = tagCounter + current.toString()

    //   if (tagCounter.length > 40 && arr.length === index) {
    //     return 
    //   }
    //   else if (tagCounter.length > 40 && index === cc ) {
    //     return current = ` ...`
    //   }
    //    else if (tagCounter.length > 40) {
    //      return current = null
    //    }
    //   else if (tagCounter.length < 40) {
    //     cc++
    //     return current 
    //   }
    // })

    // tagList = tagList.filter(function (el) {
    //   return el != null;
    // });

    // let tagArray = tagList.toString()

   
    // this.tags = tagArray
    this.link = LinkResolver(this.project)
    console.log(this.project.data.project_color)
    this.background_color = this.project.data.project_color
  },
}
</script>
