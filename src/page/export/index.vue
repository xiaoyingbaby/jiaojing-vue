<!-- 
    author:amin,
    desc:导出批复日志
 -->
<template>
    <div  v-loading="loading" element-loading-text="删除中">
        <div class="breadcrumb-wrapper header">
            <h3 class="title">导出批复日志</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>导出批复日志</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="export">
             <el-form :inline="true" :model="exportForm" class="demo-form-inline" empty-text="暂无数据" :rules='exportFormRule' ref='exportForm'>
                <el-form-item label="车牌号码：" prop='plateNumber'>
                    <el-input v-model="exportForm.plateNumber" placeholder="请输入" clearable></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button  class='el-button-reset' @click="onCancel">重置</el-button>
                    <!-- <el-button  class='el-button-reset' @click="onExport">导出</el-button> -->
                </el-form-item>
            </el-form>
        
            <div>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                >
                    <el-table-column
                        label="ID"
                        min-width="70"
                        >
                        <template slot-scope="scope">
                            <p  v-if='scope.row.id' >{{scope.row.id}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="通行证编号"
                        min-width="130">
                        <template slot-scope="scope">
                            <p v-if='scope.row.driving_license'>{{scope.row.driving_license}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        v-if="orgCodeShow"
                        label="出发地"
                        width="100">
                        <template slot-scope="scope">
                            <p v-if='scope.row.from' >{{scope.row.from}}</p>
                            <!-- <p v-if='scope.row.from' class="ellipsis" :title="scope.row.orgName">{{scope.row.orgName}}</p> -->
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="目的地"
                        min-width="100">
                        <template slot-scope="scope">
                            <p v-if='scope.row.arrivals'>{{scope.row.arrivals}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        label="途径路线"
                        min-width="140"
                    >
                        <template slot-scope="scope">
                            <p v-if='scope.row.route'>{{scope.row.route}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreateStr"
                        label="运输物品"
                        min-width="100">
                        <template slot-scope="scope">
                            <div>
                                <p v-if='scope.row.goods'>{{scope.row.goods}}</p>
                            <p v-else>--</p>
                            </div>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreateStr"
                        label="车牌号码"
                        min-width="100">
                        <template slot-scope="scope">
                            <div>
                                <p v-if='scope.row.plate_number'>{{scope.row.plate_number}}</p>
                                <p v-else>--</p>
                            </div>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreateStr"
                        label="审批意见"
                        min-width="90">
                        <template slot-scope="scope">
                            <div>
                                <p v-if='scope.row.approval_opinion'>{{scope.row.approval_opinion}}</p>
                                <p v-else>--</p>
                            </div>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreateStr"
                        label="途径时间起"
                        min-width="105">
                        <template slot-scope="scope">
                            <div>
                                <p v-if='scope.row.start_time'>{{scope.row.start_time | date-format}}</p>
                                <p v-else>--</p>
                            </div>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreateStr"
                        label="途径时间止"
                        min-width="105">
                        <template slot-scope="scope">
                            <div>
                                <p v-if='scope.row.end_time'>{{scope.row.end_time | date-format}}</p>
                                <p v-else>--</p>
                            </div>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreateStr"
                        label="批复时间"
                        min-width="105">
                        <template slot-scope="scope">
                            <div>
                                <p v-if='scope.row.approve_time'>{{scope.row.approve_time | date-format}}</p>
                                <p v-else>--</p>
                            </div>
                            
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="gmtCreateStr"
                        label="审批人"
                        min-width="105">
                        <template slot-scope="scope">
                            <div>
                                <p v-if='scope.row.approver'>{{scope.row.approver}}</p>
                                <p v-else>--</p>
                            </div>
                            
                        </template>
                    </el-table-column>
                    <el-table-column 
                        label="操作"
                        min-width='135'
                        fixed="right"
                    >
                        <template slot-scope="scope">
                            
                            <a href="javascript:;" 
                                size="small"
                                @click="handleEdit(scope.$index, scope.row)" v-if='scope.row.modifyButton' class="table-action">修订</a>
                            <router-link :to='{path:"/detail",query:{type:"totalLib",fileCode:scope.row.fileCode,fileType:scope.row.fileType}}'
                            class="table-action">查看</router-link>
                            <a href="javascript:;"
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)" v-if='scope.row.modifyButton' class="table-action">删除</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paging-wrapper" v-if='tableData.length!==0'>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageStart"
                :page-sizes="[10, 20, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
@theme-color:#409EFF;
.export{
    padding: 20px;
}
.btns-wrapper{
    padding-bottom: 15px;
}
.paging-wrapper{
    padding-top: 15px;
    text-align: right;
}
.table-action{
    word-break: keep-all
}
.w192{
    width: 192px;
}
.el-breadcrumb{
    float: right;
}
.header .title{
    float: left;
    font-size: 18px;
    font-weight: normal;
}
</style>

<script>
import Api  from '../../api/index.js';
export default {
    created : function(){
        let self = this;
        // 判断当前角色
        // ajax({
        //     url:'/user/getInitInfo',
        //     type:'post',
        //     data:{
        //     },
        //     success(res){
        //         if(res.success){
        //             // self.isProfessor = res.data.userVO.isProfessor;
        //             self.orgCodeShow = res.data.userVO.isProfessor;
        //             self.belongOrg = res.data.userVO.orgCode;
        //         }else{
        //             self.$message({
        //                 message: res.errorMsg,
        //                 type: 'warning'
        //             });
        //         };
        //     }
            
        // });
        // 获取机构列表
        // this.getOrg();
    },
    mounted : function(){
        this.getListData();
    },
    // beforeRouteLeave : function(to, from, next){
        
    // },
    data(){
        return ({
            loading : false,
            // 根据角色 判断是否显示 机构名称
            orgCodeShow : true,
            exportForm: {
                plateNumber: ''
            },
            pageStart:1,
            pageSize:10,
            totalNum:0,
            tableData: [],
            // 是否是教授
            isProfessor:false,
            // 所属机构
            belongOrg:'',
            multipleSelection:'',
            exportFormRule:{
                plateNumber: [
                    { required: false, message: '请输入车牌号码', trigger: 'blur' },
                ]
            },
            // 机构名称下拉数据
            orgData:[]

        })
    },
    methods : {
        getListData(){
            // 点击查询
            let self = this;
            // ajax({
            //     url:'/literature/getLiteraturePollListByCond',
            //     type:'post',
            //     data:{
            //         titleName:self.exportForm.titleName,
            //         orgCode:self.exportForm.orgCode,
            //         // keyWords:self.exportForm.keyWords,
            //         fileType:self.exportForm.fileType,
            //         pageStart:(self.pageStart-1)*self.pageSize,
            //         pageSize:self.pageSize 
            //     },
            //     success(res){
            //         if(res.success){
            //             self.tableData = res.rows;
            //             self.totalNum = res.results;
            //         }else{
            //             self.$message({
            //                 message: res.errorMsg,
            //                 type: 'warning'
            //             });
            //         };
            //     }
                
            // });
            Api.examList({
                page: this.pageStart,
                size: this.pageSize,
                state: 'FINISHED',
                plate_number: this.exportForm.plateNumber
            }).then((response) =>{
                    console.log(response)
                    
                    if(response && response.status === 200){
                        this.tableData = response.data.permits;
                        this.totalNum = response.data.total;
                    }
                })
                .catch(function (error) {
                    this.disabled = false;
                });
        },
        getOrg(){
            let self = this;
            // 获取组织机构下拉列表
            // ajax({
            //     url:'/org/getALLOrgList',
            //     type:'post',
            //     data:{
            //     },
            //     success(res){
            //         if(res.success){
            //             res.rows.forEach((val,ind,arr) => {
            //                 self.orgData.push({'title':val.orgName,'key':val.orgCode});
            //             });
                        
            //         }else{
            //             self.$message({
            //                 message: res.errorMsg,
            //                 type: 'warning'
            //             });
            //         };
            //     }
                
            // });
        },
        handleSizeChange(value){
            // pageSize变化
            this.pageSize = value;
            this.getListData();
        },
        handleCurrentChange(value){
            // pageStart变化
            this.pageStart = value;
            this.getListData();
        },
        handleDelete(index,row){
            let self = this;
            // 点击删除确定
            this.$confirm('是否删除该文献?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.loading = true;
                // ajax({
                //     url:'/literature/deleteLiterature',
                //     type:'post',
                //     data:{
                //         fileCode:row.fileCode
                //     },
                //     success(res){
                //         self.loading = false;
                //         if(res.success){
                //             self.getListData();
                //             self.$message({
                //                 message: "删除成功",
                //                 type: 'success'
                //             });
                //         }else{
                //             self.$message({
                //                 message: res.errorMsg,
                //                 type: 'warning'
                //             });
                //         };
                //     }
                    
                // });
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消删除'
                // });          
            });
        },
        onSubmit (){
            this.pageStart = 1;
            this.getListData();
        },
        onCancel(){
            // 重置：
            this.$refs['exportForm'].resetFields();

        },
        handleEdit(index,row){
            // 修订
        
            // 修改路径
            let url = '';
            if(row.fileType == 'ts'){//图书
                url = '/editBook';
            }else if(row.fileType == 'zb'){//档案
                url = '/editRecord';
            }else if(row.fileType == 'qk'){//期刊
                url = '/editPeriodical';
            }else if(row.fileType == 'bz'){//报纸
                url = '/editSpaper';
            }else if(row.fileType == 'kb'){//线装
                url = '/editAncient';
            }else if(row.fileType == 'sp'){//视频
                url = '/editVideo';
            }else if(row.fileType == 'yp'){//音频
                url = '/editAudio';
            }else if(row.fileType == 'tp'){//图片
                url = '/editImg';
            }else if(row.fileType == 'yt'){//舆图
                url = '/editYutu';
            }else{

            };
            let query = {
                fileType : row.fileType,
                fileCode : row.fileCode,
                type : 'totalLib'
            };
            this.$router.push({
                path : url,
                query : query
            });
        },
        onExport(){
            // 导出
            const self = this;

            if(!this.exportForm.orgCode && this.isProfessor){
                this.$message({
                    message: '请选择机构',
                    type: 'warning'
                });
            }else{
                let orgCode = '';
                // 所属机构处理
                if(this.isProfessor){
                    orgCode = this.exportForm.orgCode;
                }else{
                    orgCode = this.belongOrg;
                };
                window.open(`/literature/exportBookInfoByOrg?titleName=${self.exportForm.titleName}&orgCode=${orgCode}&fileType=${self.totalSearchForm.fileType}`);
            };
        }
    }
}
</script>
