<template>
  <div class="details">
        <div class="header breadcrumb-wrapper">
            <h3 class="title">查看详情</h3>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/unexam' }">{{ breadcrumbitem }}</el-breadcrumb-item>
                <el-breadcrumb-item>审批</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main">
            <el-row>
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <div class="grid-header">
                            <h3 class="title">通行证申请详情</h3>
                        </div>
                        <div class="grid-body">
                            <div class="detailsList">
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
                                </el-table>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="7" style="float:right;width:31.66667%;">
                    <div class="grid-content bg-purple-light">
                        <div class="grid-header">
                            <h3 class="title">处理通行证申请</h3>
                        </div>
                        <div class="grid-body">
                            <div class="detailsForm">
                                <el-form ref="form" :model="form" label-width="90px">
                                   <el-form-item label="审批状态">
                                        <el-select v-model="form.state" placeholder="未审批">
                                            <el-option label="未通过" value="APPLYING"></el-option>
                                            <el-option label="通过" value="FINISHED"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="审批备注">
                                        <el-select v-model="form.remarks" placeholder="未审批">
                                            <el-option label="备注一" value="APPLYING"></el-option>
                                            <el-option label="备注一" value="FINISHED"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="途经时间起">
                                        <el-date-picker
                                            v-model="start_time"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="途经时间止">
                                        <el-date-picker
                                            v-model="end_time"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="途径路线">
                                        <el-input type="textarea" v-model="form.desc"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="onSubmit">确定</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
  </div>
</template>

<script>
import Api  from '../../api/index.js';
export default {
    name: "details",
    components: {},
    data() {
        return {
            form: {
                state: '',
                remarks: '',
                start_time: '',
                end_time: '',
                desc: '',
                options: [],
            }
        };
    },
    props: {
        breadcrumbitem:  {
            type: String,
            default: () => {
                return "通行证审批";
            }
        },
    },
    methods: {
        onSubmit(){

        }
    },
    computed: {},
    beforeCreate() {},
    created() {},
    updated() {},
    beforeUpdate() {},
    beforeMount() {},
    mounted() {
        let params = {};
        Api.opinions(params)
        .then((response) =>{
            if(response && response.status === 200){
                console.log(response)
                this.options = response;
            }else{

            }            
        })
        .catch(function (error) {
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
.el-col{
    background: #f5f5f5;
}
.grid-header{
    border-top: 3px rgba(84, 92, 100,0.5) solid;
}
.grid-header .title{
    line-height: 40px;
    font-size: 16px;
    font-weight: normal;
    padding: 0 10px;
}
.grid-body{
    padding: 0 10px 10px;
}
</style>
