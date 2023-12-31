import { v4 as uuidv4 } from 'uuid';
import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::utility.utility', ({ strapi }) => ({
  async generateUUID() {
    return uuidv4()
  },
  async generateAlphaNumeric() {
    return Math.random().toString(36).slice(2)
  },
  async sendMessage(to, from, subject, details) {
    await strapi.plugin('email').service('email').send({
      to: to,
      from: from,
      subject: subject,
      text: details,
      html: details,
    });
  },
  async createAccessRequest(data) {
    await strapi.entityService.create('api::access-request.access-request', {
      data: {
        school: data.school,
        requestor: data
      },
      populate: {
        school: true,
        requestor: true
      }
    });
  }
}));