import cookieparser from "cookieparser";
import Cookies from 'js-cookie'

export const state = () => ({
  redirectShowcase: true
})

export const actions = {
  nuxtServerInit({commit, state}, {ssrContext}) {
    if (process.server) {
      let cart = []
      let redirectShowcase = true
      if (ssrContext && ssrContext.req && ssrContext.req.headers && ssrContext.req.headers.cookie) {
        const parsed = cookieparser.parse(ssrContext.req.headers.cookie)
        cart = (parsed.cart && JSON.parse(parsed.cart)) || []
        redirectShowcase = (parsed.redirectShowcase && JSON.parse(parsed.redirectShowcase)) || false
      }
      commit('cart/setItems', cart)
      commit('redirectShowcase', redirectShowcase)
    }
  },
}

export const mutations = {
  redirectShowcase(state, status) {
    state.redirectShowcase = status
    Cookies.set('redirectShowcase', status)
  },
}