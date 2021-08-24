<template>
  <div class="err_container">
    <div class="txt">
      <h3 v-if="error.msg">
        {{ error.msg }}
      </h3>
      <h2 v-else>
        오류가 발생하여 다시 시도해주세요.
      </h2>
      <p>{{ error.statusCode }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.err_container{margin-top: 50px; display: flex; align-items: center; justify-content: center; padding: 100px 0; box-sizing: border-box;  border: 1px solid rgb(153, 223, 190); text-align: center; background-image: url(/images/main_bg3.jpg); background-size:360px; background-repeat: no-repeat; background-position: center; line-height: 30px; font-size: 1.2em;}
.err_container .txt p{font-size: 14px;}
</style>
