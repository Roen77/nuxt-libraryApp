
export const state = () => ({
  // search meta
  meta: {},
  books: [],
  book: {},
  currentPage: 0,
  imagePath: '',
  search: {
    data: '',
    selectedOption: '책제목'
  }
})
export const getters = {
  getmeta (state) {
    return state.meta
  },
  getBook (state) {
    return state.book
  },
  getBooks (state) {
    return state.books
  },
  getCurrentPage (state) {
    return state.currentPage
  },
  getImagePath (state) {
    return state.imagePath
  },
  getSearch (state) {
    return state.search
  }
}
export const mutations = {
  addBook (state, bookData) {
    const { data, reset } = bookData
    // 초기화
    if (reset) {
      state.books = []
      state.meta = {}
    }
    data.documents.forEach((book) => {
      state.books.push(book)
    })
    state.meta = data.meta
  },
  initsearchBook (state) {
    state.books = []
    state.meta = {}
  },

  createBook (state, bookData) {
    state.books.unshift(bookData)
  },
  loadBooks (state, { books, page }) {
    state.books = [...books]
    state.currentPage = page
  },
  loadbook (state, bookData) {
    state.book = bookData
  },
  setThumbnail (state, image) {
    state.imagePath = image
  },
  removeThumbnail (state) {
    state.imagePath = []
  },
  // 북마크
  addBookmark (state, bookId) {
    const index = state.books.findIndex(book => book.id === bookId)
    state.books[index].bookmark = true
  },
  removeBookmark (state, bookId) {
    const index = state.books.findIndex(book => book.id === bookId)
    state.books[index].bookmark = false
  },
  // 해시태그
  addHashtag (state, hashtagList) {
    state.book.Hashtags = state.book.Hashtags.concat(hashtagList)
  },
  removeHashtag (state, hashtagId) {
    state.book.Hashtags = state.book.Hashtags.filter(tag => tag.id !== hashtagId)
  },
  // 좋아요
  addlike (state, likeData) {
    const { bookId, userId } = likeData
    const index = state.books.findIndex(book => book.id === bookId)
    state.books[index].Likers.push({ id: userId })
  },
  removelike (state, likeData) {
    const { bookId, userId } = likeData
    const index = state.books.findIndex(book => book.id === bookId)
    state.books[index].Likers = state.books[index].Likers.filter(like => like.id !== userId)
  },
  resetImgagePath (state) {
    state.imagePath = []
  },
  updateSearch (state, payload) {
    // eslint-disable-next-line
    Object.keys(payload).forEach(key => state.search[key] = payload[key])
  }
}
export const actions = {
  async SearchBooks ({ commit, rootState }, bookData) {
    const { size, query, reset, page } = bookData
    try {
      if (rootState.inintLoading) { return }
      // 맨 처음에 데이터를 불러올 때 로딩 스피너를 보여줍니다.
      if (reset) { commit('changeLoading', true, { root: true }) }
      const api = `/books/search/kakao?query=${query}&size=${size}&page=${page}`
      let res
      // target에 따라 검색(target의 내용에 따라 검색하는 API를 호출)
      if (bookData.target) {
        res = await this.$axios.get(`${api}&target=${bookData.target}`)
      } else {
        // 통합검색(target과 상관없이 "제목","출판사","저자" 등 과 관련없이 모든 요소에서 검색한 API를 호출)
        res = await this.$axios.get(api)
      }
      commit('addBook', { data: res.data, reset })
    } catch (error) {
      console.error(error)
    } finally {
      // 로딩 스피너 종료
      if (reset) {
        setTimeout(() => commit('changeLoading', false, { root: true }), 400)
      }
    }
  },
  // 책 추가
  async createBook (_, bookData) {
    const res = await this.$axios.post('/books/add', bookData)
    return res
  },
  // 단일 책 데이터 불러오기
  async fetchBook ({ commit }, { id }) {
    const res = await this.$axios.get(`/books/${id}`)
    commit('loadbook', res.data.book)
    return res
  },
  // 책 수정
  async updateBook ({ commit }, bookData) {
    const res = await this.$axios.put(`/books/${bookData.id}`, bookData.data)
    commit('loadbook', res.data.book)
    return res
  },
  // 책 삭제
  async deleteBook (_, { id }) {
    const res = await this.$axios.delete(`/books/${id}`)
    return res
  },
  // 이미지 업로드
  async uploadImg ({ commit }, payload) {
    try {
      let res
      if (payload && payload.user) {
        res = await this.$axios.post('user/thumbnail', payload)
      } else {
        res = await this.$axios.post('books/thumbnail', payload)
      }
      commit('setThumbnail', res.data)
    } catch (error) {
      console.error(error)
    }
  },
  // 북마크 추가
  async createBookmark ({ commit }, { bookId }) {
    try {
      await this.$axios.patch(`books/${bookId}/addbookmark`)
      commit('addBookmark', bookId)
    } catch (error) {
      console.error(error)
    }
  },
  // 북마크 삭제
  async deleteBookmark ({ commit }, { bookId }) {
    try {
      await this.$axios.patch(`books/${bookId}/removebookmark`)
      commit('removeBookmark', bookId)
    } catch (error) {
      console.error(error)
    }
  },
  // 해시태그 추가
  async createHashtag ({ commit }, { bookId, hashtags }) {
    try {
      const res = await this.$axios.post(`books/${bookId}/addhashtags`, { hashtags })
      commit('addHashtag', res.data.hashtagList)
    } catch (error) {
      console.error(error)
    }
  },
  // 해시태그 삭제
  async deleteHashtag ({ commit }, { bookId, hashtagId }) {
    try {
      await this.$axios.delete(`books/${bookId}/removehashtag/${hashtagId}`)
      commit('removeHashtag', hashtagId)
    } catch (error) {
      console.error(error)
    }
  },
  // 책 데이터 가져오기
  async fetchBooks ({ commit }, bookData) {
    const { route, page, search, target, name } = bookData
    let res
    switch (route) {
      case 'books-page':
        res = await this.$axios.get(`/books?page=${page}`)
        break
      case 'books-others-page':
        res = await this.$axios.get(`books/others/book?page=${page}`)
        break
      case 'books-search-page':
        res = await this.$axios.get(`books/others/book?page=${page}&search=${search}&target=${target}`)
        break
      case 'hashtags-page':
        res = await this.$axios.get(`books/hashtags/${name}/?page=${page}`)
        break
      default:
        break
    }
    commit('loadBooks', { books: res.data.books, page })
    return res
  },
  // 다른 사용자의 책(단일) 불러오기
  async otherFetchBook ({ commit }, { id }) {
    const res = await this.$axios.get(`/books/others/book/${id}`)
    commit('loadbook', res.data.book)
    return res
  },
  // 다른 사용자의 책 좋아요 추가
  async otheraddLike ({ commit }, { bookId }) {
    const res = await this.$axios.post(`/books/others/book/${bookId}/addLike`)
    commit('addlike', { bookId, userId: res.data.userId })
    return res
  },
  // 다른 사용자의 책 좋아요 제거
  async otherremoveLike ({ commit }, { bookId }) {
    const res = await this.$axios.delete(`/books/others/book/${bookId}/removeLike`)
    commit('removelike', { bookId, userId: res.data.userId })
    return res
  }

}
