module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/organization-approvals/approve',
      handler: 'organization-approval.approve'
    },
  ]
}