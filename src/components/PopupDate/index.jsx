/*
 * @Date: 2023-05-22 17:50:54
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-22 19:04:07
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved.
 */
import React, { useState, forwardRef } from 'react'
import propsType from 'prop-types'
import { Popup, DatePicker } from 'zarm'
import dayjs from 'dayjs'

const PopupDate = forwardRef(({ onSelect, mode ='date'}, ref) => {
    const [show, setShow] = useState(true)
    const [now, setNow] = useState(new Date())

    const closeMonth = (item) => {
        setNow(item)
        setShow(false)
        if (mode === 'month') {
            onSelect(dayjs(item).format('YYYY-MM'))
        } else if (mode === 'date') {
            onSelect(dayjs(item).format('YYYY-MM-DD'))
        }
    }

    console.log(show,'show===================')

    if (ref) {
        ref.current = {
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(flase)
            },
        }
    }

    return (
        <Popup
            visible={show}
            direction='bottom'
            onMaskClick={() => setShow(false)}
            destroy={false}
            mountContainer={() => document.body}
        >
            <div>
                <DatePicker
                    visible={show}
                    value={now}
                    mode={mode}
                    onOk={closeMonth}
                    onCancel={() => setShow(false)}
                ></DatePicker>
            </div>
        </Popup>
    )
})

PopupDate.propTypes = {
    mode: propsType.string, // 日期格式1
    onSelect: propsType.func, // 选择后的回调
}

export default PopupDate
