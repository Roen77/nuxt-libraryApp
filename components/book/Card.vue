<template>
  <div class="book_inner">
    <nuxt-link :to="changeBook">
      <!-- 북마크 및 코멘트 유무 마크 -->
      <div class="marks">
        <span v-if="ismybook && onBookmarked" class="top_bookmark">
          {{ isbookmark }}
        </span>
        <span
          v-if="book.Comments && book.Comments.length > 0"
          class="c_bookmark"
        >c</span>
      </div>
      <!-- 책 이미지 -->
      <div class="photo" :style="{ 'background-image': setbackground }">
        <div class="overlay"></div>
        <!-- 좋아요 받은 갯수 -->
        <div v-if="book.Likers && book.Likers.length" class="like heart_count">
          <i class="fas fa-heart"></i>
          <span>{{ book.Likers.length }}</span>
        </div>
      </div>
    </nuxt-link>
    <div class="txt">
      <p
        v-if="isNotmybook"
        class="book_font user"
      >
        {{ onLimitLen(book.User.username, 5) }}님의 책
      </p>
      <p class="book_font tit">
        {{ onLimitLen(book.title, 10) }}
      </p>
      <p v-if="book && book.authors" class="author book_font">
        {{ book.authors }} 지음
      </p>
      <!-- 해시태그 리스트 -->
      <HashtagList :hashtags="book.Hashtags" />
      <!-- 북마크 // 좋아요 -->
      <span
        v-if="ismybook"
        class="bookmark"
        :class="{ bookmarked: onBookmarked }"
        @click="onClickBookmark(book.id)"
      ><i class="fas fa-bookmark"></i></span>
      <span v-else class="heart" @click="onClickLike(book.id)"><i :class="isheart"></i></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { resizeImage } from '~/utils/resizeImage'
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    // 내 책인지  확인
    ismybook () {
      return this.book.UserId === this.getUser.id
    },
    // 다른 사용자의 책인지 확인
    isNotmybook () {
      return this.book.User && this.book.User.username && !this.ismybook
    },
    changeBook () {
      return !this.ismybook
        ? `/books/others/b/${this.book.id}`
        : `/books/b/${this.book.id}`
    },
    onBookmarked () {
      return !!(this.book && this.book.bookmark)
    },
    onclickHearted () {
      return !!(this.book.Likers || []).find(
        liker => this.getUser.id === liker.id
      )
    },
    isbookmark () {
      return this.onBookmarked ? 'B' : ''
    },
    isheart () {
      return this.onclickHearted ? 'fas fa-heart' : 'far fa-heart'
    },
    setbackground () {
      return this.book.thumbnail
        ? `url(${resizeImage(this.book.thumbnail)})`
        : 'url(/images/sample_book.svg)'
    }
  },
  methods: {
    ...mapActions('books', [
      'createBookmark',
      'deleteBookmark',
      'otheraddLike',
      'otherremoveLike'
    ]),
    onClickBookmark (id) {
      if (this.onBookmarked) {
        this.deleteBookmark({ bookId: id })
      } else {
        this.createBookmark({ bookId: id })
      }
    },
    onClickLike (id) {
      if (this.onclickHearted) {
        this.otherremoveLike({ bookId: id })
      } else {
        this.otheraddLike({ bookId: id })
      }
    },
    onLimitLen (value, len) {
      let valueArr
      if (Array.isArray(value)) {
        valueArr = value
      } else {
        valueArr = value.split('')
      }

      if (valueArr.length > len) {
        return `${valueArr.slice(0, len).join('')}...`
      } else {
        return value
      }
    }
  }
}
</script>

<style>
.bookshelf .book .txt {
  width: 100%;
}
.txt .heart {
  position: absolute;
  right: 10px;
  top: 3px;
  color: crimson;
  cursor: pointer;
  font-size: 23px;
}
.txt .user a {
  color: royalblue;
  font-size: 24px;
  margin-bottom: 7px;
}
.bookshelf .book .tag {
  font-size: 12px;
  padding: 3px;
}
.book_font.tit {
  margin-right: 24px;
}
.book_font.user {
  font-size: 22px;
  color: royalblue;
  margin-bottom: 5px;
}
.like.heart_count {
  position: absolute;
  right: 5px;
  top: 0;
  font-size: 14px;
  z-index: 20;
}
.like.heart_count .fas {
  color: crimson;
}
.bookshelf .book .photo:hover .fas {
  color: rgb(231, 96, 123);
}
.bookshelf .book .photo:hover .like span {
  color: #fff;
}
</style>
