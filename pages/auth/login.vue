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
  }

}
</script>

<style>

</style>
