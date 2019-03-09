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
                <!-- <div class="demo-input-suffix">
                    <span>车牌号码：</span><el-input v-model="plate_number" placeholder="请输入内容"></el-input>
                </div>
                <div class="demo-input-suffix">
                    <span>通行证状态：</span>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div> -->
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="车牌号码">
                        <el-input v-model="formInline.number" placeholder="车牌号码"></el-input>
                    </el-form-item>
                    <el-form-item label="通行证状态">
                        <el-select v-model="formInline.state" placeholder="未审批">
                            <el-option label="未审批" value="APPLYING"></el-option>
                            <el-option label="已审批" value="FINISHED"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="resultList">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="ID"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="from"
                        label="出发地"
                        >
                    </el-table-column>
                    <el-table-column
                        prop="arrivals"
                        label="目的地">
                    </el-table-column>
                    <el-table-column
                        prop="route"
                        label="途经路线">
                    </el-table-column>
                    <el-table-column
                        prop="goods"
                        label="运输物品">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="车辆所有人">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="plate_number"
                        label="车牌号码">
                    </el-table-column>
                    <el-table-column
                        prop="start_time"
                        label="途经时间起">
                    </el-table-column>
                    <el-table-column
                        prop="end_time"
                        label="途经时间止">
                    </el-table-column>
                    <el-table-column
                        prop="limit_time"
                        label="申请时间">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="操作">
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

<script>
import Api  from '../../api/index.js';
import { mapState } from "vuex";
export default {
  name: "unexam",
  components: {},
  data() {
    return {
        tableData: [],
        page: "1",
        size: "10",
        state: "APPLYING",
        plate_number: "",
        value: "",
        formInline: {
          number: '',
          state: ''
        }
    };
  },
  props: {},
  methods: {
        getData(){
            this.$store.dispatch("fetchPermitsList", {
                page: this.page,
                size: this.size,
                state: this.formInline.state,
                plate_number: this.formInline.number,
            });
        },
        onSubmit(){
            this.getData();
        }
  },
  computed: {
      ...mapState({
          //通行证列表
          permitsList: store => {
            return store.managementPermits.setPermitsList.permits;
        },
      })
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
        this.$store.dispatch("fetchPermitsList", {
            page: this.page,
            size: this.size,
            state: "APPLYING",
            plate_number: this.formInline.number,
        });
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
</style>