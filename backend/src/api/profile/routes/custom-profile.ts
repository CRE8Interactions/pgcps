module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/profile/create-edit-profile',
      handler: 'profile.addOrUpdateProfile'
    },
  ]
}