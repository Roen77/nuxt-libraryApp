<template>
  <div>
    <div class="bookshelf">
      <h2 v-if="getBooks[0].Hashtags[0]" class="tagname">
        #{{ getBooks[0].Hashtags[0].name }}
      </h2>
      <div v-if="hasBook " class="books">
        <div v-for="book in getBooks" :key="book.id" class="book">
          <BookCard :book="book" />
        </div>
      </div>
      <!-- books -->
      <BookPagination :total-page="totalPage" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import PaginationFetchMixin from '~/mixins/PaginationFetchMixin'
export default {
  mixins: [PaginationFetchMixin],
  watchQuery: ['name']

}
</script>

<style>
.tagname{display: inline-block; padding: 5px 10px; text-align: center; border-radius: 20px; background-color: skyblue; font-size: 20px;}
</style>
