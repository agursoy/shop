require('dotenv').config();

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */

  //  <script src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"></script>

  head: {
    title: "Vintage Mother",
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: "e-commerce starter using Strapi, Nuxt.js and Snipcart"
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/main.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/toast',
  ],
  toast: {
    position: "top-center",
    duration: 4000,
    className: ["site-toaster"],
  },
  strapi: {
    url: process.env.API_URL || "http://localhost:1337",
    entities: [
      'products',
      'categories'
    ],
  },
  env: {
    storeUrl: process.env.STORE_URL || "http://localhost:1337",
    shopName: process.env.SHOP_NAME || "",
    backgroundColor: process.env.BACKGROUND_COLOR
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {}
}
