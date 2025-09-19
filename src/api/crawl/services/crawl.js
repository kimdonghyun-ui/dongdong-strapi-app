'use strict';

/**
 * crawl service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::crawl.crawl');
