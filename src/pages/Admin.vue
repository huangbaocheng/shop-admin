<template>
  
    <el-container>
      <el-aside width="auto">
        <Caidan :isShow='isShow' />
      </el-aside>
      <el-container>
        <el-header>
          <!-- 渲染头部  -->
          <Header @click="handleChangeShow"></Header>
        </el-header>
        <el-main>
          <Mianbao></Mianbao>Main
        </el-main>
      </el-container>
    </el-container>

</template>

<script>
//导入头部组件
import Header from "../components/Header.vue";
import Mianbao from "../components/Mianbao.vue";
import Caidan from "../components/Caidan.vue";
export default {

  data(){
    return {
      //控制菜单展开的收起的状态
      isShow:false,
    }
  },
  //注册组件
  components: {
    Header,
    Mianbao,
    Caidan
  },
  //页面事件
  methods:{
    // 修改isShow的事件
    handleChangeShow(){
      this.isShow=!this.isShow;
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > div > .el-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
