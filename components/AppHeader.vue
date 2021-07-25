<template>
  <header class="header">
    <div ref="toggle" :class="{'active': toggleMenu}" class="toggle" @click="toggleactive">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="inner">
      <h1 class="logo en">
        <nuxt-link class="primary" to="/">
          <span>S</span>'BOOK
        </nuxt-link>
      </h1>
      <div class="right_menu" :class="{'active': toggleMenu,'inactive':invisible}">
        <a class="menu_btn" @click="invisibleMenu ">
          <i class="fas fa-arrow-left"></i>
        </a>
        <nav v-if="getUser">
          <div class="gnb">
            <nuxt-link to="/books/1" class="round-btn my" :class="{'nuxt-link-active':router.me}">
              나만의 책장
            </nuxt-link>
            <nuxt-link :to="`/books/others/1`" class="round-btn others" :class="{'nuxt-link-active':router.other}">
              다른사람 책장
            </nuxt-link>
          </div>
        </nav>
        <div class="m_menu">
          <div v-if="getUser" class="action_menu">
            <div class="profile" @click="onactive">
              <img v-if="getUser && getUser.thumbnail" class="thumbnail" :src="getUser.thumbnail" alt="">
              <img v-else class="thumbnail" src="/images/user3.png" alt="">
              <span>
                <b>{{ getUser && getUser.username }}</b>
              </span>
            </div>
            <div class="menu" :class="{'active':activeMenu}" @click="onactive">
              <h3>{{ getUser.username }}<br><span>my Profile</span></h3>
              <ul>
                <li>
                  <nuxt-link to="/user/profile" class="my_profile">
                    <img src="/images/user4.png" alt="">내 프로파일
                  </nuxt-link>
                </li>
                <li>
                  <a href="#" @click.prevent="showSearchForm"> <img src="/images/settings.png">다른 사용자 책 검색</a>
                </li>
                <li>
                  <a href="#" @click="Logout"><img src="/images/logout.png" alt="">로그아웃</a>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <nuxt-link class="primary-btn" to="/auth/register">
              회원가입
            </nuxt-link>
            <nuxt-link class="primary-btn" to="/auth/login">
              로그인
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="getUser && search.showsearchState" class="search_area">
      <div class="btn">
        <a href="#" @click.prevent="search.showsearchState=false">검색창 끄기</a>
      </div>
      <FormSearch v-model="search.input" :options="search.options" @searchBook="onsearchBook" @selectedOption="onselectedOption" />
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      activeMenu: false,
      toggleMenu: false,
      invisible: false,
      search: {
        input: '',
        options: ['책제목', '저자'],
        showsearchState: false
      },
      router: {
        me: false,
        other: false
      }
    }
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('books', ['getSearch'])
  },
  watch: {
    $route (to) {
      if (to.name === 'books-others-page') { this.router.other = true } else { this.router.other = false }
      if (to.name === 'books-page') { this.router.me = true } else { this.router.me = false }
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapMutations('books', ['searchOption', 'searchData']),
    Logout () {
      this.$router.push('/')
      this.logout()
    },
    onactive () {
      this.activeMenu = !this.activeMenu
    },
    toggleactive () {
      this.toggleMenu = !this.toggleMenu
      this.invisible = false
    },
    invisibleMenu () {
      this.invisible = true
      this.toggleMenu = false
    },
    showSearchForm () {
      this.search.showsearchState = !this.search.showsearchState
      this.search.input = ''
      this.searchOption(this.search.options[0])
    },
    onselectedOption (option) {
      this.searchOption(option)
    },
    onsearchBook () {
      if (this.search.input.length === 0) { return }
      this.searchData(this.search.input)
      this.$router.push(`/books/search/1?search=${this.getSearch.selectedOption}&target=${this.search.input}`)
    }
  }

}
</script>

<style>
header{position: fixed; left:0; top:0; width: 100%; z-index:9999;}
header .search_area{position: absolute; left:50%; top:70px; transform: translateX(-50%); width: 55%; z-index: 9999;}
header .search_area .btn{text-align: center; line-height: 20px;}
.gnb .nuxt-link-active.round-btn{color:#fff;}
.gnb .nuxt-link-active.round-btn::before{
  width:100%;
  border-radius: 0;
}
.gnb a{margin: 5px;}
</style>
