<template>
  <div v-if="this.product !== null">
    <section class="relative py-10 md:py-20">
      <div class="container mx-auto px-4">
        <div class="items-center flex flex-wrap">
          <div class="w-full md:w-4/12 ml-auto mr-auto px-4 pb-10 md:pb-0">
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
                  @click="selectImage(image)"
                />
              </div>
            </div>
            <div v-if="get(product, 'customer_photos', []).length > 0">
              <p
                class="py-4 tracking-wide no-underline hover:no-underline font-bold text-gray-600 text-xl"
              >
                Mutlu Müşteriler
              </p>
              <div class="h-auto flex w-2/12">
                <img
                  v-for="(customers, key) in get(
                    product,
                    'customer_photos',
                    []
                  )"
                  :key="key"
                  alt="..."
                  class="object-cover flex-1 max-w-full rounded-lg shadow-lg mr-2 hover:grow hover:shadow-lg"
                  :src="`${get(
                    customers,
                    'formats.large.url',
                    get(customers, 'formats.small.url')
                  )}`"
                  @click="selectImage(customers)"
                />
              </div>
            </div>
          </div>
          <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
            <div class="md:pr-12">
              <h3 class="text-3xl font-semibold">
                {{ get(product, "title") }} - {{ get(product, "price") }} TL
              </h3>
              <!-- prettier-ignore -->
              <p
                class="mt-4 text-lg leading-relaxed whitespace-pre-line text-gray-600"
              >{{ get(product, "description") }}</p>
              <!-- prettier-ignore -->
              <div
                  v-if="categoryNote"
                  class="block whitespace-pre-line mt-6 bg-gray-200 p-4 rounded-md inline-block"
                >{{ categoryNote }}
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
              <div v-else-if="get(product, 'finished_stock')">
                <div class="mt-4 text-lg leading-relaxed text-gray-600">
                  <span class="text-red-400"> Stokta tükenmiştir. </span>
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
                    class="flex inline-block text-left pt-0 md:pt-5"
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
                          v-model="customField.value"
                          class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
                          <template v-if="customField.value === undefined">
                            <option :value="undefined" disabled selected>
                              Lütfen bir değer seçiniz.
                            </option>
                          </template>
                          <template v-else-if="customField.value === ''">
                            <option :value="''" disabled selected>
                              Lütfen bir değer seçiniz.
                            </option>
                          </template>
                          <option
                            v-for="(item, ikey) in get(
                              customField,
                              'varyant',
                              []
                            )"
                            :key="ikey"
                            :disabled="item.stok <= 0"
                          >
                            {{ item.opsiyon }} (stok: {{ item.stok }})
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
                <!-- prettier-ignore -->
                <div
                  v-if="categoryNote"
                  class="block whitespace-pre-line mt-6 bg-gray-200 p-4 rounded-md inline-block"
                >{{ categoryNote }}
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
  async fetch() {
    try {
      this.product = await this.$strapi.$products.findOne(
        this.$route.params.id
      );
      this.activeImage = this.get(this.product.image, ".0.", null);
      this.categoryNote = this.get(
        this.product,
        "categories.0.category_notes",
        ""
      );
    } catch (error) {
      this.error = error;
    }
  },
  data() {
    return {
      product: null,
      categoryNote: null,
      error: null,
      activeImage: null,
      showValidMessage: false,
      animationId: null,
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
  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove",
    }),
    scrollToTop() {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 10) {
        this.animationId = window.requestAnimationFrame(this.scrollToTop);
        window.scrollTo(0, c - c / 8);
      } else {
        window.cancelAnimationFrame(this.animationId);
      }
    },
    selectImage(image) {
      this.activeImage = image;
      this.scrollToTop();
    },
    askExpert(product) {
      this.$nextTick(() => {
        const image = this.get(product, "image.0.formats.small.url");
        const title = this.get(product, "title", "Image");
        if (image) {
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

        window.$crisp.push(["do", "message:send", ["text", title]]);

        window.$crisp.push([
          "do",
          "message:send",
          ["text", "Merhaba, bu ürün hakkında bilgi almak istiyorum."],
        ]);
        window.$crisp.push(["do", "chat:open"]);
      });
    },
    validateAndAddToCart(item) {
      this.get(item, "Custom_field", []).forEach((field) => {
        if (field.required === true) {
          if (field.value === undefined) {
            this.showValidMessage = true;
          } else if (field.value === null) {
            this.showValidMessage = true;
          } else if (field.value === "") {
            this.showValidMessage = true;
          } else if (field.value === " ") {
            this.showValidMessage = true;
          }
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
