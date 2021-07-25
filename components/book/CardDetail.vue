<template>
  <div>
    <div v-if="book">
      <h2 v-if="book.User" class="book_user">
        {{ book.User.username }}님의 책장
      </h2>
      <div class="book_detail">
        <div class="book_thumbnail">
          <img v-if="book.thumbnail" :src="book.thumbnail" alt="썸네일 이미지">
          <img v-else src="/images/book.png" alt="썸네일 이미지">
        </div>
        <div class="book_content">
          <h2>
            {{ book.title }}
          </h2>
          <div class="description">
            <p v-if="book.contents">
              {{ book.contents }}...
            </p>
          </div>
          <div><p><b class="tit">작가</b>{{ bookauthorsFormat(book.authors) }}</p></div>
          <div><p><b class="tit">출판사</b>{{ book.publisher }}</p></div>
          <div><p><b class="tit">출간날짜</b>{{ $moment(`${book.datetime}`).format("LL") }}</p></div>
          <div><p><b class="tit">isbn</b>{{ book.isbn }}</p></div>
          <a v-if="book.url" class="more" target="_blank" :href="book.url"> 자세히보기</a>
          <HashtagList :hashtags="book.Hashtags" :book-id="book.id" :user-id="book.UserId" />
          <!-- 좋아요  -->
          <div v-if=" book.Likers && book.Likers.length" class="heart_count" @mouseenter="showLikers=true" @mouseleave="showLikers=false">
            <i class="fas fa-heart"></i>{{ book.Likers.length }}
            <div v-if="showLikers" class="heart_list">
              <ul>
                <li v-for="(liker,index) in book.Likers" :key="index">
                  {{ liker.username }}님이 좋아요
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="circle_bg top"></div>
        <div class="circle_bg"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showLikers: false
    }
  },
  computed: {
    ...mapState(['loading'])
  },
  methods: {
    bookauthorsFormat (authors) {
      if (Array.isArray(authors)) {
        return authors.join(',')
      } else {
        return authors
      }
    }
  }

}
</script>

<style>
.skeletons-area{overflow: hidden; width: 100%; }
.book_user{margin-bottom: 20px;}
.book_detail{position: relative; overflow: hidden; display: flex; box-shadow: 0 0 3px rgba(0, 0, 0, 0.397); padding: 15px; box-sizing: border-box; background-color: #fff;}
.book_detail .add_detail{position: absolute; right: 0; top:0;}
.book_detail .book_thumbnail{position: relative; z-index: 10; display: flex; justify-content: center; align-items: center; width: 20%;}
.book_detail .book_thumbnail img{width: 150px; box-shadow: 1px 7px 5px rgba(0, 0, 0, 0.397);}
.book_detail .book_content{margin-left: 15px; width: 80%;}
.book_detail .book_content>div{margin: 5px;}
.book_detail .book_content h2{font-size: 27px; font-weight: bold;}
.book_detail .book_content b{display: inline-block; font-weight: bold; margin-right: 10px;}
.book_detail .book_content p{line-height: 1.4; color:#444;}
.book_detail .book_content .description{margin: 15px 0;}
.book_detail .circle_bg{position: absolute;  background-color: #677effc9; width: 200px; height: 100px; border-radius: 50%; right: -80px; bottom: -53px;}
.book_detail .circle_bg.top{top:-51px; bottom:0; left:-77px; right:0;}
.more{color:#677eff; transition: all 0.5s;}
@media (max-width:700px) {
.book_detail{display: block;}
.book_detail .book_thumbnail{width: 100%;}
.book_detail .book_thumbnail img{width: 150px;}
.book_detail .book_content{margin-left: 0; margin-top: 10px; width: 100%;}
.book_detail .book_content h2{font-size: 23px;}
.book_detail .book_content p{font-size: 14px; line-height: 1.6;}
}
.heart_count{position: absolute; right: 0; top:0;}
.heart_count .fas{color:crimson;}
.heart_count .heart_list{background-color:#fff; box-shadow: 0 0 5px rgba(0, 0, 0, 0.397); border-radius: 10px; position: absolute; right: 0; top:20px; max-width: 150px; width: 150px; text-align: center; font-size: 14px; z-index: 100;  max-height: 300px; overflow-y: auto;}
.heart_count .heart_list li{padding: 3px;}
</style>
