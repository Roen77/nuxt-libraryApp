<template>
  <div class="bookshelf">
    <div class="head search_result other_books">
      <h2>{{ getSearch.data }} 검색 결과</h2>
      <b>{{ dataCount }}</b>
    </div>
    <div v-if="hasBook">
      <div class="books">
        <div v-for="book in getBooks" :key="book.id" class="book">
          <BookCard :book="book" />
        </div>
      </div>
      <!-- books -->
      <BookPagination :total-page="totalPage" @pagination="pagination" />
    </div>
    <div v-else>
      <BookEmpty />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import PaginationFetchMixin from '~/mixins/PaginationFetchMixin'
export default {
  mixins: [PaginationFetchMixin],
  computed: {
    ...mapGetters('books', ['getSearch']),
    dataCount () {
      return this.getBooks.length ? this.total : '검색된 책이 없습니다.'
    }
  },
  watch: {
    '$route.query': {
      handler (query) {
        this.updateSearch({
          data: query.target,
          selectedOption: query.search
        })
      },
      deep: true,
      immediate: true
    }
  },
  watchQuery: ['search', 'target'],
  methods: {
    ...mapMutations('books', ['updateSearch'])

  }
}
</script>

<style>
.head.search_result{ align-items: center;}
</style>
