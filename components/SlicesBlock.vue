<template>
    <section>
        <!-- Slice section template -->
        <section v-for="(slice, index) in slices" :key="'slice-' + index">
            <!-- Spacer slice template -->
            <template v-if="slice.slice_type === 'content_block'">
                <content-block-slice :slice="slice"></content-block-slice>
            </template>
              <!-- Fullscreen image template -->
            <template v-else-if="slice.slice_type === 'image_fullscreen'">
                <image-fullscreen-slice :slice="slice"></image-fullscreen-slice>
            </template>
            <!-- Quote slice template -->
            <template v-else-if="slice.slice_type === 'image_row'">
                <image-row-slice :slice="slice"></image-row-slice>
            </template>
            <!-- Spacer slice template -->
            <template v-else-if="slice.slice_type === 'image_carrousel'">
                <image-carrousel-slice :slice="slice"></image-carrousel-slice>
            </template>

            <!-- Spacer slice template -->
            <template v-else-if="slice.slice_type === 'spacer'">
                <spacer-slice :slice="slice"></spacer-slice>
            </template>
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