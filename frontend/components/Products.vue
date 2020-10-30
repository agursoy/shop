<template>
  <section>
    <div>
      <div v-if="error">{ error }</div>
      <div v-else>
        <div class="container mx-auto flex items-center flex-wrap pb-12">
          <nav id="store" class="w-full z-30 top-0 px-6 py-1">
            <div
              class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
            >
              <a
                class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
                href="#"
              >
                Ürünler
              </a>
            </div>
          </nav>
          <div
            v-for="(product, key) in products"
            :key="key"
            class="w-full md:w-1/3 p-6 flex flex-col"
          >
            <nuxt-link :to="`/products/${get(product, 'slug', '')}`">
              <img
                class="hover:grow hover:shadow-lg"
                :src="`${get(
                  product,
                  'image.0.formats.large.url',
                  get(product, 'image.0.formats.small.url')
                )}`"
              />
              <div class="text-center pt-3 flex items-center justify-center">
                <p class="text-gray-900">{{ get(product, "title", "") }}</p>
              </div>
              <p class="text-center pt-1">{{ get(product, "price", "") }} TL</p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { get } from "~/utils/get";

export default {
  props: {
    products: Array,
    error: Object,
    storeUrl: String,
  },
  methods: {
    get,
  },
};
</script>

<style>
.crop {
  width: 180px;
  height: 180px;
}
</style>
