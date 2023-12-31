module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/organizations/access-request',
      handler: 'organization.getAccessRequest'
    },
    {
      method: 'POST',
      path: '/organizations/approve-request',
      handler: 'organization.approveAccessRequest'
    }
  ]
}