<template>
  <div class="flex-container">
    <template v-if="size === ''">
      <div class='image-fullscreen' :style="{ paddingLeft: padLeft + '%', paddingRight: padRight + '%' }">
           <prismic-image :field="img"/>
            <template v-if="$prismic.asText(caption) != ''">
          <p class="caption">
            <span class="image-label">{{ $prismic.asText(caption) }}</span>
          </p>
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
      caption: '',
      size: '',
      padRight: '',
      padLeft: ''
    }
  },
  created () {
    this.img = this.slice.primary.image
    this.caption = this.slice.primary.image_caption
    this.padRight = this.slice.primary.padding_right * (100 / 12)
    this.padLeft = this.slice.primary.padding_left * (100 / 12)
  }
}
</script>