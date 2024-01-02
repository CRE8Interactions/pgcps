/**
 * service-hour-log service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::service-hour-log.service-hour-log', ({ strapi }) => ({
  async createHours(user, data, ctx) {
    let entry;
    user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        id: user.id
      },
      populate: {
        school: {
          populate: {
            organization: true
          }
        }
      }
    })

    try {
      entry = await strapi.entityService.create('api::service-hour-log.service-hour-log', {
      data: {
        organization: user.school.organization,
        school: user.school,
        student: user,
        submissionDate: new Date().toISOString(),
        dateOfService: new Date(data.dateOfService).toISOString(),
        serviceOrganization: data.serviceOrganization.toLowerCase().trim(),
        organizationContact: data.organizationContact.toLowerCase().trim(),
        hoursOfService: Number(data.hoursOfService),
        SSLpreparation: data.SSLpreparation.trim(),
        SSLactivity: data.SSLactivity.trim(),
        SSLreflection: data.SSLreflection.trim()
      },
    });
      return ctx.body = {
        status: 200,
        message: 'Hours created',
        data: entry
      }
    } catch (e) {
      return ctx.body = {
        status: 400,
        message: 'Validation error',
        data: e
      }
    }
  }
}));
