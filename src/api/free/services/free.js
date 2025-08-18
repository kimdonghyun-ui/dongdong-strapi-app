'use strict';

/**
 * free service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::free.free');
