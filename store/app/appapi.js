const app = {
  namespaced: true,
  state: { quickLook: null },
  actions: {},
  mutations: {
    setQuickLook(state, val) {
      state.quickLook = val
    }
  }
}
export default app
