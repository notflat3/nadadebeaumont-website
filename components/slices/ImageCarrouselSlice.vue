<template>
  <div class="flex-container vertical image-carrousel">
    <div class="carrousel-arrows">
      <div class="arrow-prev slick-arrow" @click="showPrev"></div>
      <div class="arrow-next slick-arrow" @click="showNext"></div>
    </div>
    <VueSlickCarousel class="image-carrousel-container" ref="carousel" v-bind="settings">
      <template v-for="(item, index) in slice.items">
        <div class="image-carrousel-item" :key="'carrousel-item-' + index">
          <prismic-image :class="{ cover: imageCover(item.gallery_image.dimensions)}" :field="item.gallery_image" />
        </div>
      </template>
      <template #prevArrow="arrowOption">
      <div class="custom-arrow">
        {{ arrowOption.currentSlide + 1 }}/{{ arrowOption.slideCount }}
      </div>
    </template>
    </VueSlickCarousel>
    <p class="caption">{{ $prismic.asText(caption) }}</p>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
// import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  props: ["slice"],
  name: "image-carrousel-slice",
  components: { VueSlickCarousel },
  data() {
    return {
      caption: '',
      settings: {
        // dots: true,
        focusOnSelect: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 600,
        // variableWidth: true

      }
    };
  },
  methods: {
    showNext() {
      this.$refs.carousel.next();
    },
    showPrev() {
      this.$refs.carousel.prev();
    },
    imageCover(dimensions) {
      const w = dimensions.width
      const h = dimensions.height
      console.log(w / h)
      if ( w / h > 1.5) {
        return true
      }
      else {
        return false
      }
    }

  },
  created() {
   this.caption = this.slice.primary.caption
  }
};
</script>

