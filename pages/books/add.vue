<template>
  <div>
    <h2 class="sub_head">책추가</h2>
    <FormBookAdd />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters({ Thumbnail: 'books/getImagePath' })
  },
  created () {
    if (this.Thumbnail.length !== 0) {
      return this.resetImgagePath()
    }
  },
  methods: {
    ...mapMutations('books', ['resetImgagePath'])
  }
}
</script>

<style>

</style>
