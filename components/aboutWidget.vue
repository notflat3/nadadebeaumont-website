<template>
  <div class="project-container">
    <div class="project-content" ref="aboutContent" :class="{ overflow: showByIndex === 'value'}">
      <div class="project-header">
        <div class="flex-container">
          <h1>
            ME<span class="project-title" :class="{ show: showByIndex === 'value' }">. {{ $prismic.asText(about.about_title) }}</span>
          </h1>
        </div>
      </div>
      <div class="project-main" :class="{ show: showByIndex === 'value' }">
        <div class="flex-container">
          <prismic-rich-text :field="about.about_description" />
        </div>
      </div>
      <div class="project-end" :class="{ show: showByIndex === 'value' }">
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
  props: ["about", 'showByIndex']
};
</script>
