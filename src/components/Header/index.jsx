/*
 * @Date: 2023-05-19 09:44:29
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-25 15:19:14
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved. 
 */

import React from 'react'
import propsType from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { NavBar, Icon } from 'zarm'

import s from './style.module.less'

const Header = ({title = ''}) => {
    const navigateTo = useNavigate()
    return <div className={s.headerWarp}>
      <div className={s.block}>
        <NavBar
          className={s.header}
          left={<Icon type="arrow-left" theme="primary" onClick={() => navigateTo(-1)} />}
          title={title}
        />
      </div>
    </div>
  };
  
  Header.propsType = {
    title: propsType.string //标题
  }
  
  export default Header;
