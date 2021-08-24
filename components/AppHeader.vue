<template>
  <header class="header">
    <div class="inner">
      <h1 class="logo en">
        <nuxt-link class="primary" to="/">
          <span>S</span>'BOOK
        </nuxt-link>
      </h1>
      <div
        class="right_menu"
        :class="{ active: toggleMenu, inactive: invisible }"
      >
        <nav v-if="getUser">
          <div class="gnb">
            <nuxt-link
              to="/books/1"
              class="round-btn my"
              :class="{ 'nuxt-link-active': router.me }"
            >
              나만의 책장
            </nuxt-link>
            <nuxt-link
              :to="`/books/others/1`"
              class="round-btn others"
              :class="{ 'nuxt-link-active': router.other }"
            >
              다른사람 책장
            </nuxt-link>
          </div>
        </nav>
        <!--  메뉴 -->
        <div class="m_menu">
          <div v-if="getUser" class="action_menu">
            <div class="profile" @click="onactive">
              <img
                v-if="getUser && getUser.thumbnail"
                class="thumbnail"
                :src="getUser.thumbnail"
                alt=""
              />
              <img v-else class="thumbnail" src="/images/user3.png" alt="" />
              <span>
                <b class="cut main_nickname">{{ getUser && getUser.username }} </b>
              </span>
            </div>
            <div class="menu" :class="{ active: activeMenu }" @click="onactive">
              <h3 class="cut">
                {{ getUser.username }}
              </h3>
              <span class="info">my Profile</span>
              <!-- 모바일 메뉴 -->
              <ul class="mobile_gnb">
                <li>
                  <nuxt-link
                    to="/books/1"
                    class="my"
                    :class="{ 'nuxt-link-active': router.me }"
                  >
                    <img src="/images/bookicon1.png" alt="#" />
                    나만의 책장
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link
                    :to="`/books/others/1`"
                    class="others"
                    :class="{ 'nuxt-link-active': router.other }"
                  >
                    <img src="/images/bookicon2.png" alt="#" />
                    다른사람 책장
                  </nuxt-link>
                </li>
              </ul>
              <ul>
                <li>
                  <nuxt-link to="/user/profile" class="my_profile">
                    <img src="/images/user4.png" alt="" />내 프로파일
                  </nuxt-link>
                </li>
                <li>
                  <a href="#" @click.prevent="showSearchForm">
                    <img src="/images/settings.png" />다른 사용자 책 검색</a>
                </li>
                <li>
                  <a href="#" @click="Logout"><img src="/images/logout.png" alt="" />로그아웃</a>
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="login_menu">
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
      <div class="search_btn">
        <a href="#" @click.prevent="search.showsearchState = false">검색창 끄기</a>
      </div>
      <FormSearch
        v-model="search.input"
        :options="search.options"
        @searchBook="onsearchBook"
        @selectedOption="onselectedOption"
      />
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
    // 라우터에 따른 메뉴 활성화
    $route (to) {
      if (to.name === 'books-others-page') {
        this.router.other = true
      } else {
        this.router.other = false
      }
      if (to.name === 'books-page') {
        this.router.me = true
      } else {
        this.router.me = false
      }
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapMutations('books', ['updateSearch']),
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
    // 기존 검색 데이터 초기화
    showSearchForm () {
      this.search.showsearchState = !this.search.showsearchState
      this.updateSearch({
        data: '',
        selectedOption: this.search.options[0]
      })
    },
    onselectedOption (option) {
      this.updateSearch({
        selectedOption: option
      })
    },
    onsearchBook () {
      // 입력값이 없으면 리턴해준다.
      if (this.search.input.length === 0) {
        return
      }
      this.updateSearch({
        data: this.search.input
      })
      this.$router.push(
        `/books/search/1?search=${this.getSearch.selectedOption}&target=${this.search.input}`
      )
    }
  }
}
</script>

<style>
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 9999;
}
header .search_area {
  background-color: rgba(255, 255, 255, 0.863);
  padding-bottom: 10px;
  margin-top: 5px;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0,0,0,.5);
  position: absolute;
  left: 50%;
  top: 70px;
  transform: translateX(-50%);
  width: 85%;
  z-index: 9999;
}
header .search_area .search_btn {
 display: block;
  text-align: center;
  line-height: 20px;
  margin-bottom: 3px;
}
.gnb .nuxt-link-active.round-btn {
  color: #fff;
}
.gnb .nuxt-link-active.round-btn::before {
  width: 100%;
  border-radius: 0;
}
.gnb a {
  margin: 5px;
}
.main_nickname{display: inline-block; max-width: 75px;}
</style>
