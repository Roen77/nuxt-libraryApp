<template>
  <CommonModal class="alert_main">
    <div slot="header">
      <b>{{ data }}</b> 을(를) {{ confirm }}하시겠어요??
    </div>
    <div slot="body" class="body">
      <button class="primary-btn" @click="$emit('onagree')">
        네
      </button>
      <button class="primary-btn red" @click="$emit('ondisagree')">
        아니오
      </button>
    </div>
    <div slot="footer"></div>
  </CommonModal>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true
    },
    confirm: {
      type: String,
      required: true
    }
  }

}
</script>

<style>
.modal-mask.alert_main{
  background-color:rgba(0,0,0,0.6);
}
.modal-mask.alert_main .modal-container{width: 30%; height: 100px; border-radius: 5px;}
.modal-mask.alert_main .body{text-align: center;}
.modal-mask.alert_main .body button{border-radius: 9px;}
</style>
