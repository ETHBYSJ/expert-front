<template>
  <div class="base-msg-container">
    <div class="base-msg-wapper">
      <div class="base-msg-input-wapper">
        <div class="base-msg-lr">
          <img style="cursor:pointer" v-show="currPage==1" src="@/assets/left-arrow-blue.png" @click="goPage(0)">
          <img style="cursor:not-allowed" v-show="currPage==0" src="@/assets/left-arrow-gray.png">
        </div>

        <div class="base-msg-mid animate__animated animate__fadeIn" v-show="currPage==0">
          <prof-upload-file :uploadObj="uploadObj"></prof-upload-file>
          <prof-upload-img :imageObj="imageObj"></prof-upload-img>
          <div class="base-msg-unit">
            <div class="base-msg-unit">
              <prof-input :inputObj="pageMsg[0].name"></prof-input>
            </div>
            <div class="base-msg-unit">
              <prof-input style="padding-left:50px;" size="100px" :inputObj="pageMsg[0].sex"></prof-input>
            </div>
          </div>
          <div class="base-msg-unit">
            <div class="base-msg-unit">
              <prof-input :inputObj="pageMsg[0].born"></prof-input>
            </div>
            <div class="base-msg-unit">
              <prof-input style="padding-left:50px;" size="100px" :inputObj="pageMsg[0].nation"></prof-input>
            </div>
          </div>
          <div class="base-msg-unit">
            <div class="base-msg-unit">
              <prof-input :inputObj="pageMsg[0].phone"></prof-input>
            </div>
            <div class="base-msg-unit">
              <prof-input style="padding-left:50px;" size="100px" :inputObj="pageMsg[0].email"></prof-input>
            </div>
          </div>
        </div>

        <div class="base-msg-mid animate__animated animate__fadeIn" v-show="currPage==1">
          <div class="base-msg-unit"></div>
          <div class="base-msg-mid-top">
            <div class="base-msg-unit">
              <div class="base-msg-unit" style="margin-right:50px;">
                <prof-input size="125px" :inputObj="pageMsg[1].politics"></prof-input>
              </div>
              <div class="base-msg-unit">
                <prof-input size="125px" :inputObj="pageMsg[1].health"></prof-input>
              </div>
            </div>
            <div class="base-msg-unit">
              <div class="base-msg-unit" style="margin-right:50px;">
                <prof-input size="125px" :inputObj="pageMsg[1].homecall"></prof-input>
              </div>
              <div class="base-msg-unit">
                <prof-input size="125px" :inputObj="pageMsg[1].mobile"></prof-input>
              </div>
            </div>
          </div>
          
          <div class="base-msg-mid-bot">
            <div class="base-msg-unit">
              <prof-input-2 :inputObj1="pageMsg[1].deptAddr" :inputObj2="pageMsg[1].deptCode"></prof-input-2>
            </div>
            <div class="base-msg-unit">
              <prof-input-2 :inputObj1="pageMsg[1].homeAddr" :inputObj2="pageMsg[1].homeCode"></prof-input-2>
            </div>
          </div>
          <div class="base-msg-unit"></div>
        </div>

        <div class="base-msg-lr">
          <img style="cursor:pointer" v-show="currPage==0" src="@/assets/right-arrow-blue.png" @click="goPage(1)">
          <img style="cursor:not-allowed" v-show="currPage==1" src="@/assets/right-arrow-gray.png">
        </div>
      </div>

      <div class="base-msg-button-wapper">
        <div class="next-button" style="margin: 0 auto;" v-show="currPage==1" @click="nextStep">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  reqUploadExpertFile,
  reqGetExpertFile,
  reqDownloadExpertFile,
  reqUploadPhoto,
  reqGetPhotoUrl,
  reqCommitProfBaseMsg,
  reqGetProfBaseMsg,
} from '@/api/request.js'
import { ProfInput, ProfInput2, ProfUploadFile, ProfUploadImg } from '../components'

export default {
  components: {
    ProfInput,
    ProfInput2,
    ProfUploadFile,
    ProfUploadImg,
  },

  data() {
    return {
      currPage: 0,
      uploadObj: {
        text: '选择文件',
        name: '',
        alert: '',
      },
      imageObj: {
        imageUrl: '',
        alert: '',
      },
      // 个人信息
      pageMsg: [{
        name:   {name:'姓名', content: '', alert: false},
        sex:    {name:'性别', content: '', alert: false},
        born:   {name:'出生年月', content: '', alert: false},
        nation: {name:'民族', content: '', alert: false},
        phone:  {name:'办公电话', content: '', alert: false},
        email:  {name:'邮箱', content: '', alert: false},
      },
      {
        politics: {name:'政治面貌', content: '', alert: false},
        health:   {name:'健康状况', content: '', alert: false},
        homecall: {name:'住宅电话', content: '', alert: false},
        mobile:   {name:'手机号码', content: '', alert: false},
        deptAddr: {name:'单位地址', content: '', alert: false},
        deptCode: {name:'邮政编码', content: '', alert: false},
        homeAddr: {name:'家庭地址', content: '', alert: false},
        homeCode: {name:'邮政编码', content: '', alert: false},
      }],
    }
  },

  mounted() {
    reqGetProfBaseMsg().then(res => {
      //console.log(res)
      if (res.data.code === 10000) {
        this.loadBaseMessage(res.data.data)
      } else {
        this.$alert('加载基本信息失败，请刷新后重试', '提示', {
          confirmButtonText: '确定',
        });
      }
    }).catch(err => {
      this.$alert('加载基本信息失败，请刷新后重试', '提示', {
        confirmButtonText: '确定',
      });
    })

    reqGetPhotoUrl().then(res => {
      if (res.data.code === 10000) {
        if (res.data.data && res.data.data.length>0) {
          this.imageObj.imageUrl = 'http://localhost:1125' + res.data.data
        }
      }
    }).catch(err => {
      this.$alert('加载头像失败，请刷新后重试', '提示', {
        confirmButtonText: '确定',
      });
    })

  
    reqGetExpertFile().then(res => {
      if (res.data.code === 10000) {
        // load上传文件
        if (res.data.data && res.data.data.length > 0) {
          this.uploadObj.text = '重新上传'
          this.uploadObj.name = res.data.data
        } else {
          this.uploadObj.text = '选择上传'
          this.uploadObj.name = ''
        }
      }
    }).catch(err =>{
      this.$alert('加载文件失败，请刷新后重试', '提示', {
        confirmButtonText: '确定',
      });
    })
  
  },

  methods: {
    checkPage() {
      let flag = true
      // 检查上传文件和头像
      if (!(this.uploadObj.name && this.uploadObj.name.length>0)) {
        flag = false
        this.uploadObj.alert = '请上传文件！'
      }
      if (!(this.imageObj.imageUrl && this.imageObj.imageUrl.length>0)) {
        flag = false
        this.imageObj.alert = '请上传头像！'
      }
      // 检查当前页信息
      let curr = this.pageMsg[this.currPage]
      for (let key in curr) {
        if (!(curr[key].content && curr[key].content.length>0)) {
          flag = false
          curr[key].alert = true
        }
      }
      return flag
    },

    goPage(page) {
      if (this.checkPage()) {
        this.currPage = page
      }
    },

    loadBaseMessage(data) {
      for (let msg of this.pageMsg) {
        for(let key in msg) {
          msg[key].content = data[key]
        }
      }
    },

    packBaseMessage() {
      let data = {}
      for (let msg of this.pageMsg) {
        for(let key in msg) {
          data[key] = msg[key].content
        }
      }
      return data
    },

    nextStep() {
      if (this.checkPage()) {
        // 请求
        const data = this.packBaseMessage()
        reqCommitProfBaseMsg(data).then(res => {
          if (res.data.code === 10000) {
            this.$emit('jump', 1)
            this.currPage = 0
          } else {
            this.$alert('基本信息提交失败', '提示', {
              confirmButtonText: '确定',
            });
          }
        }).catch(err => {
          this.$alert('基本信息提交失败', '提示', {
            confirmButtonText: '确定',
          });
        })
      }
    }
  }
}
</script>

<style lang="scss">
.base-msg-container {
  height: 100%;
  position: relative;

  .base-msg-wapper {
    height: 100%;
    display: flex;
    flex-flow: column;
    
    .base-msg-input-wapper {
      flex: 1;
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

    .base-msg-button-wapper {
      height: 85px;
    }
  }
}

.base-msg-unit {
  flex: 1;
  display: flex;
}
</style>