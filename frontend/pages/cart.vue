<template>
  <div
    v-if="price <= 0"
    class="container mx-auto pt-10 md:pt-5 pb-10 md:pb-5 px-5 md:px-20"
  >
    <div>Sepetinizde ürün görünmemektedir.</div>
    <div class="text-gray-800 mt-5">
      <nuxt-link :to="'/'">
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current hover:text-black"
          >
            <path
              d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"
            ></path>
            <circle cx="10.5" cy="18.5" r="1.5"></circle>
            <circle cx="17.5" cy="18.5" r="1.5"></circle>
          </svg>
          <p>Alışverişe Devam Et</p>
        </div>
      </nuxt-link>
    </div>
  </div>
  <div v-else class="container mx-auto pt-10 md:pt-5 px-5 md:px-20">
    <div class="flex">
      <table class="table-auto w-full">
        <thead>
          <tr>
            <th
              class="hidden md:table-cell rounded-l-lg pl-1 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Ürün
            </th>
            <th
              class="py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Resim
            </th>
            <th
              class="py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Fiyat
            </th>
            <th
              class="py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Adet
            </th>
            <th
              class="rounded-r-lg py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              İşlem
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items">
            <td class="hidden md:table-cell border-b border-gray-200 text-sm">
              <span class="text-gray-900 whitespace-no-wrap">
                {{ get(item, "title") }}
              </span>
            </td>
            <td class="border-b border-gray-200 text-sm">
              <img
                alt="..."
                class="px-1 py-1 w-48 h-32 object-cover"
                :src="`${get(
                  item,
                  'image.0..formats.large.url',
                  get(item, 'image.0..formats.small.url', '')
                )}`"
              />
            </td>
            <td class="border-b border-gray-200 text-sm">
              <p class="text-gray-900 whitespace-no-wrap">
                {{ get(item, "price") }} TL
              </p>
            </td>
            <td
              class="border-b border-gray-200 text-right md:text-center pr-2 md:pr-0 text-sm"
            >
              <p class="text-gray-900 whitespace-no-wrap">
                {{ get(item, "quantity") }}
              </p>
            </td>
            <td class="border-b border-gray-200 text-sm">
              <span
                class="cursor-pointer relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight"
                @click="addToCart(item)"
              >
                <span
                  aria-hidden
                  class="absolute inset-0 bg-green-200 opacity-50 rounded-full cursor-pointer"
                ></span>
                <span class="cursor-pointer relative"><span>+</span> </span>
              </span>
              <span
                class="cursor-pointer relative inline-block px-2 py-1 font-semibold text-green-900 leading-tight"
                @click="removeFromCart(item)"
              >
                <span
                  aria-hidden
                  class="absolute inset-0 bg-red-200 opacity-50 rounded-full cursor-pointer"
                ></span>
                <span class="cursor-pointer relative"><span>-</span> </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-wrap mt-5 md:mt-10">
      <div class="w-full md:w-1/2">
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                İsim
              </label>
              <input
                id="grid-first-name"
                v-model="form.name"
                class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Kerim"
              />
              <p
                v-if="valid && !validation.name"
                class="text-red-500 text-xs italic"
              >
                Lütfen geçerli bir değer giriniz.
              </p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Soyisim
              </label>
              <input
                id="grid-last-name"
                v-model="form.surname"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Tunç"
              />
              <p
                v-if="valid && !validation.surname"
                class="text-red-500 text-xs italic"
              >
                Lütfen geçerli bir değer giriniz.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                E-posta
              </label>
              <input
                id="grid-password"
                v-model="form.email"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder="E-posta"
              />
              <p
                v-if="valid && !validation.email"
                class="text-red-500 text-xs italic"
              >
                Lütfen geçerli bir değer giriniz.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-phone"
              >
                Telefon
              </label>
              <input
                id="grid-phone"
                v-model.number="form.phone"
                maxlength="11"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="05355129219"
              />
              <p
                v-if="valid && !validation.phone"
                class="text-red-500 text-xs italic"
              >
                Lütfen geçerli bir değer giriniz.
              </p>
            </div>
          </div>
        </form>
      </div>
      <div class="w-full md:w-1/2">
        <form class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-0 md:mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-address"
              >
                Adres
              </label>
              <input
                id="grid-address"
                v-model="form.address"
                class="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="textarea"
                placeholder="Mihrişah Sok. No: 42 D:2"
              />
              <p
                v-if="valid && !validation.address"
                class="text-red-500 text-xs italic"
              >
                Lütfen geçerli bir değer giriniz.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Sehir
              </label>
              <input
                id="grid-city"
                v-model="form.city"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="İstanbul"
              />
              <p
                v-if="valid && !validation.city"
                class="text-red-500 text-xs italic"
              >
                Lütfen geçerli bir değer giriniz.
              </p>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-country"
              >
                Ulke
              </label>
              <div class="relative">
                <input
                  id="grid-country"
                  v-model="form.country"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Türkiye"
                />
                <p
                  v-if="valid && !validation.country"
                  class="text-red-500 text-xs italic"
                >
                  Lütfen geçerli bir değer giriniz.
                </p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-zip"
              >
                Posta Kodu
              </label>
              <input
                id="grid-zip"
                v-model.number="form.postcode"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                placeholder="34029"
              />
              <p
                v-if="valid && !validation.postcode"
                class="text-red-500 text-xs italic"
              >
                Lütfen geçerli bir değer giriniz.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="flex mb-10">
      <div class="pt-6 pl-1 md:pl-0">
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          name="button"
          @click="goShopier"
        >
          Alışverişi Tamamla ({{ price }} TL)
        </button>
        <div class="pt-2 pr-5 text-xs text-center">
          Ödeme için Shopier adresine yönlendirileceksiniz..
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { get } from "~/utils/get";

export default {
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        postcode: "",
      },
      valid: false,
    };
  },
  computed: {
    ...mapGetters({
      numberOfItems: "cart/numberOfItems",
      items: "cart/items",
      price: "cart/price",
    }),
    validation() {
      return {
        name: this.form.name !== "",
        surname: this.form.surname !== "",
        email:
          this.form.email !== "" &&
          this.form.email.includes("@") &&
          this.form.email.includes(".") &&
          this.form.email.length > 2,
        phone: this.form.phone.toString().length === 10,
        address: this.form.address !== "",
        city: this.form.city !== "",
        country: this.form.country !== "",
        postcode:
          this.form.postcode.toString().length === 5 ||
          this.form.postcode.toString().length === 6 ||
          this.form.postcode.toString().length === 7 ||
          this.form.postcode.toString().length === 8,
      };
    },
  },
  methods: {
    ...mapMutations({
      addToCart: "cart/add",
      removeFromCart: "cart/remove",
    }),
    get,
    async goShopier() {
      let isValid = true;
      for (const key in this.validation) {
        if (!this.validation[key]) {
          isValid = false;
        }
      }
      for (const key in this.validation) {
        if (!this.validation[key]) {
          isValid = false;
        }
      }
      if (!isValid) {
        this.valid = true;
        return;
      }
      const result = await this.$strapi.$http.$post("/shopier", {
        total_order_value: this.price,
        currency: "0",
        current_language: "0",
        buyer_name: this.form.name,
        buyer_surname: this.form.surname,
        buyer_email: this.form.email,
        buyer_phone: this.form.phone,
        billing_address: this.form.address,
        billing_city: this.form.city,
        billing_country: this.form.country,
        billing_postcode: this.form.postcode,
        shipping_address: this.form.address,
        shipping_city: this.form.city,
        shipping_country: this.form.country,
        shipping_postcode: this.form.postcode,
        items: this.items.map((i) => {
          return {
            id: i.id,
            title: i.title,
            price: i.price,
            quantity: i.quantity,
            options: i.options,
          };
        }),
      });
      document.write(`<html><body>${result}</body>`);
    },
  },
};
</script>
