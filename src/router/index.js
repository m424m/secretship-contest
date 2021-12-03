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
  },
  {
    path: '/account/edit',
    name: 'EditAccount',
    component: EditAccount,
  },
  {
    path: '/apps/create',
    name: 'CreateApp',
    component: CreateApp,
  },
  {
    path: '/apps/:id',
    component: ViewApp,
    // redirect: '/apps/:id/wallet',
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

export default router;
