/*
 * @Date: 2023-05-18 11:29:36
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-18 14:18:24
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved. 
 */

// Index/index.jsx
import React from 'react'
import { Button } from 'zarm'

import s from './style.module.less'

export default function Index() {
  return <div className={s.index}>
    <span>样式</span>
    <Button theme='primary'>按钮</Button>
  </div>
}


