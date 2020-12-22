<template>
  <div class="history-container">
    <div class="history-wapper">
      <div class="history-content-wapper animate__animated animate__fadeIn">
        <div class="row-flex-unit">
          <prof-textarea :inputObj="pageMsg.workExperience"></prof-textarea>
        </div>
        <div class="row-flex-unit">
          <prof-textarea :inputObj="pageMsg.achievements"></prof-textarea>
        </div>
      </div>

      <div class="history-button-wapper">
        <div class="next-button" style="float:left;" @click="nextStep(-1)">上一步</div>
        <div class="next-button" style="float:right;" @click="nextStep(1)">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCommitProfResume, reqGetProfResume } from '@/api/request.js'
import ProfTextarea from '../components/ProfTextarea.vue'

export default {
  components: { ProfTextarea },
  
  data() {
    return {
      pageMsg: {
        workExperience: {
          name: '工作经历（请注明参与评估活动及指标研发情况）', 
          content: '', 
          alert: ''
        },
	      achievements: {
          name: '工作成绩（请注明近5年获奖、教科研情况等）', 
          content: '', 
          alert: ''
        },
      }
     }
  },

  mounted() {
    reqGetProfResume().then(res => {
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
        reqCommitProfResume(data).then(res => {
          if (res.data.code === 10000) {
            this.$emit('jump', step)
          } else {
            this.$alert('个人履历提交失败', '提示', {
              confirmButtonText: '确定',
            });
          }
        }).catch(err => {
          this.$alert('个人履历提交失败', '提示', {
            confirmButtonText: '确定',
          });
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  position: relative;
  width: 100%;
  height: 100%;

  .history-wapper {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 800px;
    margin: 0 auto;
    
    .history-content-wapper {
      flex: 1;
      display: flex;
      flex-flow: column;  
    }

    .history-button-wapper {
      flex: 0 0 85px;
      padding: 0 200px;
    }
  }
}
</style>