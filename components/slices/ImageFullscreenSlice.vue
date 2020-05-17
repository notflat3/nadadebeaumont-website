<template>
  <div class="flex-container">
    <template v-if="size === ''">
      <div class='image-fullscreen' :style="{ paddingLeft: padLeft + '%', paddingRight: padRight + '%' }">
         <div v-if="img.url != undefined">
          <prismic-image :field="img"/>
         </div>
         <div v-else-if="videoEmbedUrl != undefined">
            <div class="video-controls"></div>
            <prismic-embed :field="videoEmbed"/>
         </div>
         <div v-else-if="videoInlineUrl != undefined">
            <div class="video-controls"></div>
            <video playsinline controls>
               <source :src="videoInlineUrl"/>
             </video>
          </div>
        <template v-if="$prismic.asText(caption) != ''">
            <prismic-rich-text class="caption" :field="caption"/>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'image-fullscreen-slice',
  data: function() {
    return {
      img: '',
      videoEmbed: {},
      videoEmbedUrl: '',
      videoInlined: {},
      videoInlinelUrl: '',
      caption: '',
      size: '',
      padRight: '',
      padLeft: ''
    }
  },
  created () {
    this.img = this.slice.primary.image
    if (this.slice.primary.video_embed != undefined) {
      this.videoEmbedUrl = this.videoEmbed.embed_url
    }

    if (this.slice.primary.video_internal != undefined) {
        this.videoInlineUrl = this.slice.primary.video_internal.url
    }
    this.caption = this.slice.primary.image_caption
    this.padRight = this.slice.primary.padding_right * (100 / 12)
    this.padLeft = this.slice.primary.padding_left * (100 / 12)
  }
}
</script>