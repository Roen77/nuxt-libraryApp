<template>
  <div class="auth_container">
    <FormLogin />
  </div>
</template>

<script>
export default {
  layout: 'none',
  middleware: 'anonymous',
  data () {
    return {
      active: false
    }
  },
  head () {
    return {
      title: this.otherBookList.title,
      meta: [
        { hid: 'og:url', property: 'og:url', content: `https://vue.roen.pe.kr${this.$route.fullPath}` },
        { hid: 'twitter:site', name: 'twitter:site', content: `https://vue.roen.pe.kr${this.$route.fullPath}` }
      ]
    }
  }

}
</script>

<style>

</style>
