import Vue from 'vue'
import Router from 'vue-router'
import Unexam from '@/page/unexam'
import Examed from '@/page/examed'
import Export from '@/page/export'
import Login from '@/page/login'
import Detail from '@/page/details'

Vue.use(Router)

const router =  new Router({
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
			component: Unexam,
			// meta: { 
			// 	requireAuth: true
			// },
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
		},
		{
			path: '/details',
			name: '查看审批详情',
			component: Detail,
			hidden: true
		}
	]
})

// 路由拦截
// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(res => res.meta.requireAuth )) {// 判断是否需要登录权限
// 		if (localStorage.getItem('username')) {// 判断是否登录

// 			next()

// 		} else {// 没登录则跳转到登录界面

// 			next({
// 				path: '/login',
// 				query: {redirect: to.fullPath}
// 			})
// 		}
// 	} else {
// 		next()
// 	}
// })

export default router
