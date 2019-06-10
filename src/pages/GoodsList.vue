<template>
    <div >
        <!-- 商品顶部列表 -->
        <el-row type='flex' justify="space-between">
            <div> 
                <el-button >新增</el-button>
                <el-button type="danger" @click='handleDeleteMore'>删除</el-button>
            </div>
            <!-- 搜索输入框 -->
            <div class='input-search'>
                <el-input 
                    placeholder="请输入内容"
                    class="input-with-select"
                    v-model="searchValue">
                    <el-button 
                    slot="append" 
                    icon="el-icon-search"
                    @click='handleSearch'>
                    </el-button>
                </el-input>
            </div>
        </el-row>




            <!-- 表格布局 -->

            <!-- 商品列表 -->
            <!-- data表格的数据 -->
             <!-- tooltip-effect：工具栏的效果 -->
             <!-- selection-change：选择表格每一项时候就触发的事件 -->
            <div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%; margin-top:20px"
                      @selection-change="handleSelectionChange"
                    >
                   

                    <!-- type="selection"表格可以选择方块 -->
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <!-- label每一列的标题文字 -->
                    <el-table-column
                        label="标题"
                         width="300">
                         <!-- 自定义模板 -->
                     <!-- template的slot-scoped的值模板的变量名scope -->
                         <!-- scope.row 可以拿到 每一项数据对象 -->
                        <template slot-scope="scope">
                            <!-- align 表示水平方向居中对齐 -->
                            <el-row type="flex" align="middle">
                                <img :src="scope.row.imgurl" class="goods-img"/>
                                <div>
                                    {{scope.row.title}}
                                </div>
                            </el-row>
                        </template>
                    </el-table-column>

                     <!-- 显示数据的简写方式,
                    指定prop属性自动读取每一项数据的prop值的属性 -->
                    <!-- 类型 -->
                    <el-table-column
                        prop="categoryname"
                        label="类型"
                         width="120">
                    </el-table-column>
                    <!-- 价格 -->
                    <el-table-column
                        prop='sell_price'
                        label="价格"
                         width="120">
                    </el-table-column>
                    <!-- 操作栏 -->
                     <el-table-column label="操作">
                         <!-- 自定义模块 -->
                                <template slot-scope="scope">
                                    <!-- 编辑事件 -->
                                <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row)">编辑
                                </el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">删除
                                </el-button>
                                </template>
                            </el-table-column>
                </el-table>


                <!-- 分页 -->
                    <!-- size-change: 显示条数切换 -->
                    <!-- current-change：页数切换 -->
                    <!-- current-page: 当前的页面 -->
                    <!-- page-sizes：条数的选项 -->
                    <!-- page-size:当前的条数 -->
                    <!-- layout:默认布局 -->
                    <!-- total: 数据全部条数 -->
                <div class="block">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page=" pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="5"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>

     

      
    </div>
</template>

<script>
export default {

    
    data() {
      return {
        // 模拟数据，会被接口替换
        tableData: [
      
        ],
        // pageIndex 页码 pageSize 每页显示的条数
        pageIndex: 1,//默认的页面 随着页面的切换而变化  
        pageSize:5,//页面显示条数
        total:0,//总条数
        searchValue:'',//搜索框的内容
        selectGoods:[],//选中的商品
      }
    },
    mounted(){
      this.getList();
    },
       
   
    methods:{
        //封装了一个函数
         getList(){
              // pageIndex: 当前的页面，会变化
            // pageSize：数据条数，会变化
            // searchValue：搜索关键字
            this.$axios({
            url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
            method:"GET",
        }).then(res =>{
            // console.log(res);
            const data=res.data;
            //商品列表数据
            this.tableData = data.message;
             // 总条数
            this.total = data.totalcount;   
        })
       },
       //封装了删除单个和多个
       deleteList(id){
            this.$axios({
                url:`http://localhost:8899/admin/goods/del/${id}`,
                method:"GET"
            }).then(res=>{
                //解构赋值
                const {message,status} =res.data;
                if(status===0){
                      this.$message.success(message);
                        // 请求商品列表数据
                    this.getList();
                }else{
                     this.$message.error(message);
                }
            })
       },

         //选择每一项时就触发
         handleSelectionChange(val) {
            //保存到选中的商品
            this.selectGoods=val;
        },
            //编辑
        handleEdit(index, row) {
            console.log(index, row);
        },
            //删除单个
        handleDelete(goods) {
            // 获取到id
            const id = goods.id;
            //调用删除商品的接口
           this.deleteList(id);
        },
          //删除多个
        handleDeleteMore(){
            // 获取到id;
            const arr =this.selectGoods.map(v=>{
                return v.id;
            });
            const id=arr.join(',');
            //调用删除商品的接口
           this.deleteList(id);
        },
          //搜索框事件
        handleSearch(){
            // 发起请求 ，赋值searchValue
            this.getList();
        },
        //显示条数
        handleSizeChange(val){
            this.pageSize=val;
            this.getList();
        },
        //页数切换
        handleCurrentChange(val){
            // 保存当前的页面
            this.pageIndex=val;
            //重新发起请求
            this.getList();
        },
      

      
       
        
    }, 
}
</script>

<style scoped>
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .input-search{
        width:200px;
    }
  
   .goods-img{
        width:60px;
        height:60px;
        /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
        flex-shrink: 0;
        margin-right:5px;
    }
</style>
