<template>
  <form class="form_content addform" @submit.prevent="onaddBook">
    <div>
      <label for="">책제목</label>
      <p :class="{'invalid':!newBook.title}">
        <input
          ref="titleInput"
          v-model="newBook.title"
          type="text"
        ><i v-if="newBook.title" class="fas fa-plus-circle" @click="resetInput($event,'title')"></i>
      </p>
    </div>
    <div v-if="!newBook.title" class="err">
      책제목은 필수입니다.
    </div>
    <div>
      <label for="">책 내용</label>
      <p class="text" :class="{'invalid':!newBook.contents}">
        <textarea
          v-model="newBook.contents"
          cols="30"
          rows="10"
        ></textarea><i v-if="newBook.contents" class="fas fa-plus-circle" @click="resetInput($event,'contents')"></i>
      </p>
    </div>
    <div v-if="!newBook.contents" class="err">
      책내용은 필수입니다.
    </div>
    <div>
      <label for="">책 url</label>
      <p><input v-model="newBook.url" type="text"><i v-if="newBook.url" class="fas fa-plus-circle" @click="resetInput($event,'url')"></i></p>
    </div>
    <div>
      <label for="">isbn</label>
      <p>
        <input v-model="newBook.isbn" type="text"><i v-if="newBook.isbn" class="fas fa-plus-circle" @click="resetInput($event,'isbn')"></i>
      </p>
    </div>
    <div>
      <label>저자</label>
      <p :class="{'invalid':!newBook.authors}">
        <input
          v-model="newBook.authors"
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
      <b-form-datepicker id="datepicker" v-model="newBook.datetime"></b-form-datepicker>
    </div>
    <!-- 책 이미지 추가 -->
    <div class="file_container add">
      <LoadingBar v-if="initLoading" position />
      <div class="txt">
        <label for="fileinput"><span class="round-btn yellow"><i class="far fa-file-image"></i>책 이미지 추가</span></label>
        <input id="fileinput" style="display:none" type="file" @change="onChangeImage">
      </div>
      <div v-if="getImagePath.length" class="photos">
        <div class="images">
          <img :src="getImagePath" alt="썸네일 이미지">
        </div>
        <div>
          <button class="deletebtn" type="button" @click="onRemoveImage">
            <i class="fas fa-plus-circle"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="err">
      {{ errmsg }}
    </div>
    <button type="submit" class="round-btn red addbtn" :disabled="disabledBtn || errmsg.length !== 0">
      추가하기
    </button>
    <CommonAlertMsg :alert-state="!InputLenValid" data="50자 이내로 작성해주세요" />
  </form>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import BookFetchMixin from '~/mixins/BookFetchMixin'
export default {
  mixins: [BookFetchMixin],
  data () {
    return {
      newBook: {
        title: '',
        isbn: '',
        authors: '',
        publisher: '',
        contents: '',
        url: '',
        datetime: ''
      },
      selectedFile: ''
    }
  },
  computed: {
    ...mapState(['initLoading'])
  },
  methods: {
    ...mapActions('books', ['createBook', 'uploadImg']),
    ...mapMutations('books', ['removeThumbnail', 'alertEditComplete']),
    onaddBook () {
      this.fetchData()
    },
    onRemoveImage () {
      this.selectedFile = null
      this.removeThumbnail()
    }
  }
}
</script>

<style>
.form_content.addform{padding: 0 150px; margin-bottom: 100px;}
.main_container .form_content .date_area{display: flex; align-items: center;}
.main_container .form_content .date_area label{margin-right: auto;}
.img_container{position: relative;}
@media (max-width:1200px) {
  .form_content.addform{padding: 0 30px;}
}
@media (max-width:600px) {
  .form_content.addform{padding: 0;}
}
</style>
