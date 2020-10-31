<template>
  <div>
    <Slider />
    <Buttons :categories="categories" :error="error" />
    <div v-for="(category, key) in categories" :key="key">
      <div v-if="get(category, 'featured.length', 0) > 0">
        <Heading :text="get(category, 'name')" />
        <Products
          :products="get(category, 'featured', [])"
          :error="error"
          :store-url="storeUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "~/components/Heading";
import Products from "~/components/Products.vue";
import Slider from "~/components/Slider";
import Buttons from "~/components/Buttons";
import { get } from "~/utils/get";

export default {
  components: {
    Heading,
    Products,
    Buttons,
    Slider,
  },
  data() {
    return {
      categories: [],
      storeUrl: process.env.storeUrl,
      error: null,
    };
  },
  async mounted() {
    try {
      this.categories = await this.$strapi.$categories.find();
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    get,
  },
};
</script>
