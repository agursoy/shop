<template>
  <div>
    <Slider />
    <Buttons />
    <Products :products="products" :error="error" :store-url="storeUrl" />
  </div>
</template>

<script>
import Products from "~/components/Products.vue";
import Slider from "~/components/Slider";
import Buttons from "~/components/Buttons";

export default {
  components: {
    Products,
    Buttons,
    Slider,
  },
  data() {
    return {
      products: [],
      storeUrl: process.env.storeUrl,
      error: null,
    };
  },
  async mounted() {
    try {
      this.products = await this.$strapi.$products.find();
    } catch (error) {
      this.error = error;
    }
  },
};
</script>
