/*
 * @Date: 2023-05-18 11:50:06
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-25 16:00:43
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved. 
 */
// router/index.js
import User from '@/container/User'
import Home from '@/container/Home'
import Data from '@/container/Data'
import Login from '@/container/Login'
import Detail from '../container/Detail'
import Account from '@/container/Account'
import About from '@/container/About'
import UserInfo from '@/container/UserInfo'
import Parents from '@/container/testLifeCycle/parent'

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/detail",
    component: Detail
  },
  ,
  {
    path: "/account",
    component: Account
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/userinfo",
    component: UserInfo
  },
  {
    path: "/testLifeCycle",
    component: Parents
  }
];

export default routes
