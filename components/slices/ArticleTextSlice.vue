<template>
  <div class='flex-container article-text'>
    <div class="article-container">
      <prismic-rich-text :field="slice.primary.text"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'article-text-slice'
}
</script>