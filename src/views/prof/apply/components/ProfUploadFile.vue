<template>
  <div class="prof-upload-container">
    <div class="prof-upload-wapper">
      <div class="prof-upload-intro">表格上传</div>
      <div class="prof-upload-content">
        <span style="color:#bbbbbb">请先下载</span>
        <el-tooltip class="item" effect="dark" content="点击下载文件" placement="right">
          <span style="color:#0639e1; cursor:pointer;">《长三角区域教育评价变革协作联盟专家库成员申请表》</span>
        </el-tooltip>
        <span style="color:#bbbbbb">后填写并上传文件。</span>

        <div class="prof-upload-button hollow-button" @click="choiceFile">{{uploadObj.uploadStatus}}</div>
        <span class="prof-upload-file-name">{{uploadObj.uploadName}}</span>
        <input ref="filElem" type="file" style="display:none" @change="getFile($event)">
      </div>
    </div>
  </div>
</template>

<script>
import { reqUploadExpertFile } from '@/api/request.js'

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
        reqUploadExpertFile(this.$route.query.id, formData).then(res => {
          if (res.data.code === 10000) {
            this.$alert('文件上传成功！', '提示', {confirmButtonText: '确定'})
          } else {
            this.$alert('文件上传失败', '提示', {confirmButtonText: '确定'})
          }
        }).catch(err => {
          this.$alert('文件上传失败', '提示', {confirmButtonText: '确定'})
        })
      }  
    }
  }
}
</script>

<style lang="scss" scoped>
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

      .prof-upload-button {
        margin: 12px 0 4px;
        height: 36px;
        width: 90px;
        line-height: 34px;
      }

      .prof-upload-file-name {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
      }
    }

    
  }
}
</style>