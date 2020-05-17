<template>
  <div class='flex-container article-subtitle'>
    <div class="article-container">
      <prismic-rich-text class="textslice" :field="slice.primary.subtitle"/>
    </div>  
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'article-subtitle-slice'
}
</script>