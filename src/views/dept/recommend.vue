<template>
  <div class="rec-container">
    <div class="rec-wapper adaptive-width">
      <div class="rec-title">
        <span class="rec-index-text">首页</span>
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
          <div class="rec-dept-msg-container" v-if="leftStatus===1">
            <div class="rec-dept-msg-title">单位信息</div>

            <div class="rec-dept-msg-upload">
              <div class="rec-dept-msg-intro">表格上传</div>
              <div class="rec-dept-msg-content upload-content">
                <span class="normal-text">请先下载</span>
                <el-tooltip class="item" effect="dark" content="点击下载文件" placement="right">
                  <span class="file-name-text">《长三角区域教育评价变革协作联盟专家库成员推荐汇总表》</span>
                </el-tooltip>
                <span class="normal-text">后填写并上传文件。</span>

                <div class="upload-button hollow-button" @click="choiceFile">{{uploadStatus}}</div>
                <span class="upload-file-name">{{uploadName}}</span>
                <input class="upload-file" ref="filElem" type="file" @change="getFile($event)">
              </div>
            </div>

            <div class="rec-dept-msg-unit">
              <div class="rec-dept-msg-intro">填报单位</div>
              <div class="rec-dept-msg-content">
                <el-input placeholder="请输入单位全称！" v-model="deptName"></el-input>
              </div>
            </div>

            <div class="rec-dept-msg-unit">
              <div class="rec-dept-msg-intro">单位负责人</div>
              <div class="rec-dept-msg-content">
                <el-input placeholder="请输入单位负责人的姓名！" v-model="director"></el-input>
              </div>
            </div>

            <div class="rec-dept-msg-unit">
              <div class="rec-dept-msg-intro">经办人</div>
              <div class="rec-dept-msg-content">
                <el-input placeholder="请输入经办人的姓名！" v-model="agent"></el-input>
              </div>
            </div>

            <div class="rec-dept-msg-unit">
              <div class="rec-dept-msg-intro">联系电话</div>
              <div class="rec-dept-msg-content">
                <el-input placeholder="请输入联系电话！" v-model="phone"></el-input>
              </div>
            </div>

            <div class="next-button rec-dept-msg-button" @click="nextStep">下一步</div>
          </div>

          <div class="" v-if="leftStatus===2">
          </div>

          <div v-if="leftStatus===3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftStatus: 1,
      deptName: '',
      director: '',
      agent: '',
      phone: '',
      uploadStatus: '选择文件',
      uploadName: '',
    }
  },

  mounted: {

  },

  methods: {

    // 从localStorage中拿数据
    getDataFromLocal() {

    },

    // 上一步
    backStep() {
      if (this.leftStatus > 1) {
        this.leftStatus -= 1
      }
    },

    // 下一步
    nextStep() {
      if (this.leftStatus < 3) {
        this.leftStatus += 1
      }
    },
    
    // 选择文件
    choiceFile() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },

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
      color: #064B80;
      font-size: 26px;
      font-weight: bold;

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

      .rec-dept-msg-container {
        width: 520px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-flow: column;

        .rec-dept-msg-title {
          margin-bottom: 20px;
          line-height: 80px;
          font-size: 32px;
          font-weight: bold;
          color: #5CC0FE;
          text-align: center;
        }

        .rec-dept-msg-button {
          margin: 24px auto;
        }

        .rec-dept-msg-upload {
            @media screen and (min-height: 980px) {// 大屏适配
              height: 160px;
            }

            @media screen and (min-height: 900px) and (max-height: 979px){
              height: 144px;
            }

            @media screen and (max-height: 899px) {
              height: 120px;
            }

            .upload-content {
              font-size: 15px;
              
              .normal-text {
                color: #bbbbbb;
              }

              .file-name-text {
                color: #0639e1;
                cursor: pointer;
              }
            }

            .upload-button {
              margin: 12px 0 4px;
              height: 36px;
              width: 90px;
              line-height: 34px;
            }

            .upload-file {
              display: none;
            }

            .upload-file-name {
              line-height: 20px;
              font-size: 14px;
            }
        }

        .rec-dept-msg-unit {
          flex: 1;
        }
      }
    }
  }
}

.rec-dept-msg-intro {
  float: left;
  line-height: 40px;
  width: 200px;
  font-size: 26px;
  font-weight: bold;
}

.rec-dept-msg-content {
  float: left;
  width: 320px;
}
</style>