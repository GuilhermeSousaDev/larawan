import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Larawan',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Home',
      path: '/home',
      component: './Home',
    },
    {
      name: 'User',
      path: '/user',
      menu: false,
      routes: [
        {
          name: 'Login',
          path: '/user/login',
          component: './User/Login',
        },
        {
          name: 'Create',
          path: '/user/create',
          component: './User/Create',
        },
        {
          name: 'VerifyEmail',
          path: '/user/email/:token/verify',
          component: './User/VerifyEmail',
        },
      ]
    }
  ],
  npmClient: 'npm',
});

