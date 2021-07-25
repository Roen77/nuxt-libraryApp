<template>
  <div class="container default">
    <AppHeader />
    <main class="main_container">
      <div class="inner">
        <Nuxt />
        <div class="topbtn">
          top
        </div>
      </div>
    </main>
    <AppFooter />
    <CommonAlertMsg :alert-state="alertState" :data="data" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import bus from '~/utils/bus'
export default {
  middleware: 'authorize',
  data () {
    return {
      alertState: false,
      data: ''
    }
  },
  computed: {
    ...mapGetters({ books: 'books/getsearchbooks', Thumbnail: 'books/getImagePath' })
  },
  watch: {
    // 라우터가 변경되면 기존 검색기능 초기화할 수 있도록 하기
    // 라우터가 변경되면 썸네일 이미지가 저장하지 않은 경우에는 초기화할 수 있도록 하기
    $route () {
      if (this.books.length !== 0) {
        console.log(this.books)
        return this.initsearchBook()
      }
      if (this.Thumbnail.length !== 0) {
        return this.resetImgagePath()
      }
    }
  },
  created () {
    bus.$on('on:alert', (data) => {
      this.data = data
      this.onalert()
    })
    bus.$on('off:alert', this.offalert)
  },
  mounted () {
    const top = document.querySelector('.topbtn')
    top.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  },
  methods: {
    ...mapMutations('books', ['initsearchBook', 'resetImgagePath']),
    onalert () {
      this.alertState = true
    },
    offalert () {
      this.alertState = false
    }
  }

}
</script>

<style>
.container{position: relative; min-height: 100vh; padding-top: 80px; box-sizing: border-box;}
.default.container{
background-image: url(/images/main_bg.jpg); background-position: left  bottom 70px; background-size: 450px; background-repeat: no-repeat;
}
.topbtn{
  cursor: pointer;
  position: fixed;
  right: 16px;
  bottom: 63px;
  background-color:rgb(56, 95, 134);
  padding: 10px;
  border-radius: 10px;
  color:#fff;
  z-index: 9999;

}
@media (max-width:440px) {
  .default.container{background-size: 350px;}
}
</style>
