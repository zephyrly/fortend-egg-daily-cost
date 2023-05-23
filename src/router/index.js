/*
 * @Date: 2023-05-18 11:50:06
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-23 14:28:22
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved. 
 */
// router/index.js
// import Index from '@/container/Index'
// import About from '@/container/About'
import User from '@/container/User'
import Home from '@/container/Home'
import Data from '@/container/Data'
import Login from '@/container/Login'
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
    path: "/testLifeCycle",
    component: Parents
  }
];

export default routes
