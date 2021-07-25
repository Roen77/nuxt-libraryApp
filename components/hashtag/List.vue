<template>
  <ul class="hashtags tagList">
    <li v-for="(tag,index) in hashtags" :key="index" class="tag" @mouseenter="onChangeState(tag,index)" @mouseleave="tagNum=''">
      <nuxt-link :to="`/hashtags/1/?name=${tag.name}`">
        #{{ tag.name }}
      </nuxt-link>
      <span v-if="ismybook && bookId && index === tagNum " @click.prevent="onRemoveHashtag(tag.id)"><i class="fas fa-plus-circle"></i></span>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    hashtags: {
      type: Array,
      required: false
    },
    bookId: {
      type: Number,
      required: false
    },
    userId: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      tagNum: ''
    }
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    ismybook () {
      return this.getUser.id === this.userId
    }
  },
  methods: {
    ...mapActions('books', ['deleteHashtag']),
    onChangeState (tag) {
      const tagNum = this.hashtags.findIndex(hashtag => hashtag.id === tag.id)
      this.tagNum = tagNum
    },
    onRemoveHashtag (id) {
      console.log(id)
      this.deleteHashtag({ bookId: this.bookId, hashtagId: id })
    }
  }

}
</script>

<style>
.hashtags.tagList{box-shadow: none;}
.hashtags{display: flex; flex-wrap: wrap; margin: 5px; background-color: #fff; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);}
.hashtags .tag{position: relative; display: flex;  background-color: skyblue; color:#222; border-radius: 20px; align-items: center; justify-content: center;padding: 7px; margin: 0.5%;}
.hashtags .tag span{position: absolute; cursor: pointer; z-index: 10; font-size: 20px; transform: rotate(45deg); right: -20px; top:-7px;}

</style>
