'use strict';

/**
 * food-review service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::food-review.food-review');
