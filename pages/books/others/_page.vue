<template>
  <div class="bookshelf">
    <div class="head other_books">
      <h2>다른사람의 책장</h2>
    </div>
    <div v-if="hasBook">
      <div class="books">
        <div v-for="book in getBooks" :key="book.id" class="book">
          <BookCard :book="book" />
        </div>
      </div>
      <!-- books -->
      <BookPagination :total-page="totalPage" @pageFirst="pagination" @pagination="pagination" @pageLast="pagination" />
    </div>
    <div v-else>
      <BookEmpty />
    </div>
  </div>
</template>

<script>
import PaginationFetchMixin from '~/mixins/PaginationFetchMixin'
export default {
  mixins: [PaginationFetchMixin]

}
</script>

<style>
.head.other_books{display: flex;}
.head.other_books h2{margin-right: auto;}
.head.other_books .search_form{margin: 0; width: 600px;}
@media (max-width:900px) {
.head.other_books{display: block;}
.head.other_books h2{margin-bottom: 10px;;}
.head.other_books .search_form{width: 100%;}
}
</style>
