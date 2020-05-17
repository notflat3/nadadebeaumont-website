<template>
   <div :class="{ reverse: order === true}" class="flex-container content-block">
    <div v-if="text != ''" class="text-container content-item" 
         :class="{ contentReverse: order === true, contentFull: !img }"
         :style="{ paddingLeft: txtPadLeft + '%', paddingRight: txtPadRight + '%' }">
      <prismic-rich-text class="" :field="text"/>
    </div>
    <div v-if="img.url != undefined" class="image-container content-item" 
         :class="{ contentReverse: order === true, contentFull: text.length === 0 }"
         :style="{ paddingLeft: imgPadLeft + '%', paddingRight: imgPadRight + '%' }">
       <div class="content-image">
          <prismic-image :field="img"/>
       </div>
        <template v-if="$prismic.asText(caption) != ''">
          <p class="caption"><span class="image-label">{{ $prismic.asText(caption) }}</span></p>
        </template>
    </div>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'content-block-slice',
  data: function() {
    return {
      img: '',
      order: '',
      text: '',
      caption: '',
      size: '',
      padRight: '',
      padLeft: ''
    }
  },
  created () {
    this.order = this.slice.primary.order
    this.img = this.slice.primary.image
    this.text = this.slice.primary.writing
    this.caption = this.slice.primary.image_caption
    this.txtPadRight = this.slice.primary.text_padding_right * (100 / 12)
    this.txtPadLeft = this.slice.primary.text_padding_left * (100 / 12)
    this.imgPadRight = this.slice.primary.image_padding_right * (100 / 12)
    this.imgPadLeft = this.slice.primary.image_padding_left * (100 / 12)
  }
}
</script>