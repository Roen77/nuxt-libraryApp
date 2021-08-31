import { mapGetters, mapActions } from 'vuex'
export default {
  async asyncData ({ store, params, route }) {
    try {
      let total
      let totalPage
      const page = params.page
      let data = { page: page - 1, route: route.name }
      if (route.name === 'books-search-page') {
        console.log('실제데이터 확인', route.query.target)
        data = { ...data, search: encodeURIComponent(route.query.search), target: encodeURIComponent(route.query.target) }
      } else if (route.name === 'hashtags-page') {
        data = { ...data, name: encodeURIComponent(route.query.name) }
      }
      await store.dispatch('books/fetchBooks', data)
        .then((res) => {
          total = res.data.totalCount
          totalPage = res.data.totalPage
        })
      return { total, totalPage }
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    ...mapGetters('books', ['getBooks']),
    hasBook () {
      return this.getBooks.length
    }
  },
  methods: {
    ...mapActions('books', ['fetchBooks']),
    pagination (page) {
      switch (this.$route.name) {
        case 'books-page':
          return this.$router.push(`/books/${page}`)
        case 'books-others-page':
          return this.$router.push(`/books/others/${page}`)
        case 'books-search-page':
          return this.$router.push(`/books/search/${page}?search=${this.getSearch.selectedOption}&target=${encodeURIComponent(this.getSearch.data)}`)
        case 'hashtags-page':
          return this.$router.push(`/books/hashtags/${page}?name=${this.$route.query.name}`)
        default:
          break
      }
    }

  }
}
