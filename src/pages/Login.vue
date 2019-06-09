<template>
  <div class="users">
    <!-- el-form是表单组件 
            ref 可以操作dom
            model 当前表单数据
            rules 表单的校检规则
            
    -->
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        //表单的数据
        username: "",
        password: ""
      },
      //表单规则
      rules: {
        username: [
          //required 必须要输入 message 提示信息  blur表示失去焦点时候
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //登陆事件，提交账号密码
    onSubmit() {
      //提交到后台的数据
      const data = {
        uname: this.form.username,
        upwd: this.form.password
      };

      // 如果表单的验证不通过，不提交表单
      this.$refs.form.validate(valid => {
        // 验证通过
        if (valid) {
          // 调用axios
          this.$axios({
            //请求的地址
            url: "http://localhost:8899/admin/account/login",
            //请求方式
            method: "POST",
            //数据
            data,
            //处理session的跨域
             withCredentials: true,
          }).then(res => {
            const { message, status } = res.data;
            //登陆成功
            if (status == 0) {
              this.$router.push("/");
            }
            //登陆失败
            if (status === 1) {
              //插件  消息提示
              this.$message.error(message);
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.users {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  /* background: #f00; */
}
.form {
  width: 500px;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -93px;
}
</style>
