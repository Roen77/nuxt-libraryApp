import { mapGetters } from 'vuex'
import bus from '~/utils/bus'
import { inputLen } from '~/utils/validate'
export default {
  data () {
    return {
      errmsg: ''
    }
  },
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
    },
    hasErr () {
      return this.errmsg.length > 0
    },
    hasImage () {
      return this.getImagePath.length
    }
  },
  methods: {
    async fetchData () {
      try {
        const data = new FormData()
        const imageFile = this.mybook && this.mybook.thumbnail ? this.mybook.thumbnail : this.selectedFile
        console.log(imageFile, this.selectedFile, '이밎지짖지')
        const date = this.newBook && this.newBook.datetime ? new Date(this.newBook.datetime) : new Date()
        data.append('title', this.newBook.title)
        data.append('contents', this.newBook.contents)
        data.append('datetime', date)
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
      const imageFormData = new FormData()
      this.selectedFile = e.target.files[0]
      const maxSize = 1024 * 1024
      console.log(this.selectedFile, '????????????')
      const imageType = /^image/.test(this.selectedFile && this.selectedFile.type)
      if (!imageType) {
        this.selectedFile = ''
        this.errmsg = '이미지 타입만 업로드해주세요.'
        return
      }
      if (this.selectedFile.size > maxSize) {
        this.selectedFile = ''
        this.errmsg = '용량을 초과하였습니다. 1mb 이하로 업로드해주세요.'
        return
      }

      imageFormData.append('photo', this.selectedFile)
      this.uploadImg(imageFormData)
        // eslint-disable-next-line no-return-assign
        .then(() => this.errmsg = '')
    },
    // 엑스버튼을 클릭할 시, 초기화 시켜주는 함수
    resetInput (e, data) {
      const target = e.target.parentNode.firstChild
      this.newBook[data] = ''
      target.focus()
    }
  }
}
