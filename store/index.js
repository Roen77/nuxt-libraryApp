
export const state = () => ({
  loading: false
})
export const mutations = {
  changeLoading (state, value) {
    state.loading = value
  }
}
export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('user/fetchUser')
  }
}
