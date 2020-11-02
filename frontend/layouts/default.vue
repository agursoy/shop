<template>
  <div>
    <Head />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Head from "./../components/Head";
import Footer from "./../components/Footer";

export default {
  components: {
    Head,
    Footer,
  },
  head() {
    return {
      bodyAttrs: {
        style: `background-color:${process.env.backgroundColor}`,
      },
    };
  },
};
</script>
