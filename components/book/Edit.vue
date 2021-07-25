<template>
  <CommonModal class="book_form">
    <div slot="header">
      <h2>책 정보 수정</h2>
      <button class="closebtn round-btn" @click="oneditStateChange">
        닫기
      </button>
    </div>
    <div slot="body">
      <form class="form_content" @submit.prevent="onEditBook">
        <div>
          <label for="">책제목</label>
          <p>
            <input
              ref="titleInput"
              v-model="newBook.title"
              :class="{'invalid':!newBook.title}"
              type="text"
            ><i v-if="newBook.title" class="fas fa-plus-circle" @click="resetInput($event,'title')"></i>
          </p>
        </div>
        <div v-if="!newBook.title" class="err">
          책제목은 필수입니다.
        </div>
        <div>
          <label for="">책 내용</label>
          <p class="text">
            <textarea
              v-model="newBook.contents"
              cols="30"
              rows="10"
              :class="{'invalid':!newBook.contents}"
            ></textarea><i v-if="newBook.contents" class="fas fa-plus-circle" @click="resetInput($event,'contents')"></i>
          </p>
        </div>
        <div v-if="!newBook.contents" class="err">
          책내용은 필수입니다.
        </div>
        <div>
          <label for="">책 url</label>
          <p><input v-model="url" type="text"><i v-if="url" class="fas fa-plus-circle" @click="resetInput($event,'url')"></i></p>
        </div>
        <div>
          <label for="">isbn</label>
          <p>
            <input v-model="newBook.isbn" type="text"><i v-if="newBook.isbn" class="fas fa-plus-circle" @click="resetInput($event,'isbn')"></i>
          </p>
        </div>
        <div>
          <label>저자</label>
          <p>
            <input
              v-model="newBook.authors"
              :class="{'invalid':!newBook.authors}"
              type="text"
            ><i v-if="newBook.authors" class="fas fa-plus-circle" @click="resetInput($event,'authors')"></i>
          </p>
        </div>
        <div v-if="!newBook.authors" class="err">
          저자는 필수입니다.
        </div>
        <div>
          <label for="">출판사</label>
          <p>
            <input v-model="newBook.publisher" type="text"><i v-if="newBook.publisher" class="fas fa-plus-circle" @click="resetInput($event,'publisher')">
            </i>
          </p>
        </div>
        <div class="date_area">
          <label for="">출간날짜</label>
          <date-picker v-model="datetime" value-type="format"></date-picker>
        </div>
        <div class="file_container edit">
          <div class="txt">
            <label for="fileinput"><span class="round-btn yellow"><i class="far fa-file-image"></i>책 이미지 수정</span></label>
            <input id="fileinput" ref="file" style="display:none" type="file" @change="ChangeImage">
          </div>
          <div class="photos">
            <div v-show="!resetImage" class="images">
              <img v-if="showimage && getImagePath.length !== 0" class="image" :src="getImagePath" alt="">
              <img v-if="mybook.thumbnail && !showimage" class="image" :src="mybook.thumbnail" alt="">
            </div>
            <div>
              <button v-if="showimage && !mybook.thumbnail || getImagePath.length !== 0" class="deletebtn" type="button" @click="onremoveImage">
                <i class="fas fa-plus-circle"></i>
              </button>
            </div>
          </div>
        </div>
        <button type="submit" class="round-btn red editbtn" :disabled="!newBook.title || !newBook.authors || !newBook.contents">
          수정하기
        </button>
        <CommonLenConfirm v-if="!InputLenValid" len="30" />
      </form>
    </div>
  </CommonModal>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import DatePicker from 'vue2-datepicker'
import BookFetchMixin from '~/mixins/BookFetchMixin'
export default {
  components: { DatePicker },
  mixins: [BookFetchMixin],
  props: {
    mybook: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showimage: false,
      newBook: {
        title: this.mybook.title,
        contents: this.mybook.contents,
        isbn: this.mybook.isbn,
        authors: this.mybook.authors,
        publisher: this.mybook.publisher,
        selectedFile: ''
      },
      url: this.mybook.url,
      datetime: this.mybook.datetime,
      resetImage: false

    }
  },
  computed: {
    InputLenValid () {
      return this.$inputLen(this.newBook, 30)
    },
    disabledBtn () {
      return !this.newBook.title || !this.newBook.authors || !this.newBook.contents || !this.InputLenValid
    }
  },
  methods: {
    ...mapActions('books', ['updateBook', 'uploadImg']),
    ...mapMutations('books', ['removeThumbnail']),
    async onEditBook () {
      await this.fetchData()
    },
    ChangeImage (e) {
      this.resetImages()
      this.onChangeImage(e)
    },
    onremoveImage () {
      this.resetImage = true
      this.showimage = false
      this.newBook.selectedFile = null
      this.removeThumbnail()
    },
    oneditStateChange () {
      this.$emit('editStateChange')
    },
    resetImages () {
      this.resetImage = false
      this.showimage = true
    }
  }

}
</script>

<style>
.mx-datepicker-popup{z-index: 9999;}
</style>
