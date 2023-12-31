/**
 * profile service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::profile.profile', ({
  async addProfile(user, address, grade, studentNumber, uuid, phoneNumber) {
    const me = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        id: user.id
      },
      populate: {
        school: true
      }
    })
    if (!uuid) {
      // create profile
      let school = await strapi.db.query('api::school.school').findOne({
        where: { uuid: me.school.uuid },
      });

      let profile = await strapi.entityService.create('api::profile.profile', {
        data: {
          student: user,
          grade,
          studentNumber,
          email: user.email,
          phoneNumber,
          school,
          firstName: user.fullName.split(' ')[0],
          lastName: user.fullName.split(' ')[1],
          address
        },
        populate: {
          student: {
            fields: ['email', 'id'],
          }
        }
      });

      return profile
    } else {

    }
  }
}));
