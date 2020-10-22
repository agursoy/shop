<template>
  <div>
    <Slider />
    <Buttons />
    <Products :products="products" :error="error" :storeUrl="storeUrl" />
  </div>
</template>

<script>
import Products from "~/components/Products.vue"
import Slider from '~/components/Slider'
import Buttons from '~/components/Buttons'

export default {
  middleware({ store, redirect }) {
    const redirectShowcase = !!store.state.redirectShowcase
    if (redirectShowcase) {
      return redirect('/showcase')
    }
  },
  data() {
    return {
      products: [],
      storeUrl: process.env.storeUrl,
      error: null
    }
  },
  async mounted() {
    try {
      this.products = await this.$strapi.$products.find()
    } catch (error) {
      this.error = error
    }
  },
  components: {
    Products,
    Buttons,
    Slider
  }
}
</script>
