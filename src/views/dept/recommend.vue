<template>
  <div class="rec-container">
    <div class="rec-wapper adaptive-rec-width">
      <div class="rec-title deep-blue-title">
        <span class="rec-index-text" @click="$router.push('/home')">首页</span>
        <span> —— 专家推荐</span>
      </div>
      
      <div class="rec-content-container adaptive-height">
        <div class="rec-left-wapper">
          <div class="rec-left-option-wapper">
            <span class="rec-left-option-number">1</span>
            <span class="rec-left-option-title">单位信息</span>
          </div>
          <div class="rec-left-line"></div>
          <div class="rec-left-option-wapper">
            <span class="rec-left-option-number">2</span>
            <span class="rec-left-option-title">专家推荐</span>
          </div>
          <div class="rec-left-line"></div>
          <div class="rec-left-option-wapper">
            <span class="rec-left-option-number">3</span>
            <span class="rec-left-option-title">上报成功</span>
          </div>
        </div>

        <div class="rec-right-wapper">
          <div class="rec-msg-container" v-if="leftStatus===1">
            
            <div class="rec-right-title light-blue-title">单位信息</div>

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

            <div class="rec-msg-unit">
              <div class="rec-msg-intro">填报单位</div>
              <div class="rec-msg-content">
                <el-input placeholder="请输入单位全称！" v-model="deptName"></el-input>
              </div>
            </div>

            <div class="rec-msg-unit">
              <div class="rec-msg-intro">单位负责人</div>
              <div class="rec-msg-content">
                <el-input placeholder="请输入单位负责人的姓名！" v-model="director"></el-input>
              </div>
            </div>

            <div class="rec-msg-unit">
              <div class="rec-msg-intro">经办人</div>
              <div class="rec-msg-content">
                <el-input placeholder="请输入经办人的姓名！" v-model="agent"></el-input>
              </div>
            </div>

            <div class="rec-msg-unit">
              <div class="rec-msg-intro">联系电话</div>
              <div class="rec-msg-content">
                <el-input placeholder="请输入联系电话！" v-model="phone"></el-input>
              </div>
            </div>

            <div class="next-button rec-msg-button" @click="nextStep">下一步</div>
          </div>

          <div class="rec-expert-container" v-else-if="leftStatus===2">
            <div class="rec-right-title light-blue-title">专家推荐</div>

            <div class="rec-expert-unit">
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-small">姓名</div>
                <el-input placeholder="请输入专家姓名" v-model="expertName"></el-input>
              </div>
              <div class="rec-expert-input-wapper" style="margin:0 30px">
                <div class="rec-expert-intro-small">性别</div>
                <el-input placeholder="请输入专家性别" v-model="expertSex"></el-input>
              </div>
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-small">年龄</div>
                <el-input placeholder="请输入专家年龄" v-model="expertAge"></el-input>
              </div>
            </div>

            <div class="rec-expert-unit">
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-small">学历</div>
                <el-input placeholder="请输入专家的学历" v-model="expertEdu"></el-input>
              </div>
              <div class="rec-expert-input-wapper" style="margin-left:50px;">
                <div class="rec-expert-intro-small">职称</div>
                <el-input placeholder="请输入专家的职称" v-model="expertTitle"></el-input>
              </div>
            </div>

            <div class="rec-expert-unit">
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-big">专业或学科</div>
                <el-input placeholder="请输入专家的办公电话" v-model="expertMajor"></el-input>
              </div>
            </div>

            <div class="rec-expert-unit">
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-big">工作单位</div>
                <el-input placeholder="请输入专家的办公电话" v-model="expertDept"></el-input>
              </div>
            </div>

            <div class="rec-expert-unit">
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-big">行政职务</div>
                <el-input placeholder="请输入专家的办公电话" v-model="expertPost"></el-input>
              </div>
            </div>

            <div class="rec-expert-unit">
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-big">办公电话</div>
                <el-input placeholder="请输入专家的办公电话" v-model="expertPhone"></el-input>
              </div>
              <div class="rec-expert-input-wapper" style="margin-left:50px;">
                <div class="rec-expert-intro-small">手机</div>
                <el-input placeholder="请输入专家的手机" v-model="expertPhone"></el-input>
              </div>
            </div>

            <div class="rec-expert-unit">
              <div class="rec-expert-input-wapper">
                <div class="rec-expert-intro-big">电子邮箱</div>
                <el-input placeholder="请输入专家的办公电话" v-model="expertEmail"></el-input>
              </div>
            </div>

            <div class="rec-expert-button-box">
              <div class="next-button" style="float:left" @click="backStep">上一步</div>
              <div class="next-button" style="float:right" @click="nextStep">下一步</div>
            </div>
          </div>

          <div v-else-if="leftStatus===3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftStatus: 2,
      // page 1
      deptName: '',
      director: '',
      agent: '',
      phone: '',
      uploadStatus: '选择文件',
      uploadName: '',
      // page2
      expertName: '',
      expertSex: '',
      expertAge: '',
      expertEdu: '',
      expertTitle: '',
      expertMajor: '',
      expertDept: '',
      expertPost: '',
      expertPhone: '',
      expertMobile: '',
      expertEmail: '',
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

    // 提交单位信息
    updateDeptMsg() {

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

    .rec-title {
      line-height: 80px;

      .rec-index-text {
        cursor: pointer;
      }
    }
  }

  .rec-content-container {
    position: relative;

    .rec-left-wapper {
      height: 100%;
      width: 220px;
      border-top: 4px solid #5CC0FE;
      border-bottom: 4px solid #5CC0FE;
      border-left: 1px solid #5CC0FE;
      border-right: 1px solid #5CC0FE;
      background: rgba($color: #fcfcfc, $alpha: 0.8);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-flow: column;
      padding: 4px 24px;

      .rec-left-option-wapper {
        font-size: 30px;
        line-height: 60px;
        color: #5CC0FE;

        .rec-left-option-number {
          display: inline-block;
          height: 38px;
          width: 38px;
          line-height: 36px;
          border: 1px solid #5CC0FE;
          border-radius: 50%;
          text-align: center;
        }

        .rec-left-option-title {
          font-weight: bold;
          position: relative;
          top: -1px;
        }
      }

      .rec-left-line {
        flex: 1;
        width: 1px;
        background: #5CC0FE;
        margin-left: 19px;
      }
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
        width: 700px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-flow: column;

        .rec-expert-unit {
          flex: 1;
          display: flex;

          .rec-expert-input-wapper {
            flex: 1;
            display: flex;

            .rec-expert-intro-big {
              //float: left;
              flex:0 0 140px;
              line-height: 40px;
              font-size: 26px;
              font-weight: bold;
            }

            .rec-expert-intro-small {
             // float: left;
              flex:0 0 75px;
              line-height: 40px;
              font-size: 26px;
              font-weight: bold;
            }

            .rec-expert-content {
              flex: 1;
            }
          }
        }
        
        .rec-expert-button-box {
          height: 100px;
          padding: 20px 120px;

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