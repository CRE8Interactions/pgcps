/**
 * profile controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
  async addOrUpdateProfile(ctx) {
    const user = ctx.state.user
    const { address, grade, studentNumber, uuid, phoneNumber } = ctx.request.body;
    let profile = await strapi.service('api::profile.profile').addProfile(user, address, grade, studentNumber, uuid, phoneNumber)
    return profile
  }
}));
