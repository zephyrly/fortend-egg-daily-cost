/*
 * @Date: 2023-05-25 16:05:14
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-25 16:05:26
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved. 
 */
const MODE = import.meta.env.MODE // 环境变量

export const baseUrl = MODE == 'development' ? '/api' : 'http://api.chennick.wang'