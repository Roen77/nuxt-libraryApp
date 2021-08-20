import { mapGetters } from 'vuex'
import bus from '~/utils/bus'
import { inputLen } from '~/utils/validate'
export default {
  //  마운트될 때, 타이틀입력폼 태그에 포커스되도록 구현
  mounted () {
    if (!this.$refs.titleInput) { return }
    setTimeout(() => {
      this.$refs.titleInput.focus()
    }, 400)
  },
  computed: {
    ...mapGetters('books', ['getImagePath']),
    // 유효성 검사
    InputLenValid () {
      const data = ['title', 'isbn', 'authors', 'publisher']
      return inputLen(this.newBook, data, 50)
    },
    disabledBtn () {
      return !this.newBook.title || !this.newBook.authors || !this.newBook.contents || !this.InputLenValid
    }
  },
  methods: {
    async fetchData () {
      try {
        const data = new FormData()
        const imageFile = this.selectedFile || this.mybook.thumbnail
        data.append('title', this.newBook.title)
        data.append('contents', this.newBook.contents)
        data.append('datetime', new Date(this.newBook.datetime))
        data.append('isbn', this.newBook.isbn)
        data.append('publisher', this.newBook.publisher)
        data.append('photo', imageFile)
        data.append('url', this.newBook.url)
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
        bus.$emit('on:alert', error.response.data.msg)
        setTimeout(() => {
          bus.$emit('off:alert')
        }, 3000)
      }
    },
    // 이미지 미리보기 업로드
    onChangeImage (e) {
      this.selectedFile = e.target.files[0]
      const imageFormData = new FormData()
      imageFormData.append('photo', this.selectedFile)
      this.uploadImg(imageFormData)
    },
    // 엑스버튼을 클릭할 시, 초기화 시켜주는 함수
    resetInput (e, data) {
      const target = e.target.parentNode.firstChild
      this.newBook[data] = ''
      target.focus()
    }
  }
}
