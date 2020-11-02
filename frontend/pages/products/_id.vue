<template>
  <div v-if="this.product !== null">
    <section class="relative py-10 md:py-20">
      <div class="container mx-auto px-4">
        <div class="items-center flex flex-wrap">
          <div class="w-full md:w-4/12 ml-auto mr-auto px-4 pb-5">
            <div class="flex justify-content-center">
              <div>
                <img
                  alt="..."
                  class="h-auto max-w-full rounded-lg shadow-lg"
                  :src="get(activeImage, 'formats.small.url')"
                />
              </div>
            </div>
            <div v-if="get(product, 'image', []).length > 1" class="flex pt-5">
              <div class="h-auto flex w-1/5">
                <img
                  v-for="(image, key) in get(product, 'image', [])"
                  :key="key"
                  alt="..."
                  class="object-cover flex-1 max-w-full rounded-lg shadow-lg mr-2 hover:grow hover:shadow-lg"
                  :src="`${get(
                    image,
                    'formats.large.url',
                    get(image, 'formats.small.url')
                  )}`"
                  @click="activeImage = image"
                />
              </div>
            </div>
          </div>
          <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div class="md:pr-12">
              <h3 class="text-3xl font-semibold">
                {{ get(product, "title") }} - {{ get(product, "price") }} TL
              </h3>
              <p class="mt-4 text-lg leading-relaxed text-gray-600">
                {{ get(product, "description") }}
              </p>
              <div v-if="get(product, 'finished_stock')">
                <div class="mt-4 text-lg leading-relaxed text-gray-600">
                  <span class="text-red-400"> Stokta tükenmiştir. </span>
                </div>
                <div v-if="get(product, 'ask_expert')">
                  <button
                    v-if="product.status === 'published'"
                    class="mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow"
                    @click="askExpert(product)"
                  >
                    Satıcıya Sor
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="mt-6">
                  <div
                    v-for="(customField, key) in get(
                      product,
                      'Custom_field',
                      []
                    )"
                    :key="key"
                    class="flex inline-block text-left pt-5"
                  >
                    <span class="rounded-md shadow-sm">
                      <div class="flex">
                        <label
                          class="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2"
                          >{{ get(customField, "title") }}</label
                        >
                        <label
                          v-if="customField.required"
                          class="text-red-800 -mt-1 ml-1"
                          >*</label
                        >
                      </div>
                      <div class="relative">
                        <select
                          v-model="customField.value.trim()"
                          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          <option :value="''" disabled selected>
                            Lütfen bir değer seçiniz.
                          </option>
                          <option
                            v-for="(item, ikey) in get(
                              customField,
                              'options',
                              ''
                            ).split('|')"
                            :key="ikey"
                            :disabled="item.includes('tükendi')"
                          >
                            {{ item }}
                          </option>
                        </select>
                        <div
                          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                        >
                          <svg
                            class="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                            />
                          </svg>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <div v-if="showValidMessage" class="mt-6">
                  <p class="text-red-800">
                    Lütfen tüm zorunlu ayarları giriniz.
                  </p>
                </div>
                <ul class="list-none mt-6">
                  <li class="py-2">
                    <div class="flex items-center">
                      <div>
                        <h4 class="text-gray-600">
                          <button
                            v-if="product.status === 'published'"
                            class="mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow"
                            @click="validateAndAddToCart(product)"
                          >
                            Sepete Ekle
                          </button>
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else>
    {{ error }}
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { get } from "~/utils/get";

export default {
  data() {
    return {
      product: null,
      error: null,
      activeImage: null,
      showValidMessage: false,
    };
  },
  watch: {
    product: {
      handler(val) {
        this.get(val, "Custom_field", []).forEach(() => {
          this.showValidMessage = false;
        });
      },
      deep: true,
    },
  },
  async fetch() {
    try {
      this.product = await this.$strapi.$products.findOne(
        this.$route.params.id
      );
      this.activeImage = this.get(this.product.image, ".0.", null);
    } catch (error) {
      this.error = error;
    }
  },
  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove",
    }),
    askExpert(product) {
      console.log(product);
      this.$nextTick(() => {
        const image = this.get(product, "image.0.formats.small.url");

        if (image) {
          const title = this.get(product, "title", "Image");
          window.$crisp.push([
            "do",
            "message:send",
            [
              "file",
              {
                name: title,
                url: image,
                type: "image/jpg",
              },
            ],
          ]);
        } else {
          const url = `${process.env.shopUrl}/${this.get(product, "slug")}`;
          window.$crisp.push(["do", "message:send", ["text", url]]);
        }

        window.$crisp.push([
          "do",
          "message:send",
          ["text", "Bu ürün hakkında bilgi almak istiyorum."],
        ]);
        window.$crisp.push(["do", "chat:open"]);
      });
    },
    validateAndAddToCart(item) {
      this.get(item, "Custom_field", []).forEach((field) => {
        if (field.required === true && field.value.trim() === "") {
          this.showValidMessage = true;
        }
      });
      if (!this.showValidMessage) {
        this.showValidMessage = false;
        this.addToCart(item);
        this.$toast.success("Sepete Eklendi");
      }
    },
    get,
  },
};
</script>
