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
            
            <div class="right-content-title">单位信息</div>

            <div class="adaptive-upload-height">
              <dept-upload :uploadObj="uploadObj"></dept-upload>
            </div>

            <div class="rec-msg-unit" v-for="(value, key) in deptMsg" :key="key">
              <dept-input :inputObj="value"></dept-input>
            </div>

            <div class="next-button rec-msg-button" @click="nextStep">下一步</div>
          </div>

          <div class="rec-expert-container" v-else-if="leftStatus===2">
            <div class="right-content-title">专家推荐</div>

            <div class="rec-expert-content-wapper">
              <expert-page refs="expert-page" :expertList="expertList"></expert-page>
            </div>

            <div class="rec-expert-button-box">
              <div class="next-button" style="float:left" @click="backStep">上一步</div>
              <div class="next-button" style="float:right" @click="nextStep">提交</div>
            </div>
          </div>

          <div class="rec-result-container" v-else-if="leftStatus===3">
            <div class="right-content-title">上报成功</div>

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
import { DeptNav, DeptInput, DeptUpload, ExpertPage} from './components'
import { Department, Expert } from './model.js'
import { reqGetRecMsg, reqCommitRecMsg } from '@/api/request.js'

export default {
  components: {
    ExpertPage,
    DeptNav,
    DeptInput,
    PageTitle,
    DeptUpload,
  },

  data() {
    return {
      leftStatus: 1,
      submitId: '',
      uploadObj: {
        uploadStatus: '选择文件',
        uploadName: '',
      },
      // page1
      deptMsg: new Department(),
      // page2
      expertList: [new Expert()]   
    }
  },

  activated() {
    if (this.$route.query.id) {
      this.submitId = this.$route.query.id
      // 查询该id是否有记录
      reqGetRecMsg(this.submitId).then(res => {
        // 编辑
        if (res.data.code === 10000) {
          this.loadRecMsg(res.data.data)
        } else {
          // 没有记录，新建
          // 清空旧的缓存数据
          this.uploadObj = {
            uploadStatus: '选择文件',
            uploadName: '',
          },
          this.deptMsg = new Department(),
          this.expertList = [new Expert()]  
        }
        this.leftStatus = 1
      }).catch(err => {
        //console.log(err)
        window.location = "https://asc.shusim.com/edu/forum/"
      })
    } else {
      this.$router.push('/dept/detail')
    }  
  },

  methods: {
    // 加载已推荐数据
    loadRecMsg(data) {
      const { file, department, list } = data
      // 加载上传文件信息
      this.uploadObj.uploadName = file
      this.uploadObj.uploadStatus = (file && file.length>0) ? '重新上传' : '选择文件'
      // 加载部门信息
      for (let key in department) {
        this.deptMsg[key].content = department[key]
      }
      // 加载专家信息
      for (let expertKey in list) {
        this.expertList = []
        let tmpExpert = new Expert()
        for (let key in list[expertKey]) {
          tmpExpert[key].content = list[expertKey][key]
        }
        this.expertList.push(tmpExpert)
      }
    },

    // 上一步
    backStep() {
      if (this.leftStatus === 2) {
        this.leftStatus = 1
      }
    },

    // 下一步
    nextStep() {
      // 1 -> 2
      if (this.leftStatus === 1) {
        if (this.checkDeptMsg()) {
          this.leftStatus = 2
        }
      }
      // 2 -> 3
      else if (this.leftStatus === 2) {
        const data = this.packRecMsg()
        //console.log(data)
        reqCommitRecMsg(data).then(res => {
          // 提交成功
          if (res.data.code === 10000) {
            this.leftStatus = 3
          } else {
            // 提交失败操作
            this.$alert('提交失败', '提示', {
              confirmButtonText: '确定',
            });
          }
        }).catch(_ => {
          this.$alert('提交失败', '提示', {
            confirmButtonText: '确定',
          });
        }) 
      }
    },

    // 打包commit数据
    packRecMsg() {
      let msg = {'submitID': this.submitId, department: {}, list: []}
      // 单位信息
      for (let key in this.deptMsg) {
        msg.department[key] = this.deptMsg[key].content
      }
      // 专家信息
      for (let expertKey in this.expertList) {
        const expert = this.expertList[expertKey]
        let tmpExpert = {}
        for (let key in expert) {
          tmpExpert[key] = expert[key].content
        }
        delete tmpExpert.id
        msg.list.push(tmpExpert)
      }
      return msg
    },

    // 检查单位空白信息
    checkDeptMsg() {
      let flag = true
      for (let key in this.deptMsg) {
        if (!this.deptMsg[key].content || this.deptMsg[key].content.length <= 0) {
          flag = false
          this.deptMsg[key].alert = true
        }
      }
      return flag
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

          .rec-expert-content-wapper {
            flex: 1;
          }
          
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

.right-content-title {
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