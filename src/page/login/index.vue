<template>
    <div class="layer">
        <div class="layer-flex">
            <div class="formBox">
                <el-form labelPosition="top" :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item label="用户名：" prop="userName">
                        <el-input placeholder="请输入" :maxlength="m20" v-model="loginForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="passWord">
                        <input class="el-input__inner" @keyup.enter="submitForm" placeholder="请输入" type="password" :maxlength="m14" v-model="loginForm.passWord" />
                    </el-form-item>
                    <el-form-item>
                        <el-button :disabled="disabled" class="loginBtn" type="primary" @click="submitForm">登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="footer">
                    <a href="/resetPassWord.htm" class="wj">记住我</a>
                    <a href="/signIn.htm" class="zc">注册</a>
                </div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import { authLogin } from '../../api/index.js';
import {post} from '../../api/request.js';
export default {
	name: 'HelloWorld',
	data () {
        // 校验用户名
		let verifyUserName = function(rule, value, callback){
				let val = value;
				if(!val){
					callback('请输入用户名');
				}else if(!/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/.test(val)){
					callback('用户名仅支持2-20位中英文、数字和下划线  ');
				}else{
					callback();
				}
		};
		// 校验密码
		let verifyPassWord = function(rule, value, callback){
			let val = value;
			if(!val){
				callback('请输入密码');
			}else if(!/^[a-zA-Z0-9_!@#$%^&*()_+]{6,14}$/.test(val)){
				callback('密码仅支持6-14位大小写字母，数字和标点符号');
			}else{
				callback();
			}
		}
		return {
			loginForm: {
                userName: '',
                password: ''
            },
            m14: 14,
            m20: 20,
            // 校验
			rules : {
				userName : [
					{ required:true,validator : verifyUserName, trigger: 'blur'}
				],
				passWord : [
					{ required:true,validator : verifyPassWord, trigger: 'blur' }
				]
            },
            disabled: false
		}
	},
	mounted(){
		this.getinit()
	},
    methods: {
		getinit(){
			let params = {
				"username":"system",
				"password":"Tony@123",
				"remember_me":0  // 记住我 0 不记，1记

			}
			// post('/v1.0/auth/login', param)
			// .then(function (response) {
			// 	console.log(response);
			// })
			// .catch(function (error) {
			// 	console.log(error);
			// });
			authLogin(params)
            .then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
		},
        // 点击提交
		submitForm : function(){
			this.$refs.loginForm.validate((valid) => {
				// 通过校验
				if(valid){
					this.disabled = true;
					ajax({
						url : '/font/login',
						data : {
							userName : this.loginForm.userName.trim(),
							password : this.loginForm.passWord.trim()
						},
						success : (data) => {
							this.disabled = false;
							if(data.success){
								// 登录成功 执行回调
								this.$emit("confirm");
							}else{
								this.$message.error(data.errorMsg);
							}
						},
						error : () => {
							this.disabled = false;
						}
					});
				}else{
					return false;
				}
			});
		},
		// 重置 表单
		reset : function(){
			this.$refs.loginForm.resetFields();
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.layer{
    min-height: 100vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    .layer-flex{
        width: 500px;
        height: 400px;
    }
}
</style>
