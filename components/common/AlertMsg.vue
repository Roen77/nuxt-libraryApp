<template>
  <transition name="upSlide">
    <div v-if="alertState" class="alertmsg">
      {{ data }}
    </div>
  </transition>
</template>

<script>

export default {
  props: {
    alertState: {
      type: Boolean,
      required: true
    },
    data: {
      type: String,
      required: true
    }
  }

}
</script>

<style>
.alertmsg{position: fixed; z-index: 9999; left:50%; top:1%; width: 40%; padding: 5px; transform: translateX(-50%);
color:#fff; background-color: #222; text-align: center; font-size: 14px; border-radius: 15px;
}
/* upSlide animation */
.upSlide-enter-active {
    transition: all .3s ease;
  }
  .upSlide-leave-active {
    transition: all .5s ease-in-out;
  }
  .upSlide-enter, .upSlide-leave-to/ {
    transform:translateX(-50%) translateY(10px);
    opacity: 0;
  }
</style>
