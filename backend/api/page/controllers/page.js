'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query.lite) {
      entities = await strapi.services.page.find(ctx.query, ['title', 'slug']);
    } else {
      entities = await strapi.services.page.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.page }));
  },
};
