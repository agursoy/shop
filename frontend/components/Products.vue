<template>
  <section>
    <div>
      <div v-if="error">{ error }</div>
      <div v-if="products.length === 0">
        <div class="text-center pt-3 flex items-center justify-center">
          <p class="text-gray-900">Yükleniyor...</p>
        </div>
      </div>
      <div v-else>
        <div class="container mx-auto flex items-center flex-wrap">
          <div
            v-for="(product, key) in products"
            :key="key"
            class="w-full md:w-1/3 p-6 flex flex-col items-center"
          >
            <nuxt-link :to="`/products/${get(product, 'slug', '')}`">
              <img
                alt="..."
                class="hover:grow hover:shadow-lg h-46 md:h-56 object-scale-down"
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
    apiUrl: String,
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
