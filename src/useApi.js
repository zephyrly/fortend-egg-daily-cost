import React, { useState, useEffect } from 'react'

// 模拟请求
const getList = (query) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('query',query)
            resolve([5, 6, 7, 8, 9, 10])
        }, 2000)
    })
}

const useApi = () => {
    const [data, setData] = useState([1, 2, 3, 4, 5])
    const [query, setQuery] = useState('')

    useEffect(() => {
        (async () => {
            const data = await getList(query)
            console.log('data', data)
            setData(data)
        })()
    }, [query])

    return [{ data }, setQuery]
}

export default useApi
