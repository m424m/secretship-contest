import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '@/views/Landing.vue'
import EditAccount from '@/views/account/EditAccount.vue'
import Help from '@/views/Help.vue'
import Apps from '@/views/apps/Apps.vue'
import AppBase from '@/views/apps/AppBase.vue'
import CreateApp from '@/views/apps/CreateApp.vue'
import Wallet from '@/views/apps/Wallet.vue'
import Users from '@/views/apps/Users.vue'
import Settings from '@/views/apps/Settings.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { hideNav: true },
  },
  {
    path: '/apps',
    name: 'Apps',
    component: Apps,
    meta: { needAuth: true },
  },
  {
    path: '/account/edit',
    name: 'EditAccount',
    component: EditAccount,
    meta: { needAuth: true },
  },
  {
    path: '/apps/create',
    name: 'CreateApp',
    component: CreateApp,
    meta: { needAuth: true },
  },
  {
    path: '/apps/:id',
    component: AppBase,
    meta: { needAuth: true },
    redirect: (to) => ({
      path: `/apps/${to.params.id}/wallet`,
    }),
    children: [
      {
        path: 'wallet',
        name: 'AppWallet',
        component: Wallet,
      },
      {
        path: 'users',
        name: 'AppUsers',
        component: Users,
      },
      {
        path: 'settings',
        name: 'AppSettings',
        component: Settings,
      },
    ],
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/apps',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.needAuth && !store.state.user) return '/'
  if (to.name === 'Landing' && store.state.user) return '/apps'
  return true
})

export default router
