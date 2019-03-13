<template>
  <div class="unexam">
        <div class="header breadcrumb-wrapper">
            <h3 class="title">通行证审批</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>通行证审批</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main">
            <div class="conditions">
                <el-form :inline="true" :model="exportForm" class="demo-form-inline" empty-text="暂无数据" :rules='exportFormRule' ref='exportForm'>
                    <el-form-item label="车牌号码:" prop='plateNumber'>
                        <el-input v-model="exportForm.plateNumber" placeholder="车牌号码" clearable></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="通行证状态">
                        <el-select v-model="formInline.state" placeholder="未审批">
                            <el-option label="未审批" value="APPLYING"></el-option>
                            <el-option label="已审批" value="FINISHED"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button  class='el-button-reset' @click="onCancel">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="resultList">
                <el-table
                    :data="permitsList"
                    border
                    style="width: 100%">
                    <el-table-column
                        label="ID"
                        >
                        <template slot-scope="scope">
                            <p  v-if='scope.row.id' >{{scope.row.id}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="出发地"
                        >
                        <template slot-scope="scope">
                            <p v-if='scope.row.from' >{{scope.row.from}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="目的地">
                        <template slot-scope="scope">
                            <p v-if='scope.row.arrivals'>{{scope.row.arrivals}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="途经路线">
                        <template slot-scope="scope">
                            <p v-if='scope.row.route'>{{scope.row.route}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="运输物品">
                        <template slot-scope="scope">
                            <p v-if='scope.row.goods'>{{scope.row.goods}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="车辆所有人">
                        <template slot-scope="scope">
                            <p v-if='scope.row.owner'>{{scope.row.owner}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="手机号">
                        <template slot-scope="scope">
                            <p v-if='scope.row.phone'>{{scope.row.phone}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="车牌号码">
                        <template slot-scope="scope">
                            <p v-if='scope.row.phone'>{{scope.row.plate_number}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="途经时间起">
                        <template slot-scope="scope">
                            <p v-if='scope.row.start_time'>{{scope.row.start_time | date-format}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="途经时间止">
                        <template slot-scope="scope">
                            <p v-if='scope.row.end_time'>{{scope.row.end_time | date-format}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="申请时间">
                        <template slot-scope="scope">
                            <p v-if='scope.row.create_time'>{{scope.row.create_time | date-format}}</p>
                            <p v-else>--</p>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <router-link :to='{path:"/details",query:{id:scope.row.id,state:"APPLYING",breadcrumbitem:"通行证审批"}}'
                            class="table-action">审批</router-link>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paging-wrapper" v-if='permitsListLength !== 0'>
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
  </div>
</template>

<script>
import Api  from '../../api/index.js';
import { mapState } from "vuex";
export default {
  name: "unexam",
  components: {},
  data() {
    return {
        page: 1,
        pageSize: 10,
        state: "APPLYING",
        plate_number: "",
        value: "",
        // formInline: {
        //   number: '',
        //   state: ''
        // },
        exportForm: {
            plateNumber: ''
        },
        exportFormRule:{
            plateNumber: [
                { required: false, message: '请输入车牌号码', trigger: 'blur' },
            ]
        },
    };
  },
  props: {},
  methods: {
        getListData(){
            this.$store.dispatch("fetchPermitsList", {
                page: this.page,
                size: this.pageSize,
                state: "APPLYING",
                plate_number: this.exportForm.plateNumber,
            });
        },
        onSubmit(){
            this.getListData();
        },
        handleSizeChange(value){
            // pageSize变化
            this.pageSize = value;
            this.getListData();
        },
        handleCurrentChange(value){
            // page变化
            this.page = value;
            this.getListData();
        },
        onCancel(){
            // 重置：
            this.$refs['exportForm'].resetFields();
        },
  },
  computed: {
        ...mapState({
            //通行证列表
            permitsList: store => {
                return store.managementPermits.permitsList.permits;
            },
            total: store => {
                return store.managementPermits.permitsList.total;
            },
        }),
        permitsListLength(){
            if(this.permitsList){
                return this.permitsList.length;
            }
        },
  },
  beforeCreate() {},
  created() {},
  updated() {},
  beforeUpdate() {},
  beforeMount() {},
  mounted() {
        // let params = {
        //     "page": this.page,
        //     "size": this.size,
        //     "state": "APPLYING",
        //     "plate_number": this.formInline.number,
        // }
        // Api.managementPermits(params)
        // .then((response) =>{
        //     if(response && response.status === 200){
        //         console.log(response)
        //         this.tableData = response.permits;
        //     }else{

        //     }            
        // })
        // .catch(function (error) {
        // });
        this.getListData();
  },
  destroyed() {},
  beforeDestroy() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.main{
    padding: 15px;
}
.header .title{
    float: left;
    font-size: 18px;
    font-weight: normal;
}
.el-breadcrumb{
    float: right;
}
.demo-input-suffix{
    display: inline-block;
    margin:0 10px 10px 0; 
    font-weight: normal;
}
.demo-input-suffix .el-input{
    width:180px;
}
.paging-wrapper{
    padding-top: 15px;
    text-align: right;
}
</style>