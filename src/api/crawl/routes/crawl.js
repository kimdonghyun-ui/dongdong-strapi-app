'use strict';

/**
 * crawl router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::crawl.crawl');
