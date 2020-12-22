<template>
  <div class="dept-upload-container">
    <div class="dept-upload-wapper">
      <div class="dept-upload-intro">表格上传</div>
      <div class="dept-upload-content">
        <span style="color:#bbbbbb">请先下载</span>
        <el-tooltip class="item" effect="dark" content="点击下载文件" placement="right">
          <span style="color:#0639e1; cursor:pointer;" @click="downloadFile">《长三角区域教育评价变革协作联盟专家库成员推荐汇总表》</span>
        </el-tooltip>
        <span style="color:#bbbbbb">后填写并上传文件。</span>

        <div class="dept-upload-button hollow-button" @click="choiceFile">{{uploadObj.uploadStatus}}</div>
        <span class="dept-upload-file-name">{{uploadObj.uploadName}}</span>
        <input ref="filElem" type="file" style="display:none" @change="getFile($event)">
      </div>
    </div>
  </div>
</template>

<script>
import { convertRes2Blob } from '@/utils/util.js'
import { reqDownloadDeptFile, reqUploadDeptFile } from '@/api/request.js'

export default {
  props: {
    uploadObj: Object,
  },

  data() {
    return {
      uploadFileObj: {},
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
        this.uploadObj.uploadName = ''
      }
      else {
        this.uploadFileObj = event.target.files[0]
        this.uploadObj.uploadName = event.target.files[0].name
        this.uploadFile()
      }
    },

    // 上传文件
    uploadFile() {
      if (this.uploadFileObj != {}) {
        let formData = new FormData()
        formData.append('file', this.uploadFileObj)
        reqUploadDeptFile(this.$route.query.id, formData).then(res => {
          if (res.data.code === 10000) {
            this.$alert('文件上传成功！', '提示', {confirmButtonText: '确定'})
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
        reqDownloadDeptFile().then(res => {
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

<style lang="scss" scoped>
.dept-upload-container {
  position: relative;

  .dept-upload-wapper {
    display: flex;
    
    .dept-upload-intro {
      line-height: 40px;
      width: 200px;
      font-size: 26px;
      font-weight: bold;
    }

    .dept-upload-content {
      font-size: 15px;
      flex: 1;

      .dept-upload-button {
        margin: 12px 0 4px;
        height: 36px;
        width: 90px;
        line-height: 34px;
      }

      .dept-upload-file-name {
        line-height: 20px;
        font-size: 14px;
      }
    }

    
  }
}
</style>