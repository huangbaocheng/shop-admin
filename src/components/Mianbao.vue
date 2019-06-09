<template>
    <div class='mianbao'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .mianbao{
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }

</style>
