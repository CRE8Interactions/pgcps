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

    user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        id: user.id
      },
      populate: {
        school: true,
        role: true,
      }
    })

    let entries;

    if (user.role.name.toLowerCase() === "student") {
      let data: any;
      data = await strapi.entityService.findMany('api::service-hour-log.service-hour-log', {
        sort: { dateOfService: 'desc' },
        populate: { 
          student: {
            filters: { id: user.id }
          },
          organization_approval: true,
        },
      });

      entries = data.filter((entry: any) => entry.student?.email == user.email)
    } else {
      let data = await strapi.entityService.findMany('api::service-hour-log.service-hour-log', {
        populate: {
          student: {
            populate: {
              profile: true
            }
          },
          school: {
            filters: { id: user.school.id}
          },
          organization_approval: true,
        }
      });

      entries = (data as any[]).filter((entry: any) => entry?.school?.id == user?.school?.id )
    }
    return entries
  }
}));
