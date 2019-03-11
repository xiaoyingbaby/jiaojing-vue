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
                                <table class="el-table el-table--border">
                                    <tr>
                                        <th width="30%"><div class="cell">手机号</div></th>
                                        <td><div class="cell">{{ tableData.phone }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">出发地</div></th>
                                        <td><div class="cell">{{ tableData.from }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">目的地</div></th>
                                        <td><div class="cell">{{ tableData.arrivals }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">运输物品</div></th>
                                        <td><div class="cell">{{ tableData.goods }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">车辆所有人</div></th>
                                        <td><div class="cell">{{ tableData.owner }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">车牌号码</div></th>
                                        <td><div class="cell">{{ tableData.plate_number }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">通行证编号</div></th>
                                        <td><div class="cell">{{ tableData.permit_number }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">途经时间起</div></th>
                                        <td><div class="cell">{{ tableData.start_time | date-format }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">途经时间止</div></th>
                                        <td><div class="cell">{{ tableData.end_time | date-format }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">申请时间</div></th>
                                        <td><div class="cell">{{ tableData.create_time | date-format }}</div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">车辆左前方现状图</div></th>
                                        <td><div class="cell"><img :src="imgUrl(tableData.photo_car_path1)"></div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">行驶证正面</div></th>
                                        <td><div class="cell"><img :src="imgUrl(tableData.photo_vehicle_license_path1)"></div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">行驶证反面</div></th>
                                        <td><div class="cell"><img :src="imgUrl(tableData.photo_vehicle_license_path2)"></div></td>
                                    </tr>
                                    <tr>
                                        <th width="30%"><div class="cell">车辆尾部照片</div></th>
                                        <td><div class="cell"><img :src="imgUrl(tableData.photo_car_path2)"></div></td>
                                    </tr>
                                </table>
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
                                        <el-select v-model="form.state" placeholder="未通过">
                                            <el-option label="未通过" value="APPLYING"></el-option>
                                            <el-option label="通过" value="FINISHED"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="审批备注">
                                        <el-select v-model="form.remarks" placeholder="无">
                                            <el-option 
                                                v-for="(item, index) in options" 
                                                :key="index" 
                                                :label="item.content" 
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="途经时间起">
                                        <el-date-picker
                                            v-model="form.start_time"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="途经时间止">
                                        <el-date-picker
                                            v-model="form.end_time"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="限制时间">
                                        <el-select v-model="form.limit_time" placeholder="夏季">
                                            <el-option label="夏季" value="7:00-8:30,11:30-12:30,18:00-20:00"></el-option>
                                            <el-option label="冬季" value="7:00-8:30,11:30-12:30,17:30-19:30"></el-option>
                                        </el-select>
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
import { mapState } from "vuex";
export default {
    name: "details",
    components: {},
    data() {
        return {
            tableData: [],
            form: {
                state: '',
                remarks: '无',
                start_time: '',
                end_time: '',
                desc: '',
                limit_time:'7:00-8:30,11:30-12:30,18:00-20:00',
            },
            options: [],
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
            Api.approvalPermits({
                id: this.$route.query.id,
                state: this.form.state,
                approval_opinion: this.options.content,
                route: this.form.desc,
                start_time: this.form.start_time,
                end_time: this.form.start_time,
                limit_time: this.form.limit_time,
            })
            .then((response) =>{
                if(response && response.status === 200){
                    console.log(response.data)
                }else{

                }            
            })
            .catch(function (error) {
            });
        },
        imgUrl(url){
            Api.photoPath({path: url})
            .then((response) =>{
                if(response && response.status === 200){
                    return  response.data;
                }else{

                }            
            })
            .catch(function (error) {
            });
        }
    },
    computed: {
        // ...mapState({
        //     permitsList: store => {
        //         return store.managementPermits.permitsList.permits;
        //     },
        // }),
    },
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
                this.options = response.data;
            }else{

            }            
        })
        .catch(function (error) {
        });
        //查看通行证详情
        // this.$store.dispatch("fetchPermitsList", {
        //     id: this.$route.query.id,
        // });
        Api.managementPermits({
            id: this.$route.query.id,
        })
        .then((response) =>{
            if(response && response.status === 200){
                this.tableData = response.data.permits[0];
                this.form.state = this.tableData.state == "ACCEPTED"?"通过":"不通过";
                this.form.start_time = this.tableData.start_time;
                this.form.end_time = this.tableData.end_time;
                this.form.desc = this.tableData.route;
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
