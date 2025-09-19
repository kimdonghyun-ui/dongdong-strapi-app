'use strict';

/**
 * crawl controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::crawl.crawl');
