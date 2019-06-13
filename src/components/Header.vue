<template>
    <div>
        <!-- el-row 是布局组件
        type=flex声明是flex布局，并且带有降级方案 （如果浏览器不支持flex,会自动
        调用其他布局方式
         -->
      <el-row type='flex' justify="space-between">
          <!-- 箭头 -->
          <div class='arrow' @click="handleClick">
              <i class="el-icon-back"></i>
          </div>
          <div>
            <!-- 读取数据 -->
            {{user.uname}}
            {{user.realname}} 
            <span @click='handleLogout' class='logout'>退出</span> 
          </div>
      </el-row> 
    </div>  
</template>

<script>
export default {
    data(){
        return {
            user:{}
        }
    },
    methods:{
        handleClick:function(){
            this.$emit('click')
        },
        handleLogout:function(){
           this.$axios({
               url:'http://localhost:8899/admin/account/logout',
               method:'GET',
               // 处理session跨域
                withCredentials: true
           }).then(res =>{
               const {message, status} = res.data;
              if(status===0){
                  this.$message.success(message);
                  //跳转到登录页
                  this.$router.push('/login');
                  //清除本地数据
                  localStorage.removeItem('user');
              }
           })
        },
        
    },
    mounted(){
        //读取vuex的store数据
      
        this.user=this.$store.state.user;
        
    }
}
</script>

<style scoped>
.arrow,
.logout{
    /* 鼠标变小手 */
    cursor:pointer;
}

</style>
