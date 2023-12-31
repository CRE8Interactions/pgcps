/**
 * service-hour-log controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::service-hour-log.service-hour-log', ({ strapi }) => ({
  async create(ctx) {
    let user = ctx.state.user;
    let data = ctx.request.body;
    let serviceHours = await strapi.service('api::service-hour-log.service-hour-log').createHours(user, data, ctx)
    return serviceHours
  },
  async find(ctx) {
    let user = ctx.state.user;
    let entries;
    if (user.role.name.toLowerCase() === "student") {
      let data: any;
      data = await strapi.entityService.findMany('api::service-hour-log.service-hour-log', {
        sort: { dateOfService: 'desc' },
        populate: { 
          student: {
            filters: { id: user.id }
          }
        },
      });

      entries = data.filter((entry: any) => entry.student?.email == user.email)
    } else {
      entries = await strapi.entityService.findMany('api::service-hour-log.service-hour-log', {});
    }
    return entries
  }
}));
