/*
 * @Date: 2023-05-18 11:34:16
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-18 11:34:24
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved. 
 */
import React, { useCallback, useState, useEffect, useMemo } from 'react'
import useApi from './useApi'

function Child({ callback }) {
    useEffect(() => {
        callback()
    }, [callback])

    return <div>子组件</div>
}

function App() {
    const [{ data }, setQuery] = useApi()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [kw, setKw] = useState('')

    const dataMemo = useMemo(
        () => ({
            name,
            phone,
        }),
        [name, phone]
    )

    const callback = useCallback(() => {
        console.log('callback函数')
    },[name])

    return (
        <div className='App'>
            {data.map((item, index) => {
                return <span key={index}> {item} </span>
            })}
            <input
                type='text'
                onChange={(e) => {
                    setQuery(e.target.value)
                }}
                placeholder='请输入搜索值'
            />
            <div>
                <input
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    placeholder='请输入姓名'
                />
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    type='text'
                    placeholder='请输入电话'
                />
                <input
                    onChange={(e) => setKw(e.target.value)}
                    type='text'
                    placeholder='请输入关键词'
                />
                <Child callback={callback} />
            </div>
        </div>
    )
}

export default App