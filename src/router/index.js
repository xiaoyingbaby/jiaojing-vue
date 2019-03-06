import Vue from 'vue'
import Router from 'vue-router'
import Unexam from '@/page/unexam'
import Examed from '@/page/examed'
import Export from '@/page/export'
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
			path: '/unexam',
			name: '通行证审批',
			icon: 'iconshenpi',
			component: Unexam
		},
		{
			path: '/examed',
			name: '审批日志',
			icon: 'iconshenpitongguo',
			component: Examed
		},
		{
			path: '/export',
			name: '导出日志',
			icon: 'icondaochu',
			component: Export
		}
	]
})
