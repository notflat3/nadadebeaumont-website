<template>
  <div class="spacer">
    <template v-if="size === 'small'">
      <div class="spacer-small"></div>
    </template>
    <template v-if="size === 'medium'">
      <div class="spacer-medium"></div>
    </template>
    <template v-if="size === 'large'">
      <div class="spacer-large"></div>
    </template>
  </div>
  
</template>

<script>
export default {
  props: ['slice'],
  name: 'spacer-slice',
   data: function() {
    return {
      size: '',
    }
  },
  created () {
    this.size = this.slice.primary.space_size
    // this.caption = this.slice.primary.image_caption
  }
}
</script>