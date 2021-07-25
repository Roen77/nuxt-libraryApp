
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
  async login ({ commit }, userinfo) {
    const res = await this.$axios.post('user/login', userinfo)
    commit('setUser', res.data)
  },
  async register ({ commit }, userinfo) {
    const res = await this.$axios.post('user/register', userinfo)
    commit('setUser', res.data)
  },
  async logout ({ commit }, userinfo) {
    try {
      const res = await this.$axios.get('user/logout', userinfo)
      commit('setUser', null)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  },
  async updateProfile ({ commit }, userinfo) {
    try {
      const res = await this.$axios.put('user', userinfo)
      console.log(res.data)
      commit('setUser', res.data.user)
    } catch (error) {
      console.error(error)
    }
  },
  async updatePassword (_, userinfo) {
    try {
      const res = await this.$axios.patch('user', userinfo)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

}
