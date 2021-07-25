<template>
  <div class="comment_area">
    <button class="round-btn yellow" @click.prevent="onshowComments">
      {{ onStateComment }}
    </button>
    <div v-if="showComment" class="comment">
      <div class="comment_head">
        <h2>댓글 쓰기</h2>
        <div v-if="loading" class="loading-spin">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div v-else>
          댓글 :{{ getCommentPage.commentCount }}
        </div>
      </div>
      <FormComment />
      <div class="comment_area">
        <div>댓글</div>
        <ul>
          <CommentList v-for="(comment) in getComments" :key="comment.id" :comment="comment" @onRemoveComment="onRemoveComment" />
        </ul>
      </div>
    </div>
    <div ref="trigger" class="trigger">
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    </div>
    <FormAlert v-if="alert" data="댓글" confirm="삭제" @onagree=" agree" @ondisagree="disagree" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      showComment: false,
      loading: false,
      page: 1,
      agreeState: false,
      alert: false,
      commendId: ''
    }
  },
  computed: {
    ...mapGetters('comments', ['getComments', 'getCommentPage']),
    onStateComment () {
      return !this.showComment ? '댓글 보기' : '댓글 접기'
    }
  },
  mounted () {
    this.onaddComments()
  },
  methods: {
    ...mapActions('comments', ['fetchComments', 'deleteComment']),
    ontoggleComment () {
      this.showComment = !this.showComment
    },
    onshowComments () {
      this.ontoggleComment()
      if (this.showComment) {
        this.loading = true
        this.page = 1
        console.log('함수호출전')
        this.fetchComments({ bookId: this.$route.params.id, init: true })
          .then(() => {
            this.loading = false
          })
      }
    },
    onaddComments () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (this.showComment && entry.isIntersecting && this.getComments && this.getComments.length > 9 && !this.getCommentPage.end) {
            console.log(this.getCommentPage.end, '끝좀..')
            this.loading = true
            this.page++
            this.fetchComments({ bookId: this.$route.params.id, page: this.page })
              .then((res) => {
                this.loading = false
              })
          }
        })
      })

      observer.observe(this.$refs.trigger)
    },
    onRemoveComment (id) {
      this.alert = true
      this.commendId = id
    },
    disagree () {
      this.agreeState = false
      this.alert = false
    },
    agree () {
      try {
        this.deleteComment({ bookId: this.$route.params.id, commentId: this.commendId })
          .then(() => {
            this.alert = false
          })
      } catch (error) {
        console.error(error)
      }
    }
  }

}
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: all .5s ease;
}
.component-fade-enter
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}
.comment_head{display: flex; align-items: center;}
.comment_head>div{margin-left: auto; font-weight: bold;}
.comment_area{position: relative; margin: 17px 0; padding-bottom: 50px;}
.trigger{position: absolute; text-align: center;  left:0; bottom:0; width: 100%; height: 20px;}
</style>
