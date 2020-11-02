<template>
  <div>
    <footer class="mx-auto mt-12 py-8 border-t border-gray-400">
      <div class="container mx-auto flex px-2 md:px-8">
        <div class="w-full mx-auto flex flex-wrap">
          <div class="flex w-full lg:w-1/2">
            <div class="px-3 md:px-0">
              <h3 class="font-bold text-gray-900">About</h3>
              <p class="py-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse
                consectetur dapibus velit ut lacinia.
              </p>
            </div>
          </div>
          <div class="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
            <div class="px-3 md:px-0">
              <h3 class="font-bold text-gray-900">Social</h3>
              <ul class="list-reset items-center pt-3">
                <li>
                  <div
                    class="inline-block no-underline hover:text-black hover:underline py-1"
                  >
                    <div class="flex">
                      <a
                        href="https://twitter.com/strapijs"
                        class="max-w-xs ml-4"
                      >
                        <Twitter />
                      </a>
                      <a href="https://facebook.com/strapijs" class="ml-3">
                        <Facebook />
                      </a>
                      <a
                        href="https://github.com/strapi/strapi-starter-nuxt-e-commerce"
                        class="ml-3"
                      >
                        <Github />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Twitter from "~/components/icons/twitter.vue";
import Github from "~/components/icons/github.vue";
import Facebook from "~/components/icons/facebook.vue";

export default {
  components: {
    Twitter,
    Github,
    Facebook,
  },
};
</script>

<style>
.emoji {
  font-size: 30px;
}
</style>
