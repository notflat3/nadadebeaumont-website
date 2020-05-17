<template>
  <div class='flex-container image-row'>
    <template v-for="(item, index) in slice.items">
      <div class="image-row-item" :key="'photo-item-' + index">
          <prismic-image :field="item.image"/>
      </div>    
    </template>
  </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'image-row-slice'
}
</script>