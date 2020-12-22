<template>
  <div class="find-container adaptive-find-width">
    <page-title></page-title>

    <div class="find-wapper adaptive-height">
      <div class="find-result-wapper" v-show="doFind">
        <div class="right-content-title">专家搜索</div>

        <div v-loading="finding">
          <div class="find-has-result" v-if="result.length>0">
            <div class="find-result-content clearfix">
              <result-box 
                v-for="(item, index) in result.slice(currPage*pageSize, currPage*pageSize+6)" 
                style="margin-bottom:30px;float:left;"
                :class="[{hasleft: index%2==1}]"
                :key="item.photo"
                :name="item.name"
                :photo="item.photo"
                :intro="item.intro"
                :labels="item.labels">
              </result-box>
            </div>

            <div class="find-pagenum-wapper">
              <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="result.length"
                :page-size="pageSize">
              </el-pagination>
            </div>
          </div>

          <div class="find-no-result" v-else>无结果</div>
        </div>
      </div>

      <div class="find-condition-wapper" :class="{'do-find': doFind}">
        <div class="right-content-title" v-show="!doFind">专家搜索</div>

        <div class="find-box-wapper" :class="{'do-find': doFind}">
          <input class="find-input" v-model="keyword">
          <div class="find-icon-wapper" @click="doSearch">
            <img src="@/assets/find.png">
          </div>
        </div>

        <div class="find-labels-wapper" :class="{'do-find': doFind}">
          <div class="find-labels-title">搜索标签</div>
          <expert-labels :tagsList="labels"></expert-labels>
        </div>

        <div class="find-button-wapper">
          <div class="next-button" v-show="doFind" @click="resetFind">重置</div>
          <div class="next-button" @click="doSearch">搜索</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetFindResult } from '@/api/request.js'
import PageTitle from '@/components/PageTitle.vue'
import ExpertLabels from '@/components/ExpertLabels.vue'
import ResultBox from './components/ResultBox.vue'

export default {
  components: {
    PageTitle, 
    ExpertLabels,
    ResultBox,
  },

  data() {
    return {
      finding: false,
      keyword: '',
      labels: [],
      doFind: false,
      // 查询结果
      result: [],
      pageSize: 6,
      currPage: 0,
    }
  },

  activated() {
    this.resetFind()
    this.loadResult([])
    this.doFind = false
  },

  methods: {
    handleCurrentChange(currentPage) {
      this.currPage = currentPage-1;
      console.log(currentPage)
    },

    loadResult(data) {
      this.result = data
      // 修改url，加上前缀
      for (let p of this.result) {
        if (p.photo && p.photo.length>0) {
          p.photo = 'http://localhost:1125' + p.photo
        }
      }
      this.currPage = 0
      this.doFind = true
    },

    resetFind() {
      this.keyword = ''
      this.labels = []
    },

    doSearch() {
      this.finding = true;
      let data = {
        keyword: this.keyword,
        labels: this.labels,
      }
      reqGetFindResult(data).then(res => {
        if (res.data.code === 10000) {
          console.log(res.data.data)
          this.loadResult(res.data.data)
        } else {
          this.$alert('查询失败，请检查网络或账户状态', '提示', {
            confirmButtonText: '确定',
          });
        }
        this.finding = false
      }).catch(err => {
        console.log(err)
        this.finding = false
        this.$alert('查询失败，请检查网络或账户状态', '提示', {
          confirmButtonText: '确定',
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.find-container {
  position: relative;
  margin: 0 auto;
  padding: 0 24px;

  .find-wapper {
    display: flex;

    .find-result-wapper {
      flex: 1;
      border: 2px solid #5CC0FE;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-flow: column;

      .find-no-result {
        flex: 1;
        font-size: 26px;
        text-align: center;
        padding: 200px 0;
      }

      .find-has-result {
        flex: 1;

        .find-result-content {
          width: 800px;
          height: 520px;
          margin: 0 auto;

          .hasleft {
            margin-left: 40px;
          }
        }

        .find-pagenum-wapper {
          margin-top: 10px;

          .el-pagination {
            text-align: center;
          }
        }
      }
      
    }

    .find-condition-wapper {
      flex: 0 0 100%;
      border: 2px solid #5CC0FE;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-flow: column;

      &.do-find {
        flex: 0 0 400px;
        margin-left: 30px;
        border-top: 4px solid #5CC0FE;
        background: rgba(252, 252, 252, 0.8);

        @media screen and (max-width: 1499px) {
          flex: 0 0 350px;
          margin-left: 20px;
        }
      }

      .find-box-wapper {
        width: 750px;
        margin: 0 auto;
        display: flex;

        &.do-find {
          width: 350px;
          margin-top: 30px;

          @media screen and (max-width: 1499px) {
            width: 300px;
          }
        } 

        .find-input {
          flex: 1;
          background: white;
          border: 2px solid #5CC0FE;
          padding: 0 8px;
          font-size: 17px;
        }

        .find-icon-wapper {
          border-radius: 5px;
          margin-left: 10px;
          height: 55px;
          flex: 0 0 65px;
          background: #5CC0FE;
          cursor: pointer;

          &:hover {
            background: #68D995;
          }

          img {
            height: 35px;
            width: 35px;
            position: relative;
            top: 10px;
            left: 15px;
          }
        }
      }

      .find-labels-wapper {
        margin: 0 auto;
        flex: 1;
        width: 750px;

        &.do-find {
          width: 350px;

          @media screen and (max-width: 1499px) {
            width: 300px;
          }
        } 

        .find-labels-title {
          font-size: 18px;
          font-weight: bold;
          line-height: 70px;
        }
      }

      .find-button-wapper {
        display: inline-block;
        margin: 0 auto;
        flex: 0 0 85px;
      }

      .next-button {
        float: left;
      }

      .next-button + .next-button{
        margin-left: 50px !important;
      }
    }
  }
}
</style>