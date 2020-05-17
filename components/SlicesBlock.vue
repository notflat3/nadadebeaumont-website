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
            <!-- Article Text template -->
             <template v-else-if="slice.slice_type === 'article_text'">
                <article-text-slice :slice="slice"></article-text-slice>
            </template>
            <!-- Article Subtitle template -->
            <template v-else-if="slice.slice_type === 'article_subtitle'">
                <article-subtitle-slice :slice="slice"></article-subtitle-slice>
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
const ArticleSubtitleSlice = () => import("../components/slices/ArticleSubtitleSlice.vue");
const ArticleTextSlice = () => import("../components/slices/ArticleTextSlice.vue");
const ContentBlockSlice = () => import("../components/slices/ContentBlockSlice.vue");
const ImageCarrouselSlice = () => import("../components/slices/ImageCarrouselSlice.vue");
const ImageFullscreenSlice = () => import("../components/slices/ImageFullscreenSlice.vue");
const ImageRowSlice = () => import("../components/slices/ImageRowSlice.vue");
const SpacerSlice = () => import("../components/slices/SpacerSlice.vue");



export default {
  props: ['slices'],
  name: 'slices-block',
  components: {
    ArticleSubtitleSlice,
    ArticleTextSlice,
    ContentBlockSlice,
    ImageCarrouselSlice,
    ImageFullscreenSlice,
    ImageRowSlice,
    SpacerSlice,
  }
}
</script>