export default ({ env }) => ({
  'paper-trail': {
    enabled: true
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'mailcatcher',
        port: 1025,
        ignoreTLS: true,
      },
      settings: {
        defaultFrom: 'donotreply@pgcps.org',
        defaultReplyTo: 'donotreply@pgcps.org',
      },
    },
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["type", "school", "fullName"],
      },
    },
  },
});