<template>
  <CommonModal class="book_form">
    <div slot="header">
      <h2 class="sub_head">
        책 정보 수정
      </h2>
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
          <b-form-datepicker id="datepicker" v-model="newBook.datetime"></b-form-datepicker>
        </div>
        <!-- 책 이미지 수정 -->
        <div class="file_container edit">
          <LoadingBar v-if="initLoading" position />
          <div class="txt">
            <label for="fileinput"><span class="round-btn yellow"><i class="far fa-file-image"></i>책 이미지 수정</span></label>
            <input id="fileinput" ref="file" style="display:none" type="file" @change="onChangeImage">
          </div>
          확인:{{ hasThunbnail }}
          <div class="photos">
            <div v-if="hasThunbnail" class="images" :class="{'imgErr':hasErr}">
              <img :src="mybook.thumbnail" alt="썸네일 이미지">
            </div>
            <div v-else class="images" :class="{'imgErr':hasErr}">
              <img :src="hasImagePath" alt="썸네일 이미지">
            </div>
          </div>
        </div>
        <div class="err">
          {{ errmsg }}
        </div>
        <button type="submit" class="round-btn red editbtn" :disabled="disabledBtn || errmsg.length !== 0">
          수정하기
        </button>
        <CommonAlertMsg :alert-state="!InputLenValid" data="100자 이내로 작성해주세요" />
      </form>
    </div>
  </CommonModal>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import BookFetchMixin from '~/mixins/BookFetchMixin'
export default {
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
        isbn: this.mybook.isbn,
        authors: this.mybook.authors,
        publisher: this.mybook.publisher,
        contents: this.mybook.contents,
        url: this.mybook.url,
        datetime: this.mybook.datetime
      },
      selectedFile: '',
      resetImage: false
    }
  },
  computed: {
    ...mapState(['initLoading']),
    hasThunbnail () {
      return this.mybook.thumbnail && !this.hasImage
    },
    hasImagePath () {
      return this.hasImage ? this.getImagePath : '/images/sample_book.jpg'
    }
  },
  created () {
    //  이미지 데이터 초기화
    if (this.getImagePath.length !== 0) {
      console.log('이미지 초기화')
      return this.removeThumbnail()
    }
  },
  methods: {
    ...mapActions('books', ['updateBook', 'uploadImg']),
    ...mapMutations('books', ['removeThumbnail']),
    onEditBook () {
      this.fetchData()
    },
    oneditStateChange () {
      this.$emit('editStateChange')
    }
  }

}
</script>

<style>
.mx-datepicker-popup{z-index: 9999;}
/* book eidt */
.main_container .book_form{background-color:rgba(34, 34, 34, 0.863); width: 100%; display: flex; justify-content: center; align-items: center;}
.main_container .book_form .modal-wrapper{height: 100%; width: 80%;}
.book_form .modal-container{position: relative; width: 100%; box-shadow: 20px 20px 50px rgba(0,0,0,0.5); padding:10px 50px; box-sizing: border-box; background-color:#fff; border-top: 1px solid rgba(255,255,255,0.5);border-left: 1px solid rgba(255,255,255,0.5); height:100vh; overflow-y: auto;}
.editbtn{position: absolute; top:-59px; right: 69px;}
@media (max-width:1200px) {
    .modal-mask.book_form .modal-container{padding: 10px 20px;}
    .main_container .book_form .modal-wrapper{width: 93%;}
    }
@media (max-width:600px) {
   .modal-mask.book_form .modal-container{padding: 5px;}
    .editbtn{right: 0; top:2px;}
    .date{font-size: 13px;}
  }

</style>
