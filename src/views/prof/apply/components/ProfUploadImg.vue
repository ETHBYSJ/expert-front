<template>
  <div class="prof-upload-container">
    <div class="prof-upload-wapper">
      <div class="prof-upload-intro">证件照片</div>
      <div class="prof-upload-content">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:1125/api/v1/apply/uploadPhoto"
          :limit="1"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="prof-upload-limit">请上传295像素*413像素的证件照</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUploadExpertImage } from '@/api/request.js'

export default {
  props: {
    imageUrl: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$alert('头像上传成功！', '提示', {
        confirmButtonText: '确定',
      });
    },

    handleAvatarError() {
      this.$alert('头像上传失败', '提示', {
        confirmButtonText: '确定',
      });
    },

    beforeAvatarUpload(file) {
      const isImg = ['image/jpeg', 'image/png'].includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImg) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImg && isLt2M;
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

      .avatar-uploader>>> .el-upload {
        border: 1px dashed #000;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader>>> .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 36px;
        color: #000;
        width: 107px;
        height: 107px;
        line-height: 107px;
        text-align: center;
      }
      .avatar {
        width: 107px;
        height: 107px;
        display: block;
      }

      .prof-upload-limit {
        height: 60px;
        line-height: 30px;
        font-size: 15px;
        color: #BBBBBB;
      }
    }
  }
}
</style>