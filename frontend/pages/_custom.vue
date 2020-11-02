<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <div v-html="page.body"></div>
  </div>
</template>
<script>
export default {
  async fetch() {
    try {
      this.page = await this.$strapi.$pages.findOne({ slug: this.$route.path });
    } catch (error) {
      this.error = error;
    }
  },
  data() {
    return {
      page: null,
      error: null,
    };
  },
};
</script>
