<template>
  <div class="">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <div
        style="background-color: #faebd738"
        class="container mx-auto flex flex-wrap items-center justify-center p-6 mt-5 md:mt-10 mb-5 md:mb-10"
      >
        <nuxt-link
          v-for="(menu, key) in get(menus, 'Items', [])"
          :key="key"
          :to="`${get(menu, 'link', '')}`"
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 ml-2 border border-gray-400 rounded shadow m-1"
        >
          {{ get(menu, "title", "") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "~/utils/get";

export default {
  props: ["menus", "error"],

  methods: {
    get,
  },
};
</script>

<style lang="css" scoped></style>
