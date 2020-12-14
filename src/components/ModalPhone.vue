<template>
  <div class="modal_phone_main">
    <div class="modal_phone_container">
      <div class="modal_phone_box">
        <div class="modal_phone_top">
          <div class="modal_phone_title">绑定手机号</div>
          <div class="modal_phone_close" @click="closeModalPhone">
            <span>关闭</span>
            <img src="@/assets/close.svg">
          </div>
        </div>
        <div class="modal_phone_bot">
          <div class="modal_phone_bot_top">
            <data-input :inputObj="phoneObj"></data-input>
          </div>
          <div class="modal_phone_bot_mid">
            <data-input class="code_input" :inputObj="codeObj"></data-input>
            <div class="code_btn" :class="{active: codeActive&&timeActive}" @click="getCode">{{codeText}}</div>
          </div>
          <div class="modal_phone_bot_bot">
            <div class="send_btn" :class="{active: bindActive}" @click="bindPhone">绑定手机号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DataInput from '@/components/DataInput.vue'
import { DataInputConfig } from '@/model/data-input-config'
import { isMobile } from '@/utils/util.js'
import { reqSendCode, reqCheckCode } from '@/api/request.js'

export default {
  data() {
    return {
      timing: null, // 定时器
      codeActive: false, // 记录手机号合法情况
      timeActive: true,  // 记录定时器情况
      bindActive: false,
      codeText: '获取验证码',
      phoneObj: new DataInputConfig('手机号', true, '', '请输入手机号', ''),
      codeObj: new DataInputConfig('', true, '', '验证码', ''),
      sendID: '',
    }
  },
  
  components: { 
    DataInput 
  },

  computed: {
  },

  watch: {
    'phoneObj.content': function (val) {
      this.codeActive = isMobile(val)
    }
  },

  methods: {
    /**
     * 获取验证码
     */
    getCode() {
      // 判断当前状态
      if(this.codeActice === false || this.timeActive === false)
        return
      
      // 清空错误信息
      this.phoneObj.dangerText = ''
      this.codeObj.dangerText = ''

      // 发送请求--异步
      reqSendCode({mobile: this.phoneObj.content}).then((res) => {
        this.sendID = res.data.data.id
        this.countSecond()
        this.bindActive = true
      }).catch((err) => {
        this.phoneObj.dangerText = '该号码发送数量过多，请稍后再试'
      })
    },

    /**
     * 读秒
     */
    countSecond() {
      let number = 60
      this.codeText = number + "s"
      this.timeActive = false
      this.timing = setInterval(() => {
        number--;
        this.codeText = number + "s";
        if (number === 0) {
          clearInterval(this.timing);
          this.timing = null;
          this.codeText = "获取验证码";
          this.timeActive = true
        }
      }, 1000);
    },

    /**
     * 绑定手机号
     */
    bindPhone() {
      if (this.bindActive === false) return

      var data = {
        id: this.sendID,
        mobile: this.phoneObj.content,
        code: this.codeObj.content,
      }
      
      reqCheckCode(data).then((res) => {
        const { mobile } = res.data.data
        if (mobile) {
          this.$store.dispatch({
            type: 'user/bindMobile', 
            payload: { mobile: mobile }
          }).then(response => {
            this.closeModalPhone()
            this.$router.push('/home')
          }).catch(error => {}) 
        }
        else {
          this.codeObj.dangerText = res.data.message
        }
      }).catch((err) => {
        this.codeObj.dangerText = err.response.data.message
      })
    },

    closeModalPhone() {
      this.$emit('closeModal')
    }
  },
}
</script>

<style lang="stylus" scoped>
.modal_phone_main
  height: 100%
  width 100%
  background-color: rgba(0, 0, 0, 0.5)
  position: fixed
  top 0
  left 0
  z-index 999
  .modal_phone_container
    height 100%
    width 100%
    position relative
    .modal_phone_box
      height 280px
      width 390px
      position: absolute
      left 50%
      top 50%
      transform: translate(-50%, -50%)
      -moz-transform: translate(-50%, -50%)
      -webkit-transform: translate(-50%, -50%)
      background-color: white
      display: flex
      flex-flow: column
      .modal_phone_top
        background-color: #064b80
        line-height: 58px
        color white
        padding 0 24px
        font-weight: bold
        .modal_phone_title
          font-size 20px
          float left
        .modal_phone_close
          float right
          cursor pointer
          font-size 16px
          img
            width 15px
            position relative
            top 2px
          &:hover
            opacity 0.8
      .modal_phone_bot
        flex: 1
        padding 16px 24px
        display: flex
        flex-flow: column
        .modal_phone_bot_mid
          .code_input
            width 200px
            float left
          .code_btn
            float right
            font-weight: bold
            color: rgba(0, 0, 0, 0.26)
            background-color: rgba(0, 0, 0, 0.12);
            height 40px
            width 115px
            border-radius: 4px
            margin-top 5px
            text-align: center
            line-height: 40px
            cursor not-allowed
            &.active
              background-color #064b80
              cursor pointer
              color white
        .modal_phone_bot_bot
          flex 1
          .send_btn
            font-weight: bold
            color: rgba(0, 0, 0, 0.26)
            background-color: rgba(0, 0, 0, 0.12);
            height 40px
            border-radius: 4px
            margin-top 10px
            text-align: center
            line-height: 40px
            cursor not-allowed
            &.active
              background-color #064b80
              cursor pointer
              color white
</style>