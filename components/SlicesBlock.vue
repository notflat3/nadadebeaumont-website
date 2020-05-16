<template>
    <section>
        <!-- Slice section template -->
        <section v-for="(slice, index) in slices" :key="'slice-' + index">
            <!-- Fullscreen image template -->
            <template v-if="slice.slice_type === 'image_fullscreen'">
                <!-- Here :slice="slice" passes the data to the component -->
                <image-fullscreen-slice :slice="slice"></image-fullscreen-slice>
            </template>
            <!-- Quote slice template -->
            <template v-else-if="slice.slice_type === 'image_row'">
                <image-row-slice :slice="slice"></image-row-slice>
            </template>
            <!-- Image with caption slice template -->
            <!-- <template v-else-if="slice.slice_type === 'image_with_caption'">
                <image-caption-slice :slice="slice"></image-caption-slice>
            </template> -->
        </section>
    </section>
</template>

<script>
// Imports for all slices
const QuoteSlice = () => import("../components/slices/QuoteSlice.vue");
const TextSlice = () => import("../components/slices/TextSlice.vue");
const ContentBlockSlice = () => import("../components/slices/ContentBlockSlice.vue");
const ImageCarrouselSlice = () => import("../components/slices/ImageCarrouselSlice.vue");
const ImageFullscreenSlice = () => import("../components/slices/ImageFullscreenSlice.vue");
const ImageRowSlice = () => import("../components/slices/ImageRowSlice.vue");
const SpacerSlice = () => import("../components/slices/SpacerSlice.vue");



export default {
  props: ['slices'],
  name: 'slices-block',
  components: {
    QuoteSlice,
    TextSlice,
    ContentBlockSlice,
    ImageCarrouselSlice,
    ImageFullscreenSlice,
    ImageRowSlice,
    SpacerSlice,
  }
}
</script>