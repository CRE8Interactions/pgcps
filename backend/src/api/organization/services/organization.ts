/**
 * organization service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::organization.organization', ({ strapi }) => ({
  async getAccessRequest(code) {
    const entry = await strapi.db.query('api::access-request.access-request').findOne({
      where: {
        $and: [
          { code: code },
          {status: 'pending'}
        ]
      },
      select: ['code', 'status'],
      populate: { 
        requestor: {
          select: ['fullName', 'email', 'type'],
          populate: {
            school: {
              select: ['name']
            }
          }
        }
      },
    });

    return entry
  },
  async approveAccessRequest(code) {
    const entry = await strapi.db.query('api::access-request.access-request').update({
      where: { 
        $and: [
          { status: 'pending' },
          { code: code }
        ]
       },
      data: {
       status: 'approved'
      },
      populate: {
        requestor: true,
        school: true
      }
    });

    let user = await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: entry.requestor.id },
      data: {
        isApproved: true,
      },
    });

    await strapi.service('api::utility.utility').sendMessage(user.email, 'donotreply@pgcps.org', `SPRY ${user.type} access approved`, `Your request to join ${entry.school.name} as an ${user.type} has been approved please login <a href=${process.env.CLIENT_HOST}/login>Here</a> to complete setup.`)

    return entry
  },
  async approve(id) {
    const entry = await strapi.db.query('api::service-hour-log.service-hour-log').update({
      where: {
        $and: [
          { id: id },
          { status: 'pendingApproval'}
        ]
      },
      data: {
        status: 'approved'
      },
      populate: {
        student: true
      }
    });

    await strapi.service('api::utility.utility').sendMessage(entry.student.email, 'donotreply@pgcps.org', `SPRY service hours approved`, `Your ${entry.hoursOfService} service hours for ${entry.serviceOrganization} has been approved.`)

    return entry
  }
}));
