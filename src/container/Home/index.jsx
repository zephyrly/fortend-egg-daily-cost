/*
 * @Date: 2023-05-18 15:38:47
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-23 17:00:55
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved.
 */

import React, { useState, useEffect, useRef } from 'react'
import { Icon, Pull } from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import BillItem from '@/components/BillItem'
import PopupType from '@/components/PopupType'
import PopupDate from '@/components/PopupDate'
import PopupAddBill from '../../components/PopupAddBill'
import dayjs from 'dayjs'
import { get, REFRESH_STATE, LOAD_STATE } from '@/utils' // Pull 组件需要的一些常量

import s from './style.module.less'


const Home = () => {
    const typeRef = useRef() // 账单类型ref
    const monthRef = useRef() // 月份筛选ref
    const addRef = useRef() // 新增账单的ref

    const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal)
    const [loading, setLoading] = useState(LOAD_STATE.normal)
    const [currentSelect, setCurrentSelect] = useState({}) // 当前筛选类型
    const [totalExpense, setTotalExpense] = useState(0) // 当前筛选类型
    const [totalIncome, setTotalIncome] = useState(0) // 当前筛选类型

    const [list, setList] = useState([
        {
            bills: [
                {
                    amount: '5.00',
                    date: '1623390740000',
                    id: 911,
                    pay_type: 1,
                    remark: '',
                    type_id: 1,
                    type_name: '餐饮',
                },
            ],
            data: '2021-06-11',
        },
    ])

    useEffect(() => {
        getBillList() // 初始化
    }, [page, currentSelect, currentTime])

    // 获取账单方法
    const getBillList = async () => {
        const { data } = await get(
            `/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${
                currentSelect.id || 'all'
            }`
        )
        // 下拉刷新，重制数据
        if (page == 1) {
            setList(data.list)
        } else {
            setList(list.concat(data.list))
        }

        setTotalExpense(data.totalExpense.toFixed(2))
        setTotalIncome(data.totalIncome.toFixed(2))
        setTotalPage(data.totalPage)
        // 上滑加载状态
        setLoading(LOAD_STATE.success)
        setRefreshing(REFRESH_STATE.success)
    }

    // 添加账单弹窗
    const toggle = () => {
        typeRef.current && typeRef.current.show()
    }

    // 添加月份弹框
    const monthToggle = () => {
        monthRef.current && monthRef.current.show()
    }

    // 新增账单的弹框
    const addToggle = () => {
        addRef.current && addRef.current.show()
    }


    // 筛选类型
    const select = (item) => {
        setRefreshing(REFRESH_STATE.loading)
        // 触发刷新列表，将分页重制为 1
        setPage(1)
        setCurrentSelect(item)
    }

    // 筛选月份
    const selectMonth = (item) => {
        console.log(item)
        setRefreshing()
        // 触发刷新列表，将分页重制为 1
        setPage(1)
        setCurrentTime(item)
    }

    // 请求列表数据
    const refreshData = () => {
        setRefreshing(REFRESH_STATE.loading)
        if (page != 1) {
            setPage(1)
        } else {
            getBillList()
        }
    }

    const loadData = () => {
        if (page < totalPage) {
            setLoading(LOAD_STATE.loading)
            setPage(page + 1)
        }
    }

    return (
        <div className={s.home}>
            <div className={s.header}>
                <div className={s.dataWrap}>
                    <span className={s.expense}>
                        总支出：<b>¥ {totalExpense}</b>
                    </span>
                    <span className={s.income}>
                        总收入：<b>¥ {totalIncome}</b>
                    </span>
                </div>
                <div className={s.typeWrap}>
                    <div className={s.left} onClick={toggle}>
                        <span className={s.title}>
                            {currentSelect.name || '全部类型'}{' '}
                            <Icon className={s.arrow} type='arrow-bottom' />
                        </span>
                    </div>
                    <div className={s.right} >
                        <span className={s.time} onClick={monthToggle}>
                            {currentTime || ''}{''}
                            <Icon className={s.arrow}  type='arrow-bottom' />
                        </span>
                    </div>
                </div>
            </div>
            <div className={s.contentWrap}>
                {list.length ? (
                    <Pull
                        animationDuration={200}
                        stayTime={400}
                        refresh={{
                            state: refreshing,
                            handler: refreshData,
                        }}
                        load={{
                            state: loading,
                            distance: 200,
                            handler: loadData,
                        }}
                    >
                        {list.map((item, index) => (
                            <BillItem bill={item} key={index} />
                        ))}
                    </Pull>
                ) : null}
            </div>
            <div className={s.add} onClick={addToggle}><CustomIcon type="tianjia"></CustomIcon></div>
            <PopupType ref={typeRef} onSelect={select}></PopupType>
            <PopupDate ref={monthRef} mode="month" onSelect={selectMonth}></PopupDate>
            <PopupAddBill ref={addRef} onReload={refreshData} ></PopupAddBill>
        </div>
    )
}

export default Home
