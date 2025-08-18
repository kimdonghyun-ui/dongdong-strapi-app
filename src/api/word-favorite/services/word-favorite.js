'use strict';

/**
 * word-favorite service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::word-favorite.word-favorite');
