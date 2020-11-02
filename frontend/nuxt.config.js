require("dotenv").config();

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  //  <script src="https://cdn.snipcart.com/themes/v3.0.16/default/snipcart.js"></script>
  head: {
    title: process.env.SHOP_NAME,
    meta: [
      { charset: "utf-8" },
      {
        hid: "description",
        name: "description",
        content: process.env.SHOP_DESCRIPTION,
      },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, maximum-scale=2.0, user-scalable=0",
      },
      {
        name: "msapplication-TileImage",
        content: "/icon-192x192.png",
      },
      {
        property: "og:url",
        hid: "og:url",
        content: process.env.SHOP_URL,
      },
      {
        property: "og:type",
        hid: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        hid: "og:title",
        content: process.env.SHOP_NAME,
      },
      {
        property: "og:description",
        hid: "og:description",
        content: process.env.SHOP_DESCRIPTION,
      },
      {
        property: "og:image",
        hid: "og:image",
        content: `${process.env.SHOP_URL}/share.jpg`,
      },
      {
        property: "og:locale",
        hid: "og:locale",
        content: "tr_TR",
      },
      {
        property: "og:site_name",
        hid: "og:site_name",
        content: process.env.SHOP_NAME,
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:creator",
        name: "twitter:creator",
        content: process.env.SHOP_TWITTER,
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: process.env.SHOP_NAME,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: process.env.SHOP_DESCRIPTION,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: `${process.env.SHOP_URL}/share.jpg`,
      },
      {
        hid: "twitter:site",
        name: "twitter:site",
        content: process.env.SHOP_TWITTER,
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/css/main.css"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "~/plugins/ga.js", ssr: false },
    { src: "~/plugins/crisp.js", ssr: false },
  ],
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
    "@nuxtjs/tailwindcss",
    "@nuxtjs/html-validator",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/strapi", "@nuxtjs/toast"],
  toast: {
    position: "top-center",
    duration: 4000,
    className: ["site-toaster"],
  },
  strapi: {
    url: process.env.API_URL || "http://localhost:1337",
    entities: ["products", "categories", "pages"],
  },
  env: {
    apiUrl: process.env.API_URL || "http://localhost:1337",
    shopName: process.env.SHOP_NAME || "",
    shopUrl: process.env.SHOP_URL || "",
    backgroundColor: process.env.BACKGROUND_COLOR,
    crisp: process.env.CRIPS,
    googleAnalytics: process.env.GOOGLE_ANALYTICS,
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** Custom Routes
   */
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "custom",
        path: "*",
        component: resolve(__dirname, "pages/custom/slug.vue"),
      });
    },
  },
};
