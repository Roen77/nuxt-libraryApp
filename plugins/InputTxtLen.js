export default {
  install (Vue) {
    Vue.prototype.$inputLen = (value, len) => {
      return Object.keys(value).every(key => value[key].length < len)
    }
  }
}
