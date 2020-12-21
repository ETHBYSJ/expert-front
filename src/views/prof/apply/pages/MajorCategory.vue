<template>
  <div class="cate-container">
    <div class="cate-wapper">
      <div class="cate-input-wapper">
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.edu"></prof-input>
          </div>
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.degree"></prof-input>
          </div>
        </div>
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.major"></prof-input>
          </div>
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.category"></prof-input>
          </div>
        </div>
        <div class="row-flex-unit" style="margin-left:40px">
          <prof-input size="140px" :inputObj="pageMsg.dept"></prof-input>
        </div>
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-right:40px">
            <prof-input size="180px" :inputObj="pageMsg.techPost"></prof-input>
          </div>
          <div class="row-flex-unit">
            <prof-input size="180px" :inputObj="pageMsg.adminPost"></prof-input>
          </div>
        </div>
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-right:40px">
            <prof-input size="180px" :inputObj="pageMsg.authDept"></prof-input>
          </div>
          <div class="row-flex-unit">
            <prof-input size="180px" :inputObj="pageMsg.workTime"></prof-input>
          </div>
        </div>
      </div>
      <div class="cate-button-wapper">
        <div class="next-button" style="float:left;" @click="nextStep(-1)">上一步</div>
        <div class="next-button" style="float:right;" @click="nextStep(1)">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCommitProfCate, reqGetProfCate } from '@/api/request.js'
import { ProfInput } from '../components'

export default {
  components: {
    ProfInput,
  },

  data() {
    return {
      pageMsg: {
        edu: {name:'学历程度', content:'', alert:false},
        degree: {name:'最高学位', content:'', alert:false},
        major: {name:'所学专业', content:'', alert:false},
        category: {name:'专业类别', content:'', alert:false},
        dept: {name:'工作单位', content:'', alert:false},
        techPost: {name:'专业技术职务', content:'', alert:false},
        adminPost: {name:'现行行政职务', content:'', alert:false},
        authDept: {name:'单位主管部门', content:'', alert:false},
        workTime: {name:'工作时间', content:'', alert:false},
      }
    }
  },

  mounted() {
    reqGetProfCate().then(res => {
      if (res.data.code === 10000) {
        this.loadMajorCate(res.data.data)
      } else {
        this.$alert('加载数据失败，请刷新后重试', '提示', {
          confirmButtonText: '确定',
        });
      }
    }).catch(err => {
      this.$alert('加载数据失败，请刷新后重试', '提示', {
        confirmButtonText: '确定',
      });
    })
  },

  methods: {
    checkPage() {
      let flag = true
      for (let key in this.pageMsg) {
        if (!this.pageMsg[key].content || this.pageMsg[key].content.length<=0) {
          flag = false
          this.pageMsg[key].alert = true
        }
      }
      return flag
    },

    loadMajorCate(data) {
      for(let key in this.pageMsg) {
        this.pageMsg[key].content = data[key]
      }
    },

    packBaseMessage() {
      let data = {}
      for(let key in this.pageMsg) {
        data[key] = this.pageMsg[key].content
      }
      return data
    },

    nextStep(step) {
      if (this.checkPage()) {
        // 请求
        const data = this.packBaseMessage()
        reqCommitProfCate(data).then(res => {
          if (res.data.code === 10000) {
            this.$emit('jump', step)
          } else {
            this.$alert('专业类别提交失败', '提示', {
              confirmButtonText: '确定',
            });
          }
        }).catch(err => {
          this.$alert('专业类别提交失败', '提示', {
            confirmButtonText: '确定',
          });
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cate-container {
  position: relative;
  height: 100%;

  .cate-wapper {
    display: flex;
    flex-flow: column;
    width: 800px;
    height: 100%;
    margin: 0 auto;

    .cate-input-wapper {
      flex: 1;
      display: flex;
      flex-flow: column;
      margin: 24px 0;
    }

    .cate-button-wapper {
      flex: 0 0 85px;
      padding: 0 200px;
    }
  }
}
</style>