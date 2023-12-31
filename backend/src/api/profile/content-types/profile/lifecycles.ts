module.exports = {
  async beforeCreate(event) {
    const { result, params } = event;
    params.data.uuid = await strapi.service('api::utility.utility').generateUUID()
  },
  async afterCreate(event) {
    const { result, params } = event;
    // Add profile to user account
    await strapi.db.query('plugin::users-permissions.user').update({
      where: { id: result.student.id },
      data: {
        profile: result,
      },
    });
  }
};