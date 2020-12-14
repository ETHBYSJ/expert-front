<template>
  <div class="home_container">
    <div class="choose_wapper adaptive-width">
      <div class="choose_box_wapper">
        <choose-box 
          :img-src="require('@/assets/user.png')"
          text="我是用户，我要查询专家"
        >
        </choose-box>
      </div>
      <div class="choose_box_wapper">
        <choose-box 
          :img-src="require('@/assets/expert.png')"
          text="我是被推荐人，我要成为专家"
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

  data() {
    return {
      modalShow: '',
    }
  },

  computed: {
    ...mapState({
      role: state => state.user.role
    })
  },

  methods: {
    handleDept() {
      if (!this.role || this.role.length <= 0) {
        this.modalShow = 'noAuth'
      } else {
        this.$router.push('/dept')
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