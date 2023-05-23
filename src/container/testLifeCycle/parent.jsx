/*
 * @Date: 2023-05-23 12:08:47
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-23 14:33:11
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved.
 */

import React, { Component } from 'react'
import { Button } from 'zarm'
import Child from './child'

const parentStyle = {
    padding: 20,
    margin: 20,
    backgroundCoLor: 'LightCyan',
}

const NAME = 'Parent 组件：'

export default class Parents extends Component {
    constructor() {
        super()
        console.log(NAME, 'constructor')
        this.state = {
            count: 0,
            mountChild: true,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(NAME, 'getDerivedStateFromProps')
        return null
    }

    componentDidMount() {
        console.log(NAME, 'componentDidMount')
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(NAME, 'shouldComponentUpdate')
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(NAME, 'getSnapshotBeforeUpdate')
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(NAME, 'componentDidUpdate')
    }

    componentWillUnmount() {
        console.log(NAME, 'componentWillUnmount')
    }

    /**
     * 修改传给子组件属性 count 的方法
     * */
    changeNum = () => {
        let { count } = this.state
        this.setState({
            count: ++count,
        })
    }

    /**
     * 切换子组件属性的 count 的方法
     * */
    toggleMountChild = () => {
        const { mountChild } = this.state
        this.setState({
            mountChild: !mountChild,
        })
    }

    render() {
        console.log(NAME, 'render')
        const {count , mountChild} = this.state 
        return (
            <div style={parentStyle}>
                <div>
                    <h3>父组件</h3>
                    <Button onClick={this.changeNum}>改变传给子组件的属性</Button>
                    <br />
                    <br />
                    <Button onClick={this.toggleMountChild}>卸载/挂载子组件</Button>
                </div>
                {true?'':<Child count={count}></Child>    }
            </div>
        )
    }
}
