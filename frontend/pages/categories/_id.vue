<template>
  <div>
    <Slider />
    <Buttons :menus="menus" />
    <Heading :text="'Öne Çıkanlar'" />
    <Products :products="get(category, 'featured', [])" :error="error" />
    <Heading :text="'Ürünler'" />
    <Products :products="products" :error="error" />
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
    Slider,
    Buttons,
  },
  data() {
    return {
      menus: [],
      categories: [],
      category: {},
      products: [],
      error: null,
    };
  },
  async fetch() {
    try {
      this.menus = await this.$strapi.find("main-menu");
      this.categories = await this.$strapi.$categories.find();
      this.category = await this.$strapi.$categories.findOne(
        this.$route.params.id
      );
      this.products = await this.$strapi.$products.find({
        categories: this.category.id,
      });
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    get,
  },
};
</script>
