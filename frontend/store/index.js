import cookieparser from "cookieparser";

export const actions = {
  nuxtServerInit({ commit, state }, { ssrContext }) {
    if (process.server) {
      let cart = [];
      if (
        ssrContext &&
        ssrContext.req &&
        ssrContext.req.headers &&
        ssrContext.req.headers.cookie
      ) {
        const parsed = cookieparser.parse(ssrContext.req.headers.cookie);
        cart = (parsed.cart && JSON.parse(parsed.cart)) || [];
      }
      commit("cart/setItems", cart);
    }
  },
};
