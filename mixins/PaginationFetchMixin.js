import { mapGetters, mapActions } from 'vuex'
export default {
  async asyncData ({ store, params, route }) {
    try {
      let total
      let totalPage
      const page = params.page
      let data = { page: page - 1, route: route.name }
      if (route.name === 'books-search-page') {
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
    } catch (error) {
      console.error(error)
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
    pagination (index) {
      switch (this.$route.name) {
        case 'books-page':
          return this.$router.push(`/books/${index + 1}`)
        case 'books-others-page':
          return this.$router.push(`/books/others/${index + 1}`)
        case 'books-search-page':
          return this.$router.push(`/books/search/${index + 1}?search=${this.getSearch.selectedOption}&target=${this.getSearch.data}`)
        case 'hashtags-page':
          return this.$router.push(`/books/hashtags/${index + 1}?name=${this.$route.query.name}`)
        default:
          break
      }
    }

  }

}
