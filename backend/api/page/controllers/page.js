'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');


module.exports = {
  menu: async ctx => {
    let entities;
    entities = await strapi.services.page.find(ctx.query);

    return entities.map(entity => {
      const page = sanitizeEntity(entity, {
        model: strapi.models.page,
      });

      delete page.body;

      return page;
    });
  }
};
