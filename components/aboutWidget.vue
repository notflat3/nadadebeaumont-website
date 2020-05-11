<template>
  <div class="project-container">
    <div class="project-content">
      <div class="project-header">
        <div class="flex-container">
          <h1>
            <span>ME</span
            ><span>. {{ $prismic.asText(about.about_title) }}</span>
          </h1>
        </div>
      </div>
      <div class="project-main">
        <div class="flex-container">
          <!-- <p>{{ $prismic.asText(about.about_description) }}</p> -->
          <prismic-rich-text :field="about.about_description" />
        </div>
      </div>
      <div class="project-end">
        <div id="dev-credit" class="flex-container">
          <p>Website by <a href="" target="blank">Jonathan Quaade</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "about-widget",
  props: ["about"]
};
</script>
