<template>
  <div class="opinion-container">
    <div class="opinion-wapper">
      <div class="opinion-content-wapper">
        <div class="row-flex-unit">
          <prof-textarea :inputObj="pageMsg.deptOpinion"></prof-textarea>
        </div>
        <div class="row-flex-unit">
          <prof-textarea :inputObj="pageMsg.authDeptOpinion"></prof-textarea>
        </div>
      </div>

      <div class="opinion-button-wapper">
        <div class="next-button" style="float:left;" @click="nextStep(-1)">上一步</div>
        <div class="next-button" style="float:right;" @click="nextStep(1)">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCommitProfOpinion, reqGetProfOpinion } from '@/api/request.js'
import ProfTextarea from '../components/ProfTextarea.vue'

export default {
  components: { ProfTextarea },
  
  data() {
    return {
      pageMsg: { 
        deptOpinion: {name: '单位推荐意见', content: '', alert: ''},
        authDeptOpinion: {name: '主管部门意见', content: '', alert: ''},
      }
    }
  },

  mounted() {
    reqGetProfOpinion().then(res => {
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
        reqCommitProfOpinion(data).then(res => {
          if (res.data.code === 10000) {
            this.$emit('jump', step)
          } else {
            this.$alert('意见评价提交失败', '提示', {
              confirmButtonText: '确定',
            });
          }
        }).catch(err => {
          this.$alert('意见评价提交失败', '提示', {
            confirmButtonText: '确定',
          });
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.opinion-container {
  position: relative;
  width: 100%;
  height: 100%;

  .opinion-wapper {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 800px;
    margin: 0 auto;
    
    .opinion-content-wapper {
      flex: 1;
      display: flex;
      flex-flow: column;  
    }

    .opinion-button-wapper {
      flex: 0 0 85px;
      padding: 0 200px;
    }
  }
}
</style>