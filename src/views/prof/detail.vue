<template>
  <div class="detail-container">
    <div class="detail-wapper adaptive-nav-width">
      <div class="deep-blue-title" style="line-height:80px">
        <span class="detail-index-text" style="cursor:pointer" @click="$router.push('/home')">首页</span>
        <span> —— 专家主页</span>
      </div>
      
      <div class="detail-title-wapper clearfix">
        <div class="detail-title right-content-title">我的申请</div>
      </div>

      <div class="detail-content-wapper">
        <el-table 
          :data="recordList" 
          header-row-class-name="table-row"
          row-class-name="table-row"
          @row-click="editEnroll">
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="time" label="提交时间"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetPorfRecords } from '@/api/request.js'
import { formatDate } from '@/utils/util.js'

export default {
  data() {
    return {
      recordList: [],
    }
  },

  activated() {
    reqGetPorfRecords().then(res => {
      if (res.data.code === 10000) {
        this.recordList = []
        // 有记录
        if (res.data.data.length > 0) {
          // 处理
          for (var item of res.data.data) {
            var data = {}
            data.title = item.title
            if (item.status === 'accepted') {
              data.status = '审核通过'
            } else if (item.status === 'declined') {
              data.status = '审核未通过'
            } else if (item.status === 'reviewing') {
              data.status = '审核中'
            } else {
              data.status = '未知错误'
            }
            data.time = formatDate(item.timestamp)
            this.recordList.push(data)
          }
        } else {
          // 无记录
          this.$router.push('/prof/apply')
        }
      } else {
        // 错误状态码
        this.$alert('获取申报信息失败，点击返回主页', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            window.location = "https://asc.shusim.com/edu/forum/"
          }
        });
      }
    }).catch(err => {
      console.log(err)
      // 错误状态码
      this.$alert('获取申报信息失败，点击返回主页', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          window.location = "https://asc.shusim.com/edu/forum/"
        }
      });
    })
  },

  methods: {
    editEnroll(row) {
      this.$router.push('/prof/apply')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  position: relative;

  .detail-wapper {
    margin: 0 auto;

    .detail-title-wapper {

      .detail-title {
        line-height: 50px; 
        margin-bottom: 10px;
        float: left;
      }
    }

    .detail-content-wapper {
      height: 600px;
      padding: 0 24px;
      border: 2px solid #5cc0fe;
      background: white;
    }
  }
}

.el-table>>> .table-row {
  font-size: 17px;
  height: 56px;
}

</style>