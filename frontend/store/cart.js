import Cookies from "js-cookie";
import { get } from "~/utils/get";

export const state = () => ({
  items: [],
});

export const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  add(state, item) {
    const copy = {};
    copy.title = item.title || "";
    copy.id = item.id || null;
    copy.price = item.price || 0;
    copy.slug = item.slug || "/";
    copy.options = [];
    copy.image = [
      {
        url: get(item, "image.0.url"),
        formats: {
          large: {
            width: get(item, "image.0.formats.large.width"),
            height: get(item, "image.0.formats.large.height"),
            url: get(item, "image.0.formats.large.url"),
          },
          medium: {
            width: get(item, "image.0.formats.medium.width"),
            height: get(item, "image.0.formats.medium.height"),
            url: get(item, "image.0.formats.medium.url"),
          },
          small: {
            width: get(item, "image.0.formats.small.width"),
            height: get(item, "image.0.formats.small.height"),
            url: get(item, "image.0.formats.small.url"),
          },
          thumbnail: {
            width: get(item, "image.0.formats.thumbnail.width"),
            height: get(item, "image.0.formats.thumbnail.height"),
            url: get(item, "image.0.formats.thumbnail.url"),
          },
        },
      },
    ];

    if (item.Custom_field && item.Custom_field.length > 0) {
      item.Custom_field.forEach((o) => {
        copy.options.push({ title: o.title, value: o.value });
      });
    }

    const record = state.items.find((i) => i.id === copy.id);

    if (!record) {
      state.items.push({
        quantity: 1,
        ...copy,
      });
    } else {
      record.quantity++;
      if (record.options && record.options.length) {
        copy.options.forEach((c) => {
          record.options.push(c);
        });
      }
    }
    Cookies.set("cart", state.items);
  },
  remove(state, item) {
    const record = state.items.find((i) => i.id === item.id);

    if (record.quantity > 1) {
      record.quantity--;
    } else {
      const index = state.items.findIndex((i) => i.id === item.id);
      state.items.splice(index, 1);
    }
    Cookies.set("cart", state.items);
  },
  emptyList(state) {
    state.items = [];
    Cookies.set("cart", state.items);
  },
};

export const getters = {
  items: (state) => {
    return state.items;
  },
  price: (state) => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
  },
  numberOfItems: (state) => {
    return state.items.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
  },
};
