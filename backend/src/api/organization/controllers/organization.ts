/**
 * organization controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::organization.organization', ({ strapi }) => ({
  async getAccessRequest(ctx) {
    const { code } = ctx.request.query

    if (code) {
      let entry = await strapi.service('api::organization.organization').getAccessRequest(code)

      if (entry) {
        return ctx.body = {
          status: 200,
          message: 'Request found',
          data: entry
        }
      } else {
        return ctx.body = {
          status: 400,
          message: 'No pending request found with code provided',
        }
      }
    } else {
      return ctx.body = {
          status: 400,
          message: 'No code provided',
        }
    }
  },
  async approveAccessRequest(ctx) {
    const { code } = ctx.request.body

    if (code) {
      let entry = await strapi.service('api::organization.organization').approveAccessRequest(code)

      if (entry) {
        return ctx.body = {
          status: 200,
          message: 'Approval Successful'
        }
      } else {
        return ctx.body = {
        status: 400,
        message: 'Unable to approve request',
      }
      }
    } else {
      return ctx.body = {
        status: 400,
        message: 'No code provided',
      }
    }
  }
}));
