<template>
<div class="">
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>
    <div class="container mx-auto flex flex-wrap items-center justify-center p-6">
      <nuxt-link v-for="(category, key) in categories" :to="`/categories/${get(category,'slug','')}`" :key="key" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 ml-2 border border-gray-400 rounded shadow m-1">
        {{ get(category, 'name', '') }}
      </nuxt-link>
    </div>

  </div>
</div>
</template>

<script>
import { get } from '~/utils/get'

export default {
  data() {
    return {
      categories: [],
      error: null
    }
  },
  methods: {
    get
  },
  async mounted() {
    try {
      this.categories = await this.$strapi.find('categories')
    } catch (error) {
      this.error = error
    }
  },
}
</script>

<style lang="css" scoped>
</style>
