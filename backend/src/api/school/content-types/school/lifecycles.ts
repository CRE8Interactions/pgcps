module.exports = {
  async beforeCreate(event) {
    const { result, params } = event;
    params.data.uuid = await strapi.service('api::utility.utility').generateUUID()
  },
  async afterCreate(event) {
    const { result, params } = event;

    const org = await strapi.db.query('api::organization.organization').findOne({
      where: { id: params.data.organization.id },
      populate: { schools: true },
    });

    let schools = [...org.schools, result]

    await strapi.db.query('api::organization.organization').update({
      where: { id: org.id },
      data: {
        schools
      }
    });

  },
};