export const actions = {
  changeName ({commit}, name) {
    commit('CHANG_NAME_STATE', name)
  },
  changeRoute ({commit}, route) {
    commit('SELECT_ROUTE', route)
  },
  changeOpenId ({commit}, openid) {
    commit('CHAGE_OPEN_ID', openid)
  },
  changeUserInfo ({commit}, userInfo) {
    commit('CHANGE_USER_INFO', userInfo)
  },
  changeDev ({commit}, dev) {
    commit('CHANGE_DEV', dev)
  }
}

