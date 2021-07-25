
export const state = () => ({
  searchbooks: [],
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
  getsearchbooks (state) {
    return state.searchbooks
  },
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
  addBook (state, bookinfo) {
    const { data, reset } = bookinfo
    if (reset) {
      state.searchbooks = []
      state.meta = {}
    }
    data.documents.forEach((book) => {
      state.searchbooks.push(book)
    })
    state.searchbooks.forEach((book, index) => {
      book.id = index
    })
    state.meta = data.meta
  },
  initsearchBook (state) {
    state.searchbooks = []
    state.meta = {}
  },

  createBook (state, bookinfo) {
    state.books.unshift(bookinfo)
  },
  loadBooks (state, { books, page }) {
    state.books = [...books]
    state.currentPage = page
  },
  loadbook (state, bookinfo) {
    state.book = bookinfo
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
  addlike (state, likeInfo) {
    const { bookId, userId } = likeInfo
    const index = state.books.findIndex(book => book.id === bookId)
    state.books[index].Likers.push({ id: userId })
  },
  removelike (state, likeInfo) {
    const { bookId, userId } = likeInfo
    const index = state.books.findIndex(book => book.id === bookId)
    state.books[index].Likers = state.books[index].Likers.filter(like => like.id !== userId)
  },
  resetImgagePath (state) {
    state.imagePath = []
  },
  searchOption (state, option) {
    state.search.selectedOption = option
  },
  searchData (state, input) {
    state.search.data = input
  }
}
export const actions = {
  async SearchBooks ({ commit }, bookinfo) {
    try {
      const { size, query, reset, page } = bookinfo
      const api = `/books/search/kakao?query=${query}&size=${size}&page=${page}`
      let res
      // target에 따라 검색
      if (bookinfo.target) {
        res = await this.$axios.get(`${api}&target=${bookinfo.target}`)
      } else {
        // 통합검색
        res = await this.$axios.get(api)
      }
      commit('addBook', { data: res.data, reset })
    } catch (error) {
      console.error(error)
    }
  },
  async createBook (_, bookinfo) {
    console.log(bookinfo)
    const res = await this.$axios.post('/books/add', bookinfo)
    return res
  },
  async fetchBook ({ commit }, { id }) {
    const res = await this.$axios.get(`/books/${id}`)
    commit('loadbook', res.data.book)
    return res
  },
  async updateBook (_, bookinfo) {
    const res = await this.$axios.put(`/books/${bookinfo.id}`, bookinfo.data)
    return res
  },
  async deleteBook ({ commit }, { id }) {
    const res = await this.$axios.delete(`/books/${id}`)
    // commit('removebook', id)
    return res
  },
  async uploadImg ({ commit }, userinfo) {
    try {
      let res
      if (userinfo && userinfo.user) {
        res = await this.$axios.post('user/thumbnail', userinfo)
      } else {
        res = await this.$axios.post('books/thumbnail', userinfo)
      }
      console.log(res.data)
      commit('setThumbnail', res.data)
    } catch (error) {
      console.error(error)
    }
  },
  // 북마크
  async createBookmark ({ commit }, { bookId }) {
    try {
      await this.$axios.patch(`books/${bookId}/addbookmark`)
      commit('addBookmark', bookId)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteBookmark ({ commit }, { bookId }) {
    try {
      await this.$axios.patch(`books/${bookId}/removebookmark`)
      commit('removeBookmark', bookId)
    } catch (error) {
      console.error(error)
    }
  },
  // 해시태그
  async createHashtag ({ commit }, { bookId, hashtags }) {
    try {
      const res = await this.$axios.post(`books/${bookId}/addhashtags`, { hashtags })
      commit('addHashtag', res.data.hashtagList)
    } catch (error) {
      console.error(error)
    }
  },
  async deleteHashtag ({ commit }, { bookId, hashtagId }) {
    try {
      await this.$axios.delete(`books/${bookId}/removehashtag/${hashtagId}`)
      commit('removeHashtag', hashtagId)
    } catch (error) {
      console.error(error)
    }
  },
  async fetchBooks ({ commit }, bookInfo) {
    let res
    switch (bookInfo.route) {
      case 'books-page':
        res = await this.$axios.get(`/books?page=${bookInfo.page}`)
        break
      case 'books-others-page':
        res = await this.$axios.get(`books/others/book?page=${bookInfo.page}`)
        break
      case 'books-search-page':
        res = await this.$axios.get(`books/others/book?page=${bookInfo.page}&search=${bookInfo.search}&target=${bookInfo.target}`)
        break
      case 'hashtags-page':
        res = await this.$axios.get(`books/hashtags/${bookInfo.name}/?page=${bookInfo.page}`)
        break
      default:
        break
    }

    commit('loadBooks', { books: res.data.books, page: bookInfo.page })
    return res
  },
  async otherFetchBook ({ commit }, { id }) {
    const res = await this.$axios.get(`/books/others/book/${id}`)
    commit('loadbook', res.data.book)
    return res
  },
  // 다른사람책 좋아요
  async otheraddLike ({ commit }, { bookId }) {
    const res = await this.$axios.post(`/books/others/book/${bookId}/addLike`)
    commit('addlike', { bookId, userId: res.data.userId })
    return res
  },
  async otherremoveLike ({ commit }, { bookId }) {
    const res = await this.$axios.delete(`/books/others/book/${bookId}/removeLike`)
    commit('removelike', { bookId, userId: res.data.userId })
    return res
  }

}
