<template>
  <div class="base-msg-container">
    <div class="base-msg-wapper">
      <div class="base-msg-lr">
        <img style="cursor:pointer" v-show="currPage==1" src="@/assets/left-arrow-blue.png" @click="currPage=0">
        <img style="cursor:not-allowed" v-show="currPage==0" src="@/assets/left-arrow-gray.png">
      </div>

      <div class="base-msg-mid" v-show="currPage==0">
        <prof-upload-file :uploadObj="uploadFileObj"></prof-upload-file>
        <prof-upload-img></prof-upload-img>
        <div class="base-msg-unit">
          <prof-input style="flex:0 0 355px;" size="big" :inputObj="name"></prof-input>
          <prof-input style="margin-left:50px;flex:1;" size="small" :inputObj="sex"></prof-input>
        </div>
        <div class="base-msg-unit">
          <prof-input style="flex:0 0 355px;" size="big" :inputObj="born"></prof-input>
          <prof-input style="margin-left:50px;flex:1;" size="small" :inputObj="nation"></prof-input>
        </div>
        <div class="base-msg-unit">
          <prof-input style="flex:0 0 355px;" size="big" :inputObj="phone"></prof-input>
          <prof-input style="margin-left:50px;flex:1;" size="small" :inputObj="email"></prof-input>
        </div>
      </div>

      <div class="base-msg-mid" v-show="currPage==1">
        <div class="base-msg-unit"></div>
        <div class="base-msg-mid-top">
          <div class="base-msg-unit">
            <div class="base-msg-unit">
              <prof-input size="medium" :inputObj="politics"></prof-input>
            </div>
            <div class="base-msg-unit">
              <prof-input style="margin-left:50px;" size="medium" :inputObj="health"></prof-input>
            </div>
          </div>
          <div class="base-msg-unit">
            <div class="base-msg-unit">
              <prof-input size="medium" :inputObj="homecall"></prof-input>
            </div>
            <div class="base-msg-unit">
              <prof-input style="margin-left:50px;" size="medium" :inputObj="mobile"></prof-input>
            </div>
          </div>
        </div>
        
        <div class="base-msg-mid-bot">
          <div class="base-msg-unit">
            <prof-input-2 :inputObj1="deptAddr" :inputObj2="deptCode"></prof-input-2>
          </div>
          <div class="base-msg-unit">
            <prof-input-2 :inputObj1="homeAddr" :inputObj2="homeCode"></prof-input-2>
          </div>
        </div>
        <div class="base-msg-unit"></div>
      </div>

      <div class="base-msg-lr">
        <img style="cursor:pointer" v-show="currPage==0" src="@/assets/right-arrow-blue.png" @click="currPage=1">
        <img style="cursor:not-allowed" v-show="currPage==1" src="@/assets/right-arrow-gray.png">
      </div>
    </div>
  </div>
</template>

<script>
import { ProfInput, ProfInput2, ProfUploadFile, ProfUploadImg } from '../components'

export default {
  components: {
    ProfInput,
    ProfInput2,
    ProfUploadFile,
    ProfUploadImg,
  },

  props: {

  },

  data() {
    return {
      currPage: 0,
      uploadFileObj: {
        uploadStatus: '选择文件',
        uploadName: '',
      },

      // 个人信息
      name: {name:'姓名', content: '', alert: false},
      sex: {name:'性别', content: '', alert: false},
      born: {name:'出生年月', content: '', alert: false},
      nation: {name:'民族', content: '', alert: false},
      phone: {name:'办公电话', content: '', alert: false},
      email: {name:'邮箱', content: '', alert: false},

      politics: {name:'政治面貌', content: '', alert: false},
      health: {name:'健康状况', content: '', alert: false},
      homecall: {name:'住宅电话', content: '', alert: false},
      mobile: {name:'手机号码', content: '', alert: false},

      deptAddr: {name:'单位地址', content: '', alert: false},
      deptCode: {name:'邮政编码', content: '', alert: false},
      homeAddr: {name:'家庭地址', content: '', alert: false},
      homeCode: {name:'邮政编码', content: '', alert: false},
    }
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>
.base-msg-container {
  height: 100%;
  position: relative;

  .base-msg-wapper {
    height: 100%;
    display: flex;
    align-items: center;   // 垂直居中，针对的是mycontainer类下面的子元素，不包含“孙子”元素
    justify-content: center; // 水平居中，针对的是mycontainer类下面的子元素，不包含“孙子”元素

    .base-msg-lr {
      width: 40px;

      img {
        height: 40px;
        width: 40px;  
      }
    }

    .base-msg-mid {
      flex: 1;
      display: flex;
      flex-flow: column;
      height: 100%;
      margin: 0 40px;

      .base-msg-mid-top {
        height: 160px;
        display: flex;
        flex-flow: column;
      }

      .base-msg-mid-bot {
        height: 280px;
        display: flex;
        flex-flow: column;
      }
    }
  }
}

.base-msg-unit {
  flex: 1;
  display: flex;
}
</style>