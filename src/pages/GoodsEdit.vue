<template>

<el-form ref="form" :model="form" label-width="80px">

    
    <el-form-item label="所属类别">
        <el-select v-model="form.category_id" placeholder="请选择">
            <el-option 
                :label="item.title"
                v-for='(item,index) in categorys'
                :key='index'
                :value="item.category_id" >
            </el-option>
           
        </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
        <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="文章标题">
        <el-input v-model="form.title" ></el-input>
    </el-form-item>

    <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
    </el-form-item>


    <el-form-item label="封面图片" >
        <!-- show-file-list 是否支持多选 
            on-success 成功之后的回调
            before-upload 上传之前执行的函数
            action 上传的地址
            style='object-fit:cover' 图片不变形
            -->
        <el-upload
            class="avatar-uploader"
           
            action="http://localhost:8899/admin/article/uploadimg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
           
            <img v-if="imageUrl" :src="imageUrl" class="avatar"  style='object-fit:cover'>
           
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
    </el-form-item>
    <!-- 上传多张图片 -->
    <el-form-item label="图片相册">
        <!-- list-type: 声明当前图片相册的方式显示 -->
        <!-- on-preview：预览的事件处理函数 -->
        <!-- on-remove：删除图片时候触发的事件 -->
        <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :on-success="handleCartSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :file-list="form.fileList">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-form-item>

    <el-form-item label="文章摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>
    <!-- 富文本框 -->
    <el-form-item label="内容描述" class='editor'>
        <quillEditor v-model="form.content" ></quillEditor>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
    </el-form-item>
</el-form>
</template>
<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        form: {
            category_id:'',
            status:false,
            is_top:false,
            is_hot:false,
            title:'',
            sub_title:'',
            imgList:[],//封面
            goods_no:'',
            stock_quantity:'',
            market_price:'',
            sell_price:'',
            is_slide:false,//不属于商品添加的
            zhaiyao:'',
            content:'',//富文本框
            fileList:[],//多选图片
            },
        categorys:[],
        imageUrl:'',//预览图片的路劲
         dialogImageUrl: '',//多张图片的预览地址
        dialogVisible: false//弹窗是否显示
      }
    },
    mounted(){
       this.$axios({
           url:'http://localhost:8899/admin/category/getlist/goods',
           method:'GET',
           //处理session的跨域
        //    withCredentials: true,
       }).then(res =>{
        //    console.log(res.data);
        const {message, status }=res.data;
        //所有的类别数据保存到categorys
        this.categorys=message;
        
       });
    //    获取商品的数据
        const {id}=this.$route.params;
        this.$axios({
            url:'http://localhost:8899/admin/goods/getgoodsmodel/'+id,
            method:'GET',
        }).then(res=>{
            const {message , status}=res.data;
            // console.log(res.data);
            //对象合并
            this.form = {
                ...message,
                //将category_id转换为数字
                category_id:+message.category_id,
                 //修改图片的预览地址url
                fileList: message.fileList.map( v=>{
                    return {
                        ...v,
                        url:`http://localhost:8899${v.shorturl}`
                    }
                })
            }
            //封面图片预览 imageUrl
            this.imageUrl=message.imgList[0].url;
        });
    },
    // 富文本框
    components: {
        quillEditor
    },
    methods: {
        onSubmit() {
            //提交到添加商品的接口
            //提交数据的时候必须要先登录
            //  加上跨域声明withCredentials:true
            this.$axios({
                url:'http://localhost:8899/admin/goods/add/goods',
                method:'POST',
                data:this.form,
                //处理session的跨域 
                withCredentials: true,
            }).then(res =>{
                const {message , status} =res.data;
                if(status === 0){
                    //成功的提示
                    this.$message.success(message);
                    //返回上一页
                    // this.$router.push('/admin/goods-list')
                    this.$router.back();
                }else{
                    //跳转到登录 页
                    this.$router.push('/login')
                }
            })
          
        },
            //上传单张图片
        //上传成功之后的回调    
        handleAvatarSuccess(res, file) {
            //设置图片路径
            this.imageUrl = URL.createObjectURL(file.raw);
            //上传成功后赋值给
            this.form.imgList=[res];
        },
        //上传之前的执行的函数
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            //如果返回false b不会上传
            return  isLt2M;
        },
        //上传多张图片
        // 删除后的事件处理函数
        handleRemove(file, fileList) {
            // console.log(file, fileList);
            const files=fileList.map(v=>{
                return v.response;
            });
            this.form.fileList=files;
        },
         // 图片的预览
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
           // 上传多张图片的成功的回调
        handleCartSuccess(res, file, fileList){
            // console.log(fileList)
            //把fileList的数组中的每一项response属提取出来
            const files=fileList.map(v=>{
                return v.response;
            });
            this.form.fileList=files;
        },
    }
  }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    
    .avatar-uploader .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .editor .ql-toolbar{
      line-height: 1;
    }
</style>
