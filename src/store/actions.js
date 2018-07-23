export const actions = {
  changeName ({commit}, name) {
    commit('CHANG_NAME_STATE', name)
  },
  changeRoute ({commit}, route) {
    commit('SELECT_ROUTE', route)
  }
}
