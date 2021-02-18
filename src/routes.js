/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';
import DashboardDefaultView from './views/DashboardDefault';

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to="/auth/login" />
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('views/Login'))
      },
      {
        path: '/auth/forgot-password',
        exact: true,
        component: lazy(() => import('views/Forgot'))
      },
      {
        path: '/auth/reset-password',
        exact: true,
        component: lazy(() => import('views/Reset'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/dashboard',
        exact: true,
        component: DashboardDefaultView
      },
      {
        path: '/management-user/user',
        exact: true,
        component: lazy(() => import('views/ManagementUser/User'))
      },
      {
        path: '/management-user/role',
        exact: true,
        component: lazy(() => import('views/ManagementUser/Role'))
      },
      {
        path: '/management-content/business-talk',
        exact: true,
        component: lazy(() => import('views/ManagementContent/BusinessTalks'))
      },
      {
        path: '/management-content/learning-center',
        exact: true,
        component: lazy(() => import('views/ManagementContent/LearningCenters'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
