<template>
    <div class='mianbao'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for='(item,index) in info' :key='index'>
                {{item}}
            </el-breadcrumb-item>
          
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            info:[],
        }
    },


    //获取路由的变化
    watch:{
        $route(){
            //获取到meta的值
            const arr=this.$route.matched
            let info=[];
            arr.forEach(v=>{
                info.push(v.meta)
            })
            this.info=info
        //    console.log(this.info);
        }
    }
}
</script>

<style>
    .mianbao{
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
         margin-bottom: 20px;
    }

</style>
