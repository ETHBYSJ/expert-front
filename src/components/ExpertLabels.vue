<template>
  <div class="expert-labels-container">
    <el-tag
      v-for="tag in tagsList"
      :key="tag"
      closable
      :disable-transitions="true"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>

    <el-input
      class="prof-input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm">
    </el-input>
    <i class="el-icon-circle-plus prof-button-new-tag" @click="showInput"></i>
  </div>
</template>

<script>
export default {
  props: {
    tagsList: Array,
  },

  data() {
    return {
      inputVisible: false,
      inputValue: '',
    }
  },

  methods: {
    handleClose(tag) {
      this.$confirm(`确认删除标签:${tag}?`, '提示').then(() => {
        this.tagsList.splice(this.tagsList.indexOf(tag), 1)
      }).catch(() => {})
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue && !this.tagsList.includes(inputValue)) {
        this.tagsList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss">
.expert-labels-container {
  position: relative;
  width: 100%;

  .prof-button-new-tag {
    font-size: 40px;
    color: #5cc0fe;
    cursor: pointer;
    position: relative;
    top: 5px;

    &:hover {
      color: #68D995
    }
  }

  .prof-input-new-tag {
    width: 120px;
    height: 50px;
    position: relative;
    top: -5px;
  }

  .el-input>>> input {
    height: 46px;
  }

  .el-tag + .el-tag {
    margin-left: 25px;
  }

  .el-tag + .el-input {
    margin-left: 20px;
  }

  .el-tag + .prof-button-new-tag {
    margin-left: 20px;
  }

  .el-input + .prof-button-new-tag {
    margin-left: 20px;
  }

  .el-tag {
    display: inline-block;
    font-size: 26px;
    font-weight: bold;
    background: white;
    border: 2px solid #5cc0fe;
    color: #5cc0fe;
    border-radius: 10px;
    height: 50px;
    line-height: 46px;
    padding-left: 20px;
  }

  .el-tag>>> .el-icon-close {
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 20px;
    color: #5cc0fe;

    &:hover {
      color: white;
    }
  }
}
</style>