<template>
  <div class="profile_content">
    <div class="profile_box">
      <h2>프로필 정보 수정</h2>
      <form class="form_content" @submit.prevent="onChangeProfile">
        <!-- 이메일 -->
        <div>
          <label for="email">이메일</label>
          <p><input id="email" class="readonly" readonly :value="getUser.email" type="text"></p>
        </div>
        <!-- 닉네임 -->
        <div>
          <label for="username">닉네임</label>
          <p><input id="username" v-model="username" type="text"></p>
        </div>
        <div v-if="isusernamevalid" class="err">
          닉네임은 20자 이하로 입력해주세요.
        </div>
        <!-- 포르필 이미지 수정 -->
        <div class="file_container add">
          <LoadingBar v-if="$store.state.initLoading" position />
          <div class="txt">
            <label for="fileinput"><span class="round-btn yellow"><i class="far fa-file-image"></i>프로필 이미지
              수정</span></label>
            <input id="fileinput" ref="file" style="display:none" type="file" @change="onChangeImage">
          </div>
          <!-- 이미지 사진 보여주기 -->
          <div class="photos">
            <div class="images">
              <img v-if="hasThumbnail" :src="getUser.thumbnail" alt="thumbnail">
              <img v-if="hasImage" :src="`${getImagePath}`" alt="thumbnail">
            </div>
          </div>
        </div>
        <div class="err">
          {{ errmsg }}
        </div>
        <button class="round-btn" type="submit" :disabled="errmsg.length !== 0 || isusernamevalid">
          프로필 정보 수정
        </button>
      </form>
    </div>
    <!-- profile -->
    <div v-if="getUser && !getUser.provider" class="profile_box password_box">
      <h2>비밀번호 수정</h2>
      <form class="form_content" @submit.prevent="onChangePassword">
        <div>
          <label for="email">이메일</label>
          <p><input id="email2" class="readonly" readonly :value="getUser.email" type="text"></p>
        </div>
        <div>
          <label for="password">비밀번호</label>
          <input id="password" value="password" type="password" readonly>
          <button class="round-btn fill change-btn" type="button" @click="isChangePassword=!isChangePassword">
            변경
          </button>
        </div>
        <div v-if="isChangePassword" class="password_form">
          <div>
            <label for="password">비밀번호</label>
            <input id="password" v-model="password" type="password">
          </div>
          <div v-if="!isvalidLength && password" class="err">
            비밀번호는 8자리 이상 30자 이하여야 합니다.
          </div>
          <div>
            <label for="confirm_password">비밀번호 확인</label>
            <input id="confirm_password" v-model="confirm_password" type="password">
          </div>
        </div>
        <div v-if="!isconfirmPassword && confirm_password" class="err">
          비밀번호가 일치하지 않습니다
        </div>
        <button class="round-btn" type="submit" :disabled="!isconfirmPassword ||!password">
          비밀번호 수정
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { validLength } from '../../utils/validate'
export default {
  data () {
    return {
      email: '',
      username: '',
      isChangePassword: false,
      password: '',
      confirm_password: '',
      selectedFile: '',
      errmsg: ''

    }
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    ...mapGetters('books', ['getImagePath']),
    isconfirmPassword () {
      return this.password === this.confirm_password
    },
    isvalidLength () {
      return validLength(this.password, 8, 30)
    },
    isnicknameLength () {
      return validLength(this.username, 0, 20)
    },
    isusernamevalid () {
      return this.username && !this.isnicknameLength
    },
    hasImage () {
      return this.getImagePath.length > 0
    },
    hasThumbnail () {
      return !this.hasImage && this.getUser.thumbnail
    }
  },
  created () {
    // 기존 사용자의 닉네임을 보여줍니다.
    this.username = this.getUser.username
    //  이미지 데이터 초기화
    if (this.getImagePath.length !== 0) {
      return this.resetImgagePath()
    }
  },
  methods: {
    ...mapMutations('books', ['resetImgagePath']),
    ...mapActions('user', ['updateProfile', 'updatePassword']),
    ...mapActions('books', ['uploadImg']),
    // 프로파일 정보 수정(닉네임,프로파일 이미지 수정)
    onChangeProfile () {
      const userinfo = { username: this.username, thumbnail: this.getImagePath }
      this.updateProfile(userinfo)
      // 프로파일 정보 수정 후 라우터 이동
      this.$router.push('/user/profile')
    },
    // 이미지 업로드
    onChangeImage (e) {
      const imageFormData = new FormData()
      let selectedFile = e.target.files[0]
      const maxSize = 1024 * 1024
      const imageType = /^image/.test(selectedFile && selectedFile.type)
      // 이미지 타입인지 확인
      if (!imageType) {
        selectedFile = ''
        this.errmsg = '이미지 타입만 업로드해주세요.'
        return
      }
      // 이미지 사이즈 확인
      if (selectedFile.size > maxSize) {
        selectedFile = ''
        this.errmsg = '용량을 초과하였습니다. 1mb 이하로 업로드해주세요.'
        return
      }
      // 이미지 업로드 API 호출
      imageFormData.append('photo', selectedFile)
      this.uploadImg(imageFormData, { user: true })
        // eslint-disable-next-line no-return-assign
        .then(() => this.errmsg = '')
    },
    // 비밈번호 변경
    onChangePassword () {
      this.updatePassword({ password: this.password })
      this.$router.push('/user/profile')
    }
  }

}
</script>

<style>
.profile_content .profile_box{margin-bottom: 40px; border: 1px solid #ddd; box-sizing: border-box; padding: 20px; border-radius: 20px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);background-color: #fff;}
.profile_content .profile_box.password_box{margin-bottom: 200px;}
.profile_content .profile_box .password_form>div{margin: 18px 0;}
.profile_content .file_container .photos{margin: 30px 0;}
.profile_content .change-btn{margin: 20px 0;}
@media (max-width:360px){
  .profile_content .file_container .photos{margin: 0;}
}
</style>
