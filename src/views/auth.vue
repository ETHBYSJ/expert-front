<template>
  <div class="mobile-container">
    <div class="mobile-wapper adaptive-width">
      <div class="mobile-title">手机验证</div>
      <div class="mobile-number">手机号：{{secretMobile}}</div>
      <div class="mobile-button hollow-button" @click="showModal='mobile'">验证</div>
    </div>

    <modal-phone v-if="showModal==='mobile'"
      @closeModal="closeModal"
    >

    </modal-phone>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ModalPhone from '../components/ModalPhone.vue'
export default {
  components: {
    ModalPhone,
  },

  computed: {
    ...mapState({
      secretMobile: state => state.user.secretMobile
    })
  },

  data() {
    return {
      showModal: ''
    }
  },

  methods: {
    closeModal() {
      this.showModal = ''
    }
  }
}
</script>

<style lang="scss">
.mobile-container {
  height: 100%;
  position: relative;
  padding-top: 50px;

  .mobile-wapper {
    padding: 0 100px;
    height: 200px;
    border: 4px solid #5cc0fe;
    background-color: rgba(255, 255, 255, 0.85);
    
    .mobile-title {
      font-size: 28px;
      font-weight: bold;
      text-align: center;
      color: #5cc0fe;
      line-height: 80px;
      margin-bottom: 25px;
    }

    .mobile-number {
      float: left;
      line-height: 32px;
    }

    .mobile-button {
      float: right;
      width: 64px;
      line-height: 30px;
      font-size: 14px;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>