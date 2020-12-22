<template>
  <div class="headnav">
    <div class="nav-container adaptive-nav-width">
      <div class="nav-logo-wapper">
        <img class="nav-logo-img" src="@/assets/csj-logo.png">
      </div>
      <div class="nav-title">长三角区域教育评价变革协作联盟专家库</div>
      <div class="nav-login-wapper">
        <div class="nav-user-wapper" @click="handleLogout">
          <img class="nav-user-img" src="@/assets/icon-profile.png">{{userName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getToken } from '@/utils/auth.js'

export default {
  computed: {
    ...mapState({
      //userStatus: state => state.user.status===0,
      userName: state => state.user.name,
    }),
  },

  methods: {
    //handleLogin() {
    //  this.$store.dispatch('user/login').then(response => {
    //    this.$router.push({ path: this.redirect || '/home'})
    //  }).catch(err => {})
    //},

    handleLogout() {
      this.$confirm(`确认退出登录?`, '提示').then(() => {
        /***********************************************
         * 对接时到store/user.js logout() 中补充登出操作 *
         ***********************************************/ 
        this.$store.dispatch('user/logout').then(() => {
          // 成功执行，跳回到入口
          window.location = "https://asc.shusim.com/edu/forum/"
        }).catch(err => {
          // 出现错误，进一步处理
        })
      }).catch(() => {
        // do nothing
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.headnav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  line-height: 72px;
  z-index: 999;
  background-color: #064b80;
  color: white;

  .nav-container {
    position: relative;
    height: 72px;
    margin: 0 auto;

    .nav-logo-wapper {
      float: left;
      height: 72px;
      .nav-logo-img {
        height: 44px;
        position: relative;
        top: -3px;
      }
    }
      
    .nav-title {
      float: left;
      font-size: 24px;
      font-weight: bold;
      margin-left: 14px;
    }
      
    .nav-login-wapper {
      float: right;

      .nav-login-button {
        background-color: white;
        color: #064b80;
        height: 36px;
        width: 60px;
        border-radius: 6px;
        line-height: 36px;
        text-align: center;
        font-size: 17px;
        letter-spacing: 1px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 18px;
        &:hover {
          opacity: 0.8;
        }
      }

      .nav-user-wapper {
        width: 80px;
        font-size: 17px;
        font-weight: bold;
        color: white;
        text-align: center;
        float: right;
        cursor: pointer;
        .nav-user-img {
          height: 20px;
          width: 20px;
          margin-right: 4px;
          position: relative;
          top: -2px;
          &:hover {
            opacity: 0.8;
          }
        }
      }    
    } 
  }
}
</style>