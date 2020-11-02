<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else v-html="get(this, 'page.0.body', '')"></div>
</template>
<script>
import { get } from "~/utils/get";

export default {
  async fetch() {
    try {
      this.page = await this.$strapi.$pages.find({
        slug: this.$route.path.replace("/", ""),
      });
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
  methods: {
    get,
  },
};
</script>
