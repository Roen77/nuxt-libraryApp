export const state = () => ({
  comments: [],
  commentPage: {
    commentCount: 0,
    end: false
  }
})
export const getters = {
  getComments (state) {
    return state.comments
  },
  getCommentPage (state) {
    return state.commentPage
  }
}
export const mutations = {
  // comment
  loadComments (state, commentInfo) {
    console.log('zjjjjj커ㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ미ㅛ')
    const { data, init } = commentInfo
    if (init) {
      state.comments = [...data.comments]
    } else {
      data.comments.forEach((comment) => {
        state.comments.push(comment)
      })
    }
    state.commentPage.end = data.end
    state.commentPage.commentCount = data.commentCount
  },
  createComment (state, comment) {
    state.comments.unshift(comment)
    state.commentPage.commentCount++
  },
  removeComment (state, id) {
    state.comments = state.comments.filter(comment => comment.id !== id)
    state.commentPage.commentCount--
  },
  resetComment (state) {
    state.comments = []
  }
}
export const actions = {
  // 코멘트
  async fetchComments ({ commit, state }, comments) {
    console.log('일단 함수 호출 이거일단개무시함ㅋ')
    try {
      let res
      if (comments.init) {
        // 삭제시 다시 10개 댓글 가져오도록 하기(단 총 댓글갯수가 10개 미만이면 굳이 가져올 필요없음)
        if (comments.removeState && state.commentPage.commentCount < 10) { return }
        console.log('일단 리셋하기전호출되는건지?', comments.bookId, '개같네??')
        // commit('resetComment')
        console.log('호출이안되는건지...?')
        res = await this.$axios.get(`books/${comments.bookId}/comments?limit=10`)
        console.log(res, '데이터확인좀')
      } else {
        const lastComment = state.comments && state.comments[state.comments.length - 1]
        console.log('라스트 코멘트 추가호출됨', lastComment)
        res = await this.$axios.get(`books/${comments.bookId}/comments?lastId=${lastComment && lastComment.id}&limit=10&page=${comments.page}`)
      }

      commit('loadComments', { data: res.data, init: comments.init })
      return res
    } catch (error) {
      console.error(error)
    }
  },
  async createComment ({ commit }, { bookId, comments, rating }) {
    try {
      const res = await this.$axios.post(`books/${bookId}/comment`, { comments, rating: parseInt(rating, 10) })
      commit('createComment', res.data.comment)
      return res
    } catch (error) {
      console.error(error)
    }
  },
  async deleteComment ({ commit, dispatch, state }, comment) {
    try {
      const res = await this.$axios.delete(`books/${comment.bookId}/comment/${comment.commentId}`)
      commit('removeComment', comment.commentId)
      if (state.comments.length < 10) {
        dispatch('fetchComments', { bookId: comment.bookId, init: true, removeState: true })
      }
      return res
    } catch (error) {
      console.error(error)
    }
  }
}
