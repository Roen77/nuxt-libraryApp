<template>
  <div class="hashtag_form">
    <form @submit.prevent="onaddHashtag">
      <div class="text">
        <p>
          <input v-model="hashtag" placeholder="ex)#추천#에세이#소설.." type="text">
        </p>
      </div>
      <div>
        <button class="round-btn fill hash_htn" type="submit" :disabled="invalidHashtag || !hashtag">
          추가
        </button>
        <p v-if="invalidHashtag" class="err">
          태그는 최대 10개까지 등록 가능합니다.
        </p>
        <p v-if="msg" class="err">
          {{ msg }}
        </p>
      </div>
    </form>
    <ul class="hashtags">
      <li v-for="(tag,index) in ishashtags" :key="index" class="tag">
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    hashtags: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      hashtag: '',
      newtagnames: [],
      msg: ''
    }
  },
  computed: {
    ishashtags () {
      return this.hashtag.match(/#[^\s#]+/g)
    },
    invalidHashtag () {
      return ((this.hashtags && this.hashtags.length) || 0) + ((this.ishashtags && this.ishashtags.length) || 0) > 10
    }
  },
  methods: {
    ...mapActions('books', ['createHashtag']),
    resize (e) {
      e.target.style.height = 'auto'
      e.target.style.height = `${e.target.scrollHeight}px`
    },
    onaddHashtag () {
      this.hashtagsconfirm()
      if (this.newtagnames.length > 0) {
        this.createHashtag({ bookId: this.id, hashtags: this.ishashtags })
        this.resetHashtag()
      } else {
        this.msg = '이미 등록된 태그가 포함되어 있습니다.'
      }
    },
    resetHashtag () {
      this.hashtag = ''
      this.newtagnames = []
      this.msg = ''
    },
    hashtagsconfirm () {
      const tagnames = []
      this.hashtags.forEach((tag) => {
        tagnames.push(tag.name)
      })
      const news = (this.ishashtags || []).map((tag) => {
        return String(tag).slice(1).toLowerCase()
      })
      const setHashtags = new Set(news)
      const newHashtags = [...setHashtags]
      newHashtags.forEach((newtag) => {
        if (!tagnames.includes(newtag)) {
          this.newtagnames.push(newtag)
        }
      })
    }

  }

}
</script>

<style>
.hashtag_form{position: absolute; z-index: 100;  right: 0; top:100%; width:300px;}
.hashtag_form form div.text{width: 70%; }
.hashtag_form input{width: 100%; height: 40px; padding: 5px;  border: 1px solid #ddd; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); box-sizing: border-box;}
.hashtag_form .hash_htn{position: absolute; right:0; top:0; padding: 0; border-radius: 0; line-height: 40px; width: 30%;}
</style>
