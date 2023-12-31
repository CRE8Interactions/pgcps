/**
 * school controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::school.school', ({ strapi}) => ({
  async find(ctx) {
    const schools = await strapi.db.query('api::school.school').findMany({
      where: { type: 'high' },
    });

    return schools
  }
}));
