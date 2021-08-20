<template>
  <div v-if="showPage" class="pagination">
    <div class="page_inner">
      <button v-show="!onactive(0)" class="first" @click="onPageFirst(0)">
        <i class="fas fa-angle-double-left"></i>
      </button>
      <div class="page">
        <button
          v-for="(page,index) in totalPage"
          :key="page"
          :class="{'active':getCurrentPage=== index}"
          @click=" onPagination(index)"
        >
          {{ page }}
        </button>
      </div>
      <button v-show="!onactive(totalPage-1)" class="last" @click=" onPgeLast(totalPage-1)">
        <i class="fas fa-angle-double-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    totalPage: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      defaultPage: 3
    }
  },
  computed: {
    ...mapGetters('books', ['getBooks', 'getCurrentPage']),
    showPage () {
      return this.getBooks && this.totalPage > 1
    }
  },
  methods: {
    onPagination (index) {
      if (this.getCurrentPage === index) {
        return
      }
      this.$emit('pagination', index)
    },
    onPageFirst (page) {
      if (this.getCurrentPage === page) {
        return
      }
      this.$emit('pagination', page)
    },
    onPgeLast (page) {
      if (this.getCurrentPage === page) {
        return
      }
      this.$emit('pagination', page)
    },
    onactive (page) {
      return this.getCurrentPage === page
    }
  }

}
</script>

<style>
.pagination{text-align: center; padding: 30px 0 0; overflow-x: scroll;}
.page_inner{ display: flex; justify-content: center; align-items: center; width: auto; padding: 0 20px;}
.pagination .page{display: flex;}
.pagination  button{background-color:#ddd; width: 30px; height: 30px; border-radius: 50%; margin: 0 3px; flex-shrink: 0;}
.pagination .page button.active{background-color: #677eff;}
.pagination  button.first:hover,
.pagination  button.last:hover{background-color: #3b5999; color:#000;}
</style>
