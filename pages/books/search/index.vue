<template>
  <div class="search-area">
    <!-- form-search -->
    <form-search v-model="search" :options="options" @searchBook="onSearchBook" @selectedOption="onSeletedOption"></form-search>
    <div v-if="errmsg" class="err book_search">
      검색 내용을 입력해주세요.
    </div>
    <!-- search-content -->
    <div class="search-content">
      <h2>
        총 {{ meta.pageable_count }} 검색
      </h2>
      <h3 v-if="books.length === 0 && meta && meta.pageable_count === 0">
        검색 결과가 없습니다.
      </h3>
      <div v-for="(book,index) in books" :key="index" class="search_book">
        <!-- book-card-detail -->
        <book-card-detail :book="book"></book-card-detail>
        <button class="round-btn addbtn red" @click="onaddBook(book)">
          추가하기
        </button>
      </div>
    </div>
    <!-- 더보기 버튼 -->
    <div v-if="showbtn" ref="btn" class="btn">
      <div v-if="loading" class="loading-spin">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <div v-else>
        <button class="round-btn fill more-btn" @click=" addFetchBook">
          {{ currentCount }} / {{ meta.pageable_count }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import bus from '~/utils/bus.js'
export default {
  data () {
    return {
      options: ['통합', '제목', '저자', '출판사', 'isbn'],
      option: '',
      search: '',
      errmsg: false,
      size: 20,
      isend: false,
      reset: false,
      currentpage: 1,
      showbtn: false,
      currentCount: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters({ books: 'books/getsearchbooks', meta: 'books/getmeta' })
  },
  methods: {
    ...mapMutations('book', ['initBook']),
    ...mapActions('books', ['SearchBooks', 'createBook']),
    onSearchBook () {
      this.resetBook(true)
      this.currentpage = 1
      this.currentCount = 0
      this.onFetchbook()
    },
    onFetchbook () {
      if (this.search.length <= 0) {
        this.errmsg = true
        return
      }
      let bookinfo = { size: this.size, query: this.search, page: this.currentpage, reset: this.reset }
      switch (this.option) {
        case '통합':
          bookinfo = { ...bookinfo }
          break
        case '제목':
          bookinfo = { ...bookinfo, target: 'title' }
          break
        case '저자':
          bookinfo = { ...bookinfo, target: 'person' }
          break
        case '출판사':
          bookinfo = { ...bookinfo, target: 'publisher' }
          break
        case 'isbn':
          bookinfo = { ...bookinfo, target: 'isbn' }
          break
        default:
          break
      }
      this.loading = true
      this.SearchBooks(bookinfo)
        .then(() => {
          this.errmsg = false
          this.currentCount += this.size
          this.isend = this.meta.is_end
          this.showbutton()
          this.loading = false
        })
    },
    addFetchBook () {
      if (!this.isend) {
        this.currentpage++
        this.resetBook(false)
        this.onFetchbook()
      }
    },
    bookauthors (authors) {
      return authors.join(',')
    },
    resetBook (boolean) {
      this.reset = boolean
    },
    showbutton () {
      this.isend ? this.showbtn = false : this.showbtn = true
    },
    async onaddBook (book) {
      try {
        const bookinfo = { title: book.title, contents: book.contents, datetime: book.datetime, isbn: book.isbn, publisher: book.publisher, thumbnail: book.thumbnail, url: book.url, authors: this.bookauthors(book.authors) }
        await this.createBook(bookinfo)
          .then((res) => {
            bus.$emit('on:alert', res.data.msg)
            setTimeout(() => {
              bus.$emit('off:alert')
            }, 3000)
          })
      } catch (error) {
        console.log(error)
        bus.$emit('on:alert', error.response.data.msg)
        setTimeout(() => {
          bus.$emit('off:alert')
        }, 3000)
      }
    },
    onSeletedOption (option) {
      this.option = option
    }
  }

}
</script>

<style>
.book_search.err{text-align: center; margin-bottom: 1%;}
.search-area{padding-bottom: 100px;}
</style>
