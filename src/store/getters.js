export const getters = {
  getName (state) { return state.name},
  getBaseUrl (state) {return state.baseUrl},
  getSelectRoute (state) {return state.selectedRoute},
  getOpenId (state) {return state.openid},
  getUserInfo (state) {return state.userInfo},
  getDev (state) {return state.dev}
}
