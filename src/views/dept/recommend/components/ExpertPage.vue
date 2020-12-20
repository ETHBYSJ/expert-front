<template>
  <div class="expert-page-container">
    <div class="expert-page-wapper">
      <div class="expert-page-lr">
        <img style="cursor:pointer" v-show="currPage!=0" src="@/assets/left-arrow-blue.png" @click="goPage(currPage-1)">
        <img style="cursor:not-allowed" v-show="currPage==0" src="@/assets/left-arrow-gray.png">
      </div>

      <div class="expert-page-mid">
        <div class="expert-page-inputs" 
          v-for="(expertMsg, index) in expertList" 
          :key="expertMsg.id"
          v-show="currPage==index">
          <div class="expert-page-unit">
            <dept-input size="small" :inputObj="expertMsg.name"></dept-input>
            <dept-input size="small" :inputObj="expertMsg.age" style="margin:0 20px"></dept-input>
            <dept-input size="small" :inputObj="expertMsg.sex"></dept-input>
          </div>

          <div class="expert-page-unit">
            <dept-input size="small" :inputObj="expertMsg.edu"></dept-input>
            <dept-input size="small" :inputObj="expertMsg.title" style="margin-left:50px;"></dept-input>
          </div>

          <div class="expert-page-unit">
            <dept-input size="medium" :inputObj="expertMsg.major"></dept-input>
          </div>

          <div class="expert-page-unit">
            <dept-input size="medium" :inputObj="expertMsg.dept"></dept-input>
          </div>

          <div class="expert-page-unit">
            <dept-input size="medium" :inputObj="expertMsg.post"></dept-input>
          </div>

          <div class="expert-page-unit">
            <dept-input size="medium" :inputObj="expertMsg.phone"></dept-input>
            <dept-input size="small" :inputObj="expertMsg.mobile" style="margin-left:50px"></dept-input>
          </div>

          <div class="expert-page-unit">
            <dept-input size="medium" :inputObj="expertMsg.email"></dept-input>
          </div>
        </div>

        <div class="expert-page-mid-bot clearfix">
          <span class="expert-page-bot-button active" style="float:left" @click="addExpert">添加新推荐人</span>
          <span class="expert-page-number">第{{currPage+1}}/{{expertList.length}}页</span>
          <span class="expert-page-bot-button" :class="{active: currPage!=0}" style="float:right" @click="deleteCurrExpert">删除该推荐人</span>
        </div>
      </div>

      <div class="expert-page-lr">
        <img style="cursor:pointer" v-show="currPage<expertList.length-1" src="@/assets/right-arrow-blue.png" @click="goPage(currPage+1)">
        <img style="cursor:not-allowed" v-show="currPage===expertList.length-1" src="@/assets/right-arrow-gray.png">
      </div>
    </div>
  </div>
</template>

<script>
import { Expert } from '../model.js'
import DeptInput from './DeptInput.vue'

export default {
  components: {
    DeptInput,
  },

  props: {
    expertList: Array,
  },

  data() {
    return {
      currPage: 0,
    }
  },

  methods: {
    // 检查该页信息是否全
    checkCurrPage() {
      let flag = true

      // 当前页循环检查每一项
      const currExpert = this.expertList[this.currPage]
      for(let key in currExpert) {
        if (key !== 'id') {
          if (!currExpert[key].content || currExpert[key].content.length<=0) {
            flag = false
            currExpert[key].alert = true
          }
        }
      }

      return flag
    },

    // 去第num页
    goPage(num) {
      if (num >= 0 && num < this.expertList.length && this.checkCurrPage()) {
        this.currPage = num
      }
    },

    // 添加专家
    addExpert() {
      if (this.expertList.length < 10 && this.checkCurrPage()) {
        this.expertList.push(new Expert())
        this.currPage = this.expertList.length-1
      }
    },

    deleteCurrExpert() {
      // 第一页不能删除
      if (this.currPage != 0) {
        this.$confirm('确认删除?').then(_ => {
          this.expertList.splice(this.currPage, 1)
          this.currPage -= 1
        }).catch(_ => {})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-page-container {
  position: relative;

  .expert-page-wapper {
    display: flex;
    align-items: center;   // 垂直居中，针对的是mycontainer类下面的子元素，不包含“孙子”元素
    justify-content: center; // 水平居中，针对的是mycontainer类下面的子元素，不包含“孙子”元素

    .expert-page-lr {
      width: 40px;

      img {
        height: 40px;
        width: 40px;  
      }
    }

    .expert-page-mid {
      margin: 0 20px;
      height: 100%;
      display: flex;
      flex-flow: column;

      .expert-page-inputs {
        flex: 1;
        height: 100%;
        display: flex;
        flex-flow: column;
        
        .expert-page-unit {
          flex: 1;
          display: flex;
        }
      }
      
      .expert-page-mid-bot {
        line-height: 30px;
        padding: 0 50px;
        display: flex;

        .expert-page-bot-button {
          font-size: 16px;
          font-weight: bold;
          color: #c1c1c1;
          cursor: not-allowed;

          &.active {
            cursor: pointer;
            color: #000;

            &:hover {
              color: #5cc0fe;
            }
          }
        }

        .expert-page-number {
          flex: 1;
          text-align: center;
        }
      }
    }
  }
}
</style>