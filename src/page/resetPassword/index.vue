<template>
<div class="leyer-wrapper">
	<div class="layer">
        <div class="layer-flex">
            <div class="an-title">
				<img :src="logoImg" alt="安阳交警管理平台">
				<span>安阳交警</span>
            </div>
            <h6 class="an-tip">修改密码</h6>
            <div class="formBox">
                <el-form labelPosition="top" :model="resetPsdForm" :rules="rules" ref="resetPsdForm">

                    <el-form-item label="用户名：" prop="userName">
                        <el-input placeholder="请输入" :maxlength="m20" v-model="resetPsdForm.userName"></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="邮箱：" prop="email">
                        <el-input class="email" placeholder="请输入注册时填写的邮箱" :maxlength="m30" v-model="resetPsdForm.email"></el-input><el-button type="primary" class="yzm" :disabled="codeDisabled" @click="sendCode">
                            <template v-if="!codeDisabled">
                                发送验证码
                            </template>
                            <template v-else>
                                剩余{{num}}s
                            </template>
                        </el-button>
                    </el-form-item> -->

                    <!-- <el-form-item label="邮箱验证码：" prop="emailCode">
                        <el-input placeholder="请输入" :maxlength="m14" v-model="resetPsdForm.emailCode"></el-input>
                    </el-form-item> -->

                    <el-form-item label="新密码：" prop="passWord">
                        <el-input placeholder="请输入" type="password" :maxlength="m14" v-model="resetPsdForm.passWord"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码：" prop="re_password">
                        <el-input placeholder="请输入" type="password" :maxlength="m14" v-model="resetPsdForm.re_password"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="btnBox">
                            <el-button :disabled="disabled" class="loginBtn" type="primary" @click="submitForm">提交</el-button>
                            <el-button class="el-button-reset" @click="quxiao">取消</el-button>
                
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
	</div>
    <div class="an-footer">
		<p>Copyright © 2019  安阳市公安局交通警察支队</p>
				<p>豫ICP备19007535号</p>
	</div>
</div>
</template>

<style lang="less" scoped>

@red : #409EFF;
.leyer-wrapper{
	position: relative;
	background:#f1f1f1;
	
}
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
	background:#f1f1f1;
    .layer-flex{
        position: relative;
        width: 500px;
		height: 500px;
		border-radius: 5px;
		background: #fff;
		padding: 30px 60px 10px 60px;
		box-shadow: 0 0 8px rgba(0,0,0,.1);
    }
    .btnBox{
        padding-top: 15px;
        text-align: right;
    }
}

</style>

<script>


// let isClick = false;
// let clickCode = true;
import Api  from '../../api/index.js';
import localDb from '../../util/localDb.js'
import logoImg from '@/assets/images/coin.png'
export default{
	components : {

	},
	mounted : function(){

	},
	data : function(){
		let _this = this;
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
				callback('请输入新密码');
            }
            // else if(!/^[a-zA-Z0-9_!@#$%^&*()_+]{6,14}$/.test(val)){
			// 	callback('密码由6-14位大小写字母、数字和标点符号组成');
            // }
            else if(val === _this.resetPsdForm.re_password){
				// 主动校验
      	_this.$refs.resetPsdForm.validateField('re_password');
      	callback();
			}else{
				callback();
			}
		}
		// 校验二次密码
		let verifyre_password = function(rule, value, callback){
			let val = value;
			if(!val){
				callback('请输入确认密码');
            }
            // else if(!/^[a-zA-Z0-9_!@#$%^&*()_+]{6,14}$/.test(val)){
			// 	callback('密码由6-14位大小写字母、数字和标点符号组成');
            // }
            else if( (!_this.resetPsdForm.passWord) && (val) ){
				// 主动校验
      	_this.$refs.resetPsdForm.validateField('passWord');
      	callback();
			}else if(val !== _this.resetPsdForm.passWord){
				callback('两次输入密码不一致!');
			}else{
				callback();
			}
		}
		// 校验邮箱
		let verifyEmail = function(rule, value, callback){
			let val = value;
			if(!val){
				callback('请输入邮箱');
			}else if(!/^[A-Za-z0-9]+([._\-]*[A-Za-z0-9])*@([-A-Za-z0-9]+\.)+[A-Za-z0-9]+$/.test(val)){
				callback('邮箱格式输入有误');
			}else{
				callback();
			}
		}
		// 校验邮箱 验证码
		let verifyEmailCode = function(rule, value, callback){
			let val = value;
			if(!val){
				callback('请输入邮箱验证码');
			}else{
				callback();
			}
		}
		return ({
            logoImg: logoImg,
			codeDisabled : false,
			num : 59,
			disabled : false,
			m20 : 20,
			m14 : 14,
			m30 : 30,
			// 表单数据
			resetPsdForm : {
				userName : '',
				passWord : '',
				re_password : '',
				// email : '',
				// emailCode : ''
			},
			// 校验
			rules : {
				userName : [
					{ required:true,validator : verifyUserName, trigger: 'blur' }
				],
				passWord : [
					{ required:true,validator : verifyPassWord, trigger: 'blur' }
				],
				re_password : [
					{required:true, validator : verifyre_password, trigger: 'blur' }
				],
				// email : [
				// 	{required:true, validator : verifyEmail, trigger: 'blur' }
				// ],
				// emailCode : [
				// 	{required:true, validator : verifyEmailCode, trigger: 'blur' }
				// ]
			}
		});
	},
	methods : {
		// 点击提交
		submitForm : function(){
			this.$refs.resetPsdForm.validate((valid) => {
				// if(!isClick){
					/*this.$message.error('请获取验证码');
					return;*/
				// }
                // 通过校验
                
				if(valid){
                    this.disabled = true;
                    const {userName, passWord,re_password} = this.resetPsdForm;
					let params = {
						"username": userName.trim(),
						"password":passWord.trim(),
						"re_password": re_password.trim()
					}
					Api.resetPsd(params)
					.then((response) =>{
						this.disabled = false;
						if(response && response.status === 200){

                            this.$message({
                                message: '修改密码成功',
                                type: 'success'
                            });
                            // 清除缓存
                            localDb.clear('3')
                            this.$router.push({path: "/login"});
							// this.$store.dispatch('setToken', _user)
							// this.$store.dispatch('setUser', _user)
							// this.$store.dispatch('setIsRem',_remember_me)
							// this.$router.push({path: "/unexam"});
							// if(localStorage.getItem('uid') !== null){
							// 	localStorage.removeItem('uid');
							// }
							// localStorage.setItem('uid',response.data.uid);
						}else{

						}
						
						
					})
					.catch((error) => {
						this.disabled = false;
					});
                    
					// ajax({
					// 	url : '/user/updateBackUserPasswordBySendCode',
					// 	data : {
					// 		userName : this.resetPsdForm.userName.trim(),
					// 		password : this.resetPsdForm.passWord.trim(),
					// 		secondPassword : this.resetPsdForm.passWord.trim(),
					// 		email : this.resetPsdForm.email.trim(),
					// 		verificationCode : this.resetPsdForm.emailCode.trim()
					// 	},
					// 	success : (data) => {
					// 		if(data.success){
					// 			// 登录成功 执行回调
					// 			this.$emit("confirm");
					// 		}else{
					// 			this.disabled = false;
					// 			this.$message.error(data.errorMsg);
					// 		}
					// 	},
					// 	error : (data) => {
							
					// 		this.disabled = false;
					// 	}
					// });
				}else{
					return false;
				}
			});
		},
		// 点击取消
		quxiao : function(){
			// location.href = '/index.htm';
			window.history.go(-1);
		},
		// 点击发送验证码
		sendCode : function(){
			this.$refs.resetPsdForm.validateField('email');
			this.$refs.resetPsdForm.validateField('userName');
			let val = this.resetPsdForm.email;
			// 保存定时器
			let timer = null;
			let fn = () => {
				if(this.num < 1){
					this.codeDisabled = false;
					this.num = 59;
					clearInterval(timer);
				}else{
					this.num --;
				}
			}
			if(!val){

			}else if(!/^[A-Za-z0-9]+([._\-]*[A-Za-z0-9])*@([-A-Za-z0-9]+\.)+[A-Za-z0-9]+$/.test(val)){

			}else{
				isClick = true;
				if(!clickCode){
					return;
				}
				clickCode = false;
				// 通过校验
				ajax({
					url : '/user/backSendVerificationCode',
					data : {
						userName : this.resetPsdForm.userName.trim(),
						email : this.resetPsdForm.email.trim()
					},
					success : (data) => {
						clickCode = true;
						if(data.success){
							this.$message.success(data.errorMsg);
							this.codeDisabled = true;
							timer = setInterval(fn,1000);
						}else{
							this.$message.error(data.errorMsg);
						}
					},
					error : () => {
						clickCode = true;
					}
				});
			}
		},
		// 重置 表单
		reset : function(){
			this.$refs.resetPsdForm.resetFields();
		}
	},
}

</script>

