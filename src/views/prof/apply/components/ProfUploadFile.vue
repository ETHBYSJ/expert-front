<template>
  <div class="prof-upload-container">
    <div class="prof-upload-wapper">
      <div class="prof-upload-intro">表格上传</div>
      <div class="prof-upload-content">
        <span style="color:#bbbbbb">请先下载</span>
        <el-tooltip class="item" effect="dark" content="点击下载文件" placement="right">
          <span style="color:#0639e1; cursor:pointer;" @click="downloadFile">《长三角区域教育评价变革协作联盟专家库成员申请表》</span>
        </el-tooltip>
        <span style="color:#bbbbbb">后填写并上传文件。</span>

        <div class="prof-upload-bot">
          <div class="prof-upload-button hollow-button" @click="choiceFile">{{uploadObj.text}}</div>
          <span class="prof-upload-file-name">{{uploadObj.name}}</span>
          <input ref="filElem" type="file" style="display:none" @change="getFile($event)">

          <div class="dept-upload-tip">{{uploadObj.alert}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertRes2Blob } from '@/utils/util.js'
import { reqDownloadExpertFile, reqUploadExpertFile } from '@/api/request.js'

export default {
  props: {
    uploadObj: {
      type: Object,
      default: function() {
        return  {
          text: '选择上传',
          name: '',
          alert: '',
        }
      }
    }
  },

  data() {
    return {
      uploadFileObj: {},
    }
  },

  watch: {
    'uploadObj.name': function() {
      this.uploadFile.alert = ''
    }
  },

  methods: {
    // 选择文件
    choiceFile() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },

    // 获得文件
    getFile(event) {
      // load文件名
      if (event.target.files.length == 0) {
        // do nothing
      }
      else {
        this.uploadFileObj = event.target.files[0]
        this.uploadFile()
      }
    },

    // 上传文件
    uploadFile() {
      if (this.uploadFileObj != {}) {
        let formData = new FormData()
        formData.append('file', this.uploadFileObj)
        reqUploadExpertFile(formData).then(res => {
          if (res.data.code === 10000) {
            this.$alert('文件上传成功！', '提示', {confirmButtonText: '确定'})
            this.uploadObj.name = event.target.files[0].name
          } else {
            this.$alert('文件上传失败', '提示', {confirmButtonText: '确定'})
          }
        }).catch(err => {
          this.$alert('文件上传失败', '提示', {confirmButtonText: '确定'})
        })
      }  
    },

    // 下载文件
    downloadFile() {
      this.$confirm(`确认下载该文件?`, '提示').then(() => {
        reqDownloadExpertFile().then(res => {
          convertRes2Blob(res)
        }).catch(err => {
          this.$alert('请求下载失败', '提示', {
            confirmButtonText: '确定',
          });
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
.prof-upload-container {
  position: relative;

  .prof-upload-wapper {
    display: flex;
    
    .prof-upload-intro {
      line-height: 40px;
      flex: 0 0 250px;
      font-size: 26px;
      font-weight: bold;
      padding-left: 50px;
    }

    .prof-upload-content {
      font-size: 15px;
      flex: 1;

      .prof-upload-bot {
        margin-bottom: 20px;

        .prof-upload-button {
          display: inline-block;
          margin: 12px 0 4px;
          height: 36px;
          width: 90px;
          line-height: 34px;
        }

        .prof-upload-file-name {
          display: inline-block;
          height: 30px;
          line-height: 20px;
          font-size: 14px;
          margin-left: 8px;
        }

        .dept-upload-tip {
          height: 18px;
          line-height: 18px;
          color: red;
          font-size: 12px;
        }
      }
    }
  }
}
</style>