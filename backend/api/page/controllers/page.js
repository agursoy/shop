'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  menu: async ctx => {
    const result = await strapi
      .query('page')
      .model.fetchAll({ columns: ['title', 'slug'] })
    ctx.send(result);
  }
};
