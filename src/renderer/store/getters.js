const getters = {
  sidebar: state => state.user.sidebar,
  device: state => state.user.device,
  routes: state => state.user.routes,
  userInfo: state => state.user.userInfo,
  sidebarLogo: state => state.user.sidebarLogo
}

export default getters
