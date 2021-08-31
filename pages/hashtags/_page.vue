<template>
  <div>
    <div class="bookshelf">
      <h2 class="tagname">
        #{{ tagName }}
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
  head () {
    return {
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: this.tagName },
        { hid: 'og:site_name', property: 'og:site_name', content: 'library App' },
        { hid: 'og:description', property: 'og:description', content: this.tagName },
        { hid: 'og:url', property: 'og:url', content: `https://vue.roen.pe.kr${this.$route.fullPath}` }
      ]
    }
  },
  computed: {
    tagName () {
      return this.getBooks[0].Hashtags[0] ? this.getBooks[0].Hashtags[0].name : ''
    }
  },
  watchQuery: ['name']

}
</script>

<style>
.tagname{display: inline-block; padding: 5px 10px; text-align: center; border-radius: 20px; background-color: skyblue; font-size: 20px;}
</style>
