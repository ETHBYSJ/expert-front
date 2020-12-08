<template>
  <div class="headnav">
    <div class="nav-container">
      <div class="nav-logo-wapper">
        <img class="nav-logo-img" src="@/assets/csj-logo.png">
      </div>
      <div class="nav-title">长三角区域教育评价变革协作联盟专家库</div>
      <div class="nav-login-wapper">
        <div class="nav-login-button" v-if="true">登录</div>
        <div class="nav-user-wapper" v-else>
          <img class="nav-user-img" src="@/assets/icon-profile.png">{{userName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      userId: state => state.user.id,
      userName: state => state.user.name,
    }),
  },
  
  methods: {
    handleLogin() {
      this.$store.dispatch('user/login')
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
  line-height: 64px;
  z-index: 999;
  background-color: #064b80;
  color: white;

  .nav-container {
    position: relative;
    height: 64px;
    @media screen and (min-width:1500px) {
      width: 1200px;
      margin: 0 auto;
    }
    @media screen and (min-width:1000px) and (max-width:1499px) {
      width: 80%;
      margin: 0 10%;
    }
    @media screen and (max-width:999px) {
      width: 800px;
      margin: 0 auto;
    }
    
    .nav-logo-wapper {
      float: left;
      height: 64px;
      .nav-logo-img {
        height: 44px;
        margin-top: 10px;
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
        margin-top: 14px;
        &:hover {
          opacity: 0.8;
        }
      }

      .nav-user-wapper {
        position: absolute;
        right: 14px;
        top: 0;
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
          top: -1px;
          &:hover {
            opacity: 0.8;
          }
        }
      }    
    } 
  }
}
</style>