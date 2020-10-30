<template>
  <div>
    <Slider />
    <Buttons />
    <Products :products="this.category.products" :error="error" />
  </div>
</template>

<script>
import Products from "~/components/Products.vue";
import Slider from "~/components/Slider";
import Buttons from "~/components/Buttons";

export default {
  components: {
    Products,
    Slider,
    Buttons,
  },
  data() {
    return {
      category: {},
      error: null,
    };
  },
  async mounted() {
    try {
      this.category = await this.$strapi.$categories.findOne(
        this.$route.params.id
      );
    } catch (error) {
      this.error = error;
    }
  },
};
</script>
