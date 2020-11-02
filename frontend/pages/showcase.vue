<template>
  <div
    class="mx-auto bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-10 w-full h-screen"
  >
    <div class="f-center w-full pb-0 md:pb-6">
      <nuxt-link
        class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
        :to="'/'"
      >
        <img src="~/static/logo.svg" alt="logo" />
      </nuxt-link>
    </div>
    <div class="f-center">
      <div class="w-5/6 md:w-1/4">
        <GameCardsStack
          :cards="visibleCards"
          @cardAccepted="handleCardAccepted"
          @cardRejected="handleCardRejected"
          @cardSkipped="handleCardSkipped"
          @hideCard="removeCardFromDeck"
        />
      </div>
    </div>
    <div class="">
      <div class="f-center w-full absolute bottom-0 pb-4 md:pb-32">
        <nuxt-link :to="'/'">
          <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Siteye Git >
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import GameCardsStack from "~/components/card/GameCardStack";
import { get } from "~/utils/get";

export default {
  layout: "no",
  components: {
    GameCardsStack,
  },
  async fetch() {
    const showcase = await this.$strapi.find("showcase");
    const cards = get(showcase, "showcase_image", []).map((item, index) => {
      return {
        key: index,
        title: item.title,
        image: item.url,
      };
    });
    this.visibleCards = JSON.parse(JSON.stringify(cards));
    this.$store.commit("redirectShowcase", false);
  },
  data() {
    return {
      visibleCards: [],
    };
  },
  watch: {
    visibleCards() {
      if (this.visibleCards.length === 0) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    handleCardAccepted() {
      console.log("handleCardAccepted");
    },
    handleCardRejected() {
      console.log("handleCardRejected");
    },
    handleCardSkipped() {
      console.log("handleCardSkipped");
    },
    removeCardFromDeck() {
      this.visibleCards.shift();
    },
  },
};
</script>

<style scoped>
.f-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
