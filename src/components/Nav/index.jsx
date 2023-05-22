/*
 * @Date: 2023-05-18 15:07:28
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-18 17:56:50
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved.
 */

import React, { useState } from 'react'
import propTypes from 'prop-types'
import { TabBar } from 'zarm'
import { useNavigate } from 'react-router-dom'
import s from './style.module.less'
import CustomIcon from '../CustomIcon';


const NavBar = ({ showNav }) => {
    // const [activeKey, setActiveKey] = useState(useLocation().pathname);
    const [activeKey, setActiveKey] = useState('/')
    const navigateTo = useNavigate()

    const changeTab = (path) => {
        setActiveKey(path)
        navigateTo(path)
    }

    return(
        <TabBar visible={showNav} className={s.tab} activeKey={activeKey} onChange={changeTab}>
            <TabBar.Item 
            itemKey={'/'}
            title="账单"
            icon={<CustomIcon type="zhangdan" />}
            />
            <TabBar.Item 
            itemKey={'/data'}
            title="统计"
            icon={<CustomIcon type="tongji" />}
            />
            <TabBar.Item 
            itemKey={'/user'}
            title="我的"
            icon={<CustomIcon type="wode" />}
            />
        </TabBar>
    )
}

NavBar.propTypes = {
    showNav: propTypes.bool
}

export default NavBar