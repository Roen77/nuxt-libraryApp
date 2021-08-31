<template>
  <div class="book-details">
    <div>
      <BookCardDetail :book="getBook" />
      <div
        class="control_btns"
      >
        <div class="left_btn">
          <!-- 삭제 버튼 -->
          <button class="primary-btn red" @click="onremoveBook">
            <i class="fas fa-trash-alt"></i>삭제
          </button>
          <!-- 수정 버튼 -->
          <button class="primary-btn" @click="onEditBook">
            <i class="fas fa-pen-square"></i>수정
          </button>
        </div>
        <div class="right_btn">
          <button class="primary-btn" @click="onEditHashtag">
            <i class="fas fa-pen-square"></i>해시태그
          </button>
          <FormHashtag v-if="editHashtag" :hashtags="getBook&&getBook.Hashtags" />
        </div>
      </div>
      <BookEdit v-if="editState" :mybook="getBook" @editStateChange="editStateChange" />
      <CommentEdit />
      <FormAlert v-if="alert" :title="getBook && getBook.title" :confirm="`삭제`" @onagree=" agree" @ondisagree="disagree" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  async asyncData ({ store, params }) {
    try {
      await store.dispatch('books/fetchBook', { id: params.id })
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      editState: false,
      editHashtag: false,
      agreeState: false,
      alert: false
    }
  },
  // head () {
  //   return {
  //     meta: [
  //       { hid: 'og:type', property: 'og:type', content: 'website' },
  //       { hid: 'og:title', property: 'og:title', content: this.getBook.title },
  //       { hid: 'og:site_name', property: 'og:site_name', content: 'library App' },
  //       { hid: 'og:description', property: 'og:description', content: this.getBook.contents },
  //       { hid: 'og:image', property: 'og:image', content: this.getBook.thumbnail ? this.getBook.thumbnail : 'https://vue.roen.pe.kr/images/sample_book.svg' },
  //       { hid: 'og:url', property: 'og:url', content: `https://vue.roen.pe.kr${this.$route.fullPath}` }
  //     ]
  //   }
  // },
  computed: {
    ...mapGetters('books', ['getBook'])
  },
  methods: {
    ...mapActions('books', ['deleteBook']),
    onremoveBook () {
      this.alert = true
    },
    onEditBook () {
      this.editState = true
    },
    onEditHashtag () {
      this.editHashtag = !this.editHashtag
    },
    editStateChange () {
      this.editState = false
    },
    disagree () {
      this.agreeState = false
      this.alert = false
    },
    agree () {
      try {
        this.deleteBook({ id: this.$route.params.id })
          .then(() => {
            // 삭제 후 라우터 이동
            this.$router.push('/books/1')
          })
      } catch (error) {
        console.error(error)
      }
    }
  }

}
</script>

<style>
.book-details{min-height: 100vh;}
.control_btns{ margin: 10px 0; display: flex;}
.control_btns .right_btn{position: relative; margin-left: auto;}
.control_btns button{border-radius: 10px; letter-spacing: 1px;}
.control_btns button .fas{margin-right: 4px;}
@media (max-width:600px) {
.control_btns{display: block;}
}
</style>
