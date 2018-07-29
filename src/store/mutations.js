export const mutations = {
  CHANG_NAME_STATE (state, name) {
    state.name = name
  },
  SELECT_ROUTE (state,route) {
    state.selectedRoute = route;
  },
  CHAGE_OPEN_ID (state, openid) {
    state.openid = openid;
  },
  CHANGE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo;
  }
}
