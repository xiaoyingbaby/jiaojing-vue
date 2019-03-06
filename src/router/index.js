import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/page/login'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
			hidden: true
		},
		{
			path: '/shenpi',
			name: '审批',
			icon: 'iconshenpi',
			component: HelloWorld
		}
	]
})
