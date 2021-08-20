
export const state = () => ({
  user: {}
})
export const getters = {
  getUser (state) {
    return state.user
  },
  gettest (state) {
    return state.test
  },
  getUserThumbnail (state) {
    return state.userThumbnail
  }

}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }

}
export const actions = {
  async fetchUser ({ commit }) {
    try {
      const res = await this.$axios.get('user')
      commit('setUser', res.data)
    } catch (error) {
      console.error(error)
    }
  },
  async login ({ commit }, userData) {
    const res = await this.$axios.post('user/login', userData)
    commit('setUser', res.data)
  },
  async register ({ commit }, userData) {
    const res = await this.$axios.post('user/register', userData)
    commit('setUser', res.data)
  },
  async logout ({ commit }, userData) {
    try {
      await this.$axios.get('user/logout', userData)
      commit('setUser', null)
    } catch (error) {
      console.error(error)
    }
  },
  async updateProfile ({ commit }, userData) {
    try {
      const res = await this.$axios.put('user', userData)
      commit('setUser', res.data.user)
    } catch (error) {
      console.error(error)
    }
  },
  async updatePassword (_, userData) {
    try {
      await this.$axios.patch('user', userData)
    } catch (error) {
      console.error(error)
    }
  }

}
