<template>
  <li>
    <div class="c_thumbnail">
      <span v-if="comment.User && comment.User.thumbnail"><img :src="comment.User.thumbnail" alt=""></span>
      <span v-else>{{ String(comment.User.username)[0] }}</span>
      <p>{{ comment.User.username }}</p>
    </div>
    <!-- 코멘트 내용 -->
    <div class="comment_txt">
      {{ comment.comments }}
    </div>
    <!-- 코멘트 별점 -->
    <div class="comment_star">
      <div v-for="star in comment.rating" :key="star" class="star">
        <i class="fas fa-star">
        </i>
      </div>
    </div>
    <!-- 코멘트 날짜 -->
    <div>{{ $moment(`${comment.updatedAt}`).format("LLL") }}</div>
    <div v-if="myComment(comment.User.username)" class="remove_btn">
      <button class="round-btn fill" @click="onRemoveComment(comment.id)">
        삭제
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  methods: {
    ...mapActions('comments', ['deleteComment', 'updateComment']),
    onRemoveComment (id) {
      this.$emit('onRemoveComment', id)
    },
    myComment (user) {
      return user === this.getUser.username
    }
  }

}
</script>

<style scoped>
li{position: relative; border-radius: 20px; background-color: #eee;}
li .c_thumbnail{display: flex; align-items: center;}
li .c_thumbnail>span{position: relative; display: inline-block; width: 30px; height: 30px; border-radius: 50%; background-color:#fff; border: 2px solid #17a2b8; padding: 6px; color:#222; font-weight: bold; font-size: 20px; overflow: hidden; text-align: center; line-height: 30px;}
li .c_thumbnail>span img{position: absolute; left:50%; top:50%; transform: translate(-50%,-50%); width: 100%; height: 100%;}
li .c_thumbnail p{font-weight: bold; font-size: 18px; margin-left: 10px;}
li{border: 1px solid #ddd; margin: 10px 0; padding: 10px; box-sizing: border-box;}
li .comment_txt{ margin: 15px 0; white-space: pre-line; word-wrap: break-word; font-family: inherit;}
li .comment_txt textarea{width: 100%; min-height: 80px;  font-size: 16px;}
li .remove_btn{position: absolute; right: 10px; bottom:10px;}
/* 코멘트 rating */
.comment_star{display: flex; margin-bottom: 5px;}
.comment_star .fas{color: rgb(245, 209, 9); text-shadow: 0 0 2px yellow;}
</style>
