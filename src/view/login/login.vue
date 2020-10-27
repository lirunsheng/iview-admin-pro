<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">{{errorMsg}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import {mapActions} from 'vuex'

export default {
  data () {
    return {
      errorMsg: ''
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({userName, password}) {
      this.handleLogin({userName, password}).then(res => {
        if (res.code === 200) {
          this.$router.push({
            name: this.$config.homeName
          })
        } else {
          this.errorMsg = this.$t('account_error')
        }
      })
    }
  }
}
</script>

<style>

</style>
