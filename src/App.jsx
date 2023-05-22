/*
 * @Date: 2023-05-17 17:19:42
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-18 16:59:30
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved. 
 */
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation, 
} from "react-router-dom"
import NavBar from './components/Nav'

import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'

import routes from '@/router'
function App() {
  const location = useLocation() // 拿到 location 实例
  const { pathname } = location // 获取当前路径
  const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]) // [] 内的参数若是变化，便会执行上述回调函数=

  return <>
    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
       <Routes>
        {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
       </Routes>
    </ConfigProvider>
    <NavBar showNav={showNav}></NavBar>
  </>
}

export default App
