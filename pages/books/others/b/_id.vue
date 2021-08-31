<template>
  <div>
    <div>
      <BookCardDetail :book="otherBookList" />
      <CommentEdit />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ store, params }) {
    try {
      let otherBookList
      await store.dispatch('books/otherFetchBook', { id: params.id })
        .then((res) => {
          otherBookList = res.data.book
        })
      return { otherBookList }
    } catch (err) {
      console.log(err)
    }
  }
  // head () {
  //   return {
  //     meta: [
  //       { hid: 'og:type', property: 'og:type', content: 'website' },
  //       { hid: 'og:title', property: 'og:title', content: this.otherBookList.title },
  //       { hid: 'og:site_name', property: 'og:site_name', content: 'library App' },
  //       { hid: 'og:description', property: 'og:description', content: this.otherBookList.contents },
  //       { hid: 'og:image', property: 'og:image', content: this.otherBookList.thumbnail ? this.otherBookList.thumbnail : 'https://vue.roen.pe.kr/images/sample_book.svg' },
  //       { hid: 'og:url', property: 'og:url', content: `https://vue.roen.pe.kr${this.$route.fullPath}` }
  //     ]
  //   }
  // }
}
</script>

<style>
</style>
