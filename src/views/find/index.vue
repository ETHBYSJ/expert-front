<template>
  <div class="find-container adaptive-find-width">
    <page-title></page-title>

    <div class="find-wapper adaptive-height">
      <div class="find-result-wapper" v-show="doFind">

      </div>

      <div class="find-condition-wapper" :class="{'do-find': doFind}">
        <div class="right-content-title">专家搜索</div>

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

export default {
  components: { PageTitle, ExpertLabels },

  data() {
    return {
      keyword: '',
      labels: [],
      doFind: false,
    }
  },

  methods: {
    resetFind() {
      this.keyword = ''
      this.labels = []
      this.doFind = false
    },

    doSearch() {
      let data = {
        keyword: this.keyword,
        labels: this.labels,
      }
      reqGetFindResult(data).then(res => {
        console.log(res)
        this.doFind = true
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.find-container {
  position: relative;
  margin: 0 auto;

  .find-wapper {
    display: flex;

    .find-result-wapper {
      flex: 1;
      border: 2px solid #5CC0FE;
    }

    .find-condition-wapper {
      flex: 0 0 100%;
      border: 2px solid #5CC0FE;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-flow: column;

      &.do-find {
        flex: 0 0 450px;
        margin-left: 30px;
        border-top: 4px solid #5CC0FE;
      }

      .find-box-wapper {
        width: 750px;
        margin: 0 auto;
        display: flex;

        &.do-find {
          width: 350px;
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