/**
 * organization-approval controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::organization-approval.organization-approval', ({ strapi }) => ({
  async approve(ctx) {
    const { id } = ctx.query
    
    const entry = await strapi.db.query('api::organization-approval.organization-approval').findOne({
      where: {
        $and: [
          { id: id },
          { approved: null }
        ]
      },
      populate: { 
        student: {
          select: ['fullName']
        } ,
        service_hour_log: true
      },
    });

    if (entry) {
        return ctx.body = {
          status: 200,
          message: 'Request found',
          data: entry
        }
      } else {
        return ctx.body = {
          status: 400,
          message: 'No approval found with code provided',
        }
      }
  }
}));
