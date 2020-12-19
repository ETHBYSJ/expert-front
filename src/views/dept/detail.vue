<template>
  <div class="detail-container">
    <div class="detail-wapper adaptive-nav-width">
      <div class="deep-blue-title" style="line-height:80px">
        <span class="detail-index-text" style="cursor:pointer" @click="$router.push('/home')">首页</span>
        <span> —— 单位主页</span>
      </div>
      
      <div class="detail-title-wapper clearfix">
        <div class="detail-title light-blue-title">我上报的推荐</div>
      </div>

      <div class="detail-content-wapper">
        <el-table 
          :data="recordList" 
          header-row-class-name="table-row"
          row-class-name="table-row"
          @row-click="editEnroll">
          <el-table-column
            prop="title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="time"
            label="提交时间">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/util.js'

export default {
  data() {
    return {
      recordList: [
        {
          title: '测试',
          status: '审核中',
          time: '12月20日 13:14',
        }
      ],
    }
  },

  methods: {
    editEnroll(row) {
      
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
        line-height:50px; 
        margin-bottom: 20px;
        float: left;
      }
    }

    .detail-content-wapper {
      height: 700px;
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