import { createRouter, createWebHashHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import EditAccount from '../views/EditAccount.vue';
import Help from '../views/Help.vue';
import Apps from '../views/Apps.vue';
import ViewApp from '../views/ViewApp.vue';
import CreateApp from '../views/CreateApp.vue';
import Wallet from '../views/app/Wallet.vue';
import Users from '../views/app/Users.vue';
import Settings from '../views/app/Settings.vue';
import store from '@/store';

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
    component: ViewApp,
    meta: { needAuth: true },
    redirect: (to) => ({
      path: `/apps/${to.params.id}/wallet`,
    }),
    children: [
      {
        path: 'wallet',
        component: Wallet,
      },
      {
        path: 'users',
        component: Users,
      },
      {
        path: 'settings',
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.needAuth && !store.state.user) return '/'
  if (to.name === 'Landing' && store.state.user) return '/apps'
  return true
});

export default router;
