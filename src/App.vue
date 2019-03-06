<template>
  <div id="app">
	<template v-if="path === 'default'">
		<el-container>
            
			<!--  -->
			<el-container class="container-wrap">
                
				<div class="container-aside">
					<el-menu
						:default-active="$route.path"
						class="el-menu-vertical-demo"
						router
						unique-opened
						:default-openeds="openeds"
						background-color="#545c64"
                        :collapse = isCollapse
					>
						<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
							<el-submenu :index="index+''" :key="index" v-if="item.isPull">
								<template slot="title"><i :class="item.iconCls + ' iconfont'"></i>{{item.name}}</template>
								<el-menu-item v-for="child in item.children" :index="item.path + '/' + child.path" v-if="!child.hidden"  :key="child.name">{{child.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item
								:index="item.path + '/' + item.children[0].path"
								:key="index"
								v-if='!item.isPull && item.children && item.children.length > 0'
								:class="$route.path.split('/').indexOf(item.path.replace('/','')) > -1 ? 'is-active' : ''"
							>
                                <template>
                                    <span :class="item.icon + ' iconfont'"></span>
                                    <span slot="title">{{item.name}}</span>
                                </template>
							</el-menu-item>
							<el-menu-item
								:index="item.path"
								:key="index"
								v-if='(!item.isPull && !item.children) || (!item.isPull && item.children && item.children.length === 0)'
								:class="$route.path === item.path ? 'is-active' : ''"
							>
								<template>
                                    <i :class="item.icon + ' iconfont'"></i>
                                    <span slot="title">{{item.name}}</span>
                                </template>
							</el-menu-item>
						</template>
					</el-menu>
				</div>
				<el-main class="container-main">
                    <el-header class="app-header">
                        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                            <el-radio-button :label="false">展开</el-radio-button>
                            <el-radio-button :label="true">收起</el-radio-button>
                        </el-radio-group>
                    </el-header>
                    <router-view/>
                </el-main>
			</el-container>
		</el-container>
	</template>
	<!-- 登陆页面 -->
	<template v-else-if="path === 'login'">
		<router-view/>
	</template>
  </div>
</template>


<script>
import '@/assets/icon/iconfont.css'
export default {
    name: 'App',
    data () {
        return {
            // 默认打开的左侧菜单
			openeds: [],
            path: 'default',
            isCollapse: false
        }
	},
	updated : function(){
		console.log(1111)
		/* 判断显示的组件 */
		let path = this.$route.path;
		
		if(path === '/login'){
			this.path = 'login';
		}else if(path === '/sign'){
			this.path = 'sign';
		}else{
			this.path = 'default';
		}
	},
    mounted () {
        const openeds = [];
        for (let i = 0; i < this.$router.options.routes.length; i++) {
            if (this.$route.path.indexOf(this.$router.options.routes[i].path) > -1) {
                openeds.push(i + '');
                break;
            };
            if (openeds.length > 0) {
                break;
            };
        };
        this.openeds = openeds;
        console.log(this.$router);
        // console.log(this.$route.path)
    }
}
</script>

<style lang='less' scoped>

.app-header{
    line-height: 60px;
    background: #F7F9F2;
}
.el-main{
    padding : 0px;
}
.el-menu-vertical-demo {
    .is-active{
        outline: 0;
        background-color: rgb(234, 247, 239);
    }
}
.el-menu-vertical-demo{
    min-height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    
}
</style>


