<template>
  <nav id="products" class="w-full z-30 top-0 px-6 py-1">
    <div
      class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3"
    >
      <a
        class="font-serif uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
        href="#"
      >
        {{ text }}
      </a>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    text: String,
  },
};
</script>
