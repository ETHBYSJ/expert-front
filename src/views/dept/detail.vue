<template>
  <div class="detail-container">
    <div class="detail-wapper adaptive-nav-width">
      <div class="deep-blue-title" style="line-height:80px">
        <span class="detail-index-text" style="cursor:pointer" @click="$router.push('/home')">首页</span>
        <span> —— 单位主页</span>
      </div>
      
      <div class="detail-title-wapper clearfix">
        <div class="detail-title right-content-title">我上报的推荐</div>
        <div class="next-button detail-add-rec" @click="createRec">新的推荐</div>
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
import { v4 as uuidv4 } from 'uuid'
import { reqGetRecList } from '@/api/request.js'
import { formatDate } from '@/utils/util.js'

export default {
  data() {
    return {
      recordList: [],
    }
  },

  activated() {
    reqGetRecList().then(response => {
      if (response.data.code === 10000) {
        // 有记录
        if (response.data.data.length > 0) {
          this.recordList = []
          // 处理
          for (var item of response.data.data) {
            var data = {}
            data.id = item.submitID
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
        } 
      } else {
        // 错误状态码
        window.location = "https://asc.shusim.com/edu/forum/"
      }
    }).catch(err => {
      window.location = "https://asc.shusim.com/edu/forum/"
    })
  },

  methods: {
    editEnroll(row) {
      this.$router.push({
        path: '/dept/recommend',
        query: {'id': row.id}
      })
    },

    // 添加新推荐
    createRec() {
      this.$router.push({
        path: '/dept/recommend',
        query: {'id': uuidv4()}
      })
    }
  }
}
</script>

<style lang="scss">
.detail-container {
  position: relative;

  .detail-wapper {
    margin: 0 auto;

    .detail-title-wapper {

      .detail-title {
        line-height:50px; 
        margin-bottom: 10px;
        float: left;
      }

      .detail-add-rec {
        float: right;
      }
    }

    .detail-content-wapper {
      height: 700px;
      padding: 0 24px;
      border: 2px solid #5cc0fe;
      background: white;

      .el-table {
        font-size: 17px;

        .table-row {
          height: 56px;
        }
      }
    }
  }
}



</style>