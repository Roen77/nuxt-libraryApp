import { mapGetters } from 'vuex'
import bus from '~/utils/bus'
import 'vue2-datepicker/index.css'
export default {
  mounted () {
    setTimeout(() => {
      this.$refs.titleInput.focus()
    }, 400)
  },
  computed: {
    ...mapGetters('books', ['getImagePath'])
  },
  methods: {
    async fetchData () {
      try {
        const data = new FormData()
        data.append('title', this.newBook.title)
        data.append('contents', this.newBook.contents)
        data.append('datetime', this.datetime)
        data.append('isbn', this.newBook.isbn)
        data.append('publisher', this.newBook.publisher)
        data.append('photo', this.selectedFile)
        data.append('url', this.url)
        data.append('authors', this.newBook.authors)
        if (!this.$route.params.id) {
          // 책을 추가할 때
          await this.createBook(data)
            .then((res) => {
              this.$router.push('/books/1')
              bus.$emit('on:alert', res.data.msg)
              setTimeout(() => {
                bus.$emit('off:alert')
              }, 3000)
            })
        } else {
          // 책을 편집할 때
          await this.updateBook({ id: this.$route.params.id, data })
            .then((res) => {
              this.oneditStateChange()
              this.showimage = false
              this.resetImage = false
              bus.$emit('on:alert', res.data.msg)
              setTimeout(() => {
                bus.$emit('off:alert')
              }, 3000)
            })
        }
      } catch (error) {
        console.log(error)
        bus.$emit('on:alert', error.response.msg)
        setTimeout(() => {
          bus.$emit('off:alert')
        }, 3000)
      }
    },
    onChangeImage (e) {
      this.selectedFile = e.target.files[0]
      const imageFormData = new FormData()
      imageFormData.append('photo', this.selectedFile)
      this.uploadImg(imageFormData)
    },
    resetInput (e, data) {
      const target = e.target.parentNode.firstChild
      this.newBook[data] = ''
      target.focus()
    }
  }

}
