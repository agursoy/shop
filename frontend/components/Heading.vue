<template>
  <nav class="w-full z-30 top-0 px-5 md:px-10 py-1">
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
    >
      <nuxt-link
        class="font-serif uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
        :to="`categories/${link}`"
      >
        {{ text }}
      </nuxt-link>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    text: String,
    link: String,
  },
};
</script>
