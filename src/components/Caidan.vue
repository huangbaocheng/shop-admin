<template>
  <!-- 菜单栏组件 -->
  <!-- default-active: 默认选中选项 -->
  <!-- active-text-color：高亮时候的颜色 -->
  <!-- collapse 默认是false展开菜单，true收起菜单 -->
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#001529"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isShow"
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>购物商城</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">
          <template slot="title">商品管理</template>
        </el-menu-item>
        <el-menu-item index="1-2">
          <template slot="title">栏目管理</template>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //声明可以接收的值
  props: ["isShow"]
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
