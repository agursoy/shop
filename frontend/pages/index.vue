<template>
  <div>
    <Slider />
    <Buttons :menus="menus" :error="error" />
    <div v-for="(category, key) in categories" :key="key">
      <div v-if="get(category, 'featured.length', 0) > 0" class="mt-2">
        <Heading :text="get(category, 'name')" :link="get(category, 'slug')" />
        <Products :products="get(category, 'featured', [])" :error="error" />
        <div class="w-full flex justify-center pb-2">
          <nuxt-link
            :to="`/categories/${get(category, 'slug', '')}`"
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 ml-2 border border-gray-400 rounded shadow m-1"
          >
            Tümünü Gör
          </nuxt-link>
        </div>
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
  async fetch() {
    try {
      this.menus = await this.$strapi.find("main-menu");
      const homePageCategories = await this.$strapi.find("homepage-categories");
      for (const element of this.get(homePageCategories, "categories", [])) {
        const cat = await this.$strapi.$categories.find({ slug: element.slug });
        this.categories.push(cat[0]);
      }
    } catch (error) {
      this.error = error;
    }
  },
  data() {
    return {
      menus: [],
      categories: [],
      apiUrl: process.env.apiUrl,
      error: null,
    };
  },
  methods: {
    get,
  },
};
</script>
