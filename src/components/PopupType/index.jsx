/*
 * @Date: 2023-05-22 16:08:41
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-22 17:38:53
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved.
 */
import React, { useState, useEffect, forwardRef } from 'react'
import { Popup, Icon } from 'zarm'
import propTypes from 'prop-types'
import cx from 'classnames'
import { get } from '@/utils'

import s from './style.module.less'

// forwardRef 用于拿到父组件传入的ref属性，这样父组件便能通过ref控制子组件
const PopupType = forwardRef(({ onSelect }, ref) => {
    const [show, setShow] = useState(false) // 组件的显示和隐藏、
    const [active, setActive] = useState('all') // 激活的type
    const [expense, setExpense] = useState([]) // 支出类型标签
    const [income, setIncome] = useState([]) // 收入类型标签

    useEffect(() => {
        // 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
        const getData = async() => {
            const {
                data: { list },
            } = await get('/api/type/list')
            setExpense(list.filter((i) => i.type == 1))
            setIncome(list.filter((i) => i.type == 2))
        }
        getData()
    }, [])

    if (ref) {
        ref.current = {
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(false)
            },
        }
    }

    // 选择类型回调
    const choseType = (item) => {
        setActive(item.id)
        setShow(false)
        // 父组件传入的 onSelect，为了获取类型
        onSelect(item)
    }

    return (
        <Popup
            visible={show}
            direction='bottom'
            onMaskClick={() => setShow(false)}
            destroy={false}
            mountContainer={() => document.body}
        >
            <div className={s.PropType}>
                <div className={s.header}>
                    <Icon
                        type='worng'
                        className={s.cross}
                        onClick={() => {
                            setShow(false)
                        }}
                    ></Icon>
                </div>
                <div className={s.content}>
                    <div
                        onClick={() => choseType({ id: 'all' })}
                        className={cx({
                            [s.all]: true,
                            [s.active]: active == 'all',
                        })}
                    >
                        全部类型
                    </div>
                    <div className={s.title}>支出</div>
                    <div className={s.expenseWrap}>
                        {expense.map((item, index) => (
                            <p
                                key={index}
                                onClick={() => choseType(item)}
                                className={cx({
                                    [s.active]: active == item.id,
                                })}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                    <div className={s.title}>收入</div>
                    <div className={s.incomeWrap}>
                        {income.map((item, index) => (
                            <p
                                key={index}
                                onClick={() => choseType(item)}
                                className={cx({
                                    [s.active]: active == item.id,
                                })}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </Popup>
    )
})

PopupType.propTypes = {
    onSelect: propTypes.func,
}

export default PopupType
