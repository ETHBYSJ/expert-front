<template>
  <div class="rec-container">
    <div class="rec-wapper adaptive-rec-width">
      <page-title></page-title>
      
      <div class="rec-content-container adaptive-height">
        
        <div class="rec-left-wapper">
          <dept-nav></dept-nav>
        </div>
        <div class="rec-right-wapper">
          <div class="rec-msg-container" v-if="leftStatus===1">
            
            <div class="rec-right-title right-content-title">单位信息</div>

            <div class="rec-msg-upload adaptive-upload-width">
              <div class="rec-msg-intro">表格上传</div>
              <div class="rec-msg-content" style="font-size: 15px;">
                <span style="color:#bbbbbb">请先下载</span>
                <el-tooltip class="item" effect="dark" content="点击下载文件" placement="right">
                  <span style="color:#0639e1; cursor:pointer;">《长三角区域教育评价变革协作联盟专家库成员推荐汇总表》</span>
                </el-tooltip>
                <span style="color:#bbbbbb">后填写并上传文件。</span>

                <div class="upload-button hollow-button" @click="choiceFile">{{uploadStatus}}</div>
                <span class="upload-file-name">{{uploadName}}</span>
                <input ref="filElem" type="file" style="display:none" @change="getFile($event)">
              </div>
            </div>

            <div class="rec-msg-unit" v-for="(value, key) in deptMsg" :key="key">
              <dept-input :inputObj="value"></dept-input>
            </div>

            <div class="next-button rec-msg-button" @click="nextStep">下一步</div>
          </div>

          <div class="rec-expert-container" v-else-if="leftStatus===2">
            <div class="rec-right-title right-content-title">专家推荐</div>

            <expert-page :expertList="expertList"></expert-page>

            <div class="rec-expert-button-box">
              <div class="next-button" style="float:left" @click="backStep">上一步</div>
              <div class="next-button" style="float:right" @click="nextStep">提交</div>
            </div>
          </div>

          <div class="rec-result-container" v-else-if="leftStatus===3">
            <div class="rec-right-title right-content-title">上报成功</div>

            <div class="rec-result-img-wapper">
              <img src="@/assets/commit-succ.png">
            </div>

            <div class="rec-result-intro">专家推荐上报成功，请等待联盟秘书处审核！</div>

            <div class="next-button rec-result-button" @click="$router.push('/dept/detail')">完成</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import ExpertPage from './components/ExpertPage.vue'
import DeptNav from './components/DeptNav.vue'
import Expert from './expert.js'

export default {
  components: {
    ExpertPage,
    DeptNav,
    PageTitle,
  },

  data() {
    return {
      leftStatus: 2,
      recId: '',
      // page 1
      deptMsg: {
        name: {name: '填报单位', content: ''},
        director: {name: '单位负责人', content: ''},
        agent: {name: '经办人', content: ''},
        phone: {name: '联系电话', content: ''},
      },
      uploadStatus: '选择文件',
      uploadName: '',
      // page2
      expertList: [new Expert()]   
    }
  },

  mounted() {
    if (this.$route.query.id) {
      this.recId = this.$route.query.id
    } else {
      this.$router.push('/dept/detail')
    }  
  },

  methods: {
    // 上一步
    backStep() {
      if (this.leftStatus > 1) {
        this.leftStatus -= 1
      }
    },

    // 下一步
    nextStep() {
      // 1 -> 2
      if (this.leftStatus === 1) {
        this.leftStatus = 2
      }
      // 2 -> 3
      else if (this.leftStatus === 2) {
        this.leftStatus = 3
      }
    },

    // 检查空白信息
    checkBlankMsg(msg) {
      let flag = true
      for (let key in msg) {
        if (!msg[key] && msg[key].length <= 0) {
          msg[key]
        }
      }
      return flag
    },

    // 提交信息 
    commitRecMsg() {


    },
    
    // 选择文件
    choiceFile() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },

    // 获得文件
    getFile(event) {
      // load文件名
      if (event.target.files.length == 0) {
        this.uploadName = ''
        return
      }
      else {
        this.uploadName = event.target.files[0].name
      }
     },

  }
  
}
</script>

<style lang="scss" scoped>
.rec-container {
  position: relative;

  .rec-wapper {
    margin: 0 auto;


    .rec-content-container {
      position: relative;

      .rec-left-wapper {
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .rec-right-wapper {
        height: 100%;
        margin-left: 240px;
        border: 2px solid #5CC0FE;
        background: #ffffff;

        .rec-msg-container {
          width: 560px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          flex-flow: column;

          .rec-msg-button {
            margin: 24px auto;
          }

          .rec-msg-upload {
            
            .upload-button {
              margin: 12px 0 4px;
              height: 36px;
              width: 90px;
              line-height: 34px;
            }

            .upload-file-name {
              line-height: 20px;
              font-size: 14px;
            }
          }

          .rec-msg-unit {
            flex: 1;
          }
        }

        .rec-expert-container {
          width: 820px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          flex-flow: column;
          
          .rec-expert-button-box {
            height: 100px;
            padding: 20px 200px;

          }
        }

        .rec-result-container {
          width: 700px;
          height: 100%;
          margin: 0 auto;

          .rec-result-img-wapper {
            width: 185px;
            margin: 100px auto 80px;

            img {
              height: 185px;
              width: 185px;
            }
          }

          .rec-result-intro {
            width: 650px;
            margin: 0 auto;
            line-height: 40px;
            font-size: 32px;
            font-weight: bold;
            text-align: center;
          }

          .rec-result-button {
            margin: 130px auto 0;
          }
        }
      }
    }
  }
}

.rec-right-title {
  margin-bottom: 10px;
  line-height: 90px;
  text-align: center;
}

.rec-msg-intro {
  float: left;
  line-height: 40px;
  width: 200px;
  font-size: 26px;
  font-weight: bold;
}

.rec-msg-content {
  float: left;
  width: 320px;
}

</style>