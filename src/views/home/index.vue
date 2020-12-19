<template>
  <div class="home_container">
    <div class="choose_wapper adaptive-home-width">
      <div class="choose_box_wapper">
        <choose-box 
          :img-src="require('@/assets/user.png')"
          text="我是用户，我要查询专家"
          @click.native="handleFind"
        >
        </choose-box>
      </div>
      <div class="choose_box_wapper">
        <choose-box 
          :img-src="require('@/assets/expert.png')"
          text="我是被推荐人，我要成为专家"
          @click.native="handleApply"
        >
        </choose-box>
      </div>
      <div class="choose_box_wapper">
        <choose-box 
          :img-src="require('@/assets/department.png')"
          text="我是申报单位，我要推荐专家"
          @click.native="handleDept"
        >
        </choose-box>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChooseBox from './components/ChooseBox.vue'
export default {
  components: { ChooseBox },

  computed: {
    ...mapState({
      role: state => state.user.role,
    })
  },

  methods: {
    handleFind() {
      if (!this.role || this.role.length == 0) {
        this.$alert('当前角色无权限访问该功能', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        const roles = this.role.split('/')
        if (roles.includes('c3j.experts')) {
          this.$router.push('/find')
        } else {
          this.$alert('当前角色无权限访问该功能', '提示', {
            confirmButtonText: '确定',
          });
        }
      }
    },

    handleApply() {
      if (!this.role || this.role.length == 0) {
        this.$alert('当前角色无权限访问该功能', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        const roles = this.role.split('/')
        if (roles.includes('professor') && roles.includes('c3j.experts')) {
          this.$router.push('/prof')
        } else {
          this.$alert('当前角色无权限访问该功能', '提示', {
            confirmButtonText: '确定',
          });
        }
      }
    },

    handleDept() {
      if (!this.role || this.role.length == 0) {
        this.$alert('当前角色无权限访问该功能', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        const roles = this.role.split('/')
        if (roles.includes('manager') && roles.includes('c3j.experts')) {
          this.$router.push('/dept')
        } else {
          this.$alert('当前角色无权限访问该功能', '提示', {
            confirmButtonText: '确定',
          });
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home_container {
  position: relative;
  height: calc(100vh - 72px);

  .choose_wapper {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    margin: 0 auto;

    .choose_box_wapper {
      flex: 1;
    }
      
  }

}
</style>