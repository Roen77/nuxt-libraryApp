<template>
  <div class="alert_len">
    {{ len }}자 이상 작성하실 수 없습니다.
  </div>
</template>

<script>
export default {
  props: {
    len: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.alert_len{display: inline-block; border-radius: 10px; padding: 5px; font-size: 14px; color:#fff; font-weight: bold; background-color:#F50057;}
</style>
