module.exports = {
  async beforeCreate(event) {
    const { result, params } = event;
    params.data.uuid = await strapi.service('api::utility.utility').generateUUID()
  },
};