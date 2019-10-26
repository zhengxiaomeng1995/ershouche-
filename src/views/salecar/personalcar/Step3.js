import React, {Component} from 'react';
import {Input, Cascader, Button, message, Row, Col} from 'antd';
import {connect} from 'dva';
import OneRow from './OneRow.js';

@connect(
    ({salecar}) => ({
        ...salecar
    })
)
export default class Step3 extends Component {
    constructor () {
        super();
    }

    render () {
        return <div>
            <OneRow c="外观" />
            <OneRow c="内饰" />
            <OneRow c="结构" />
            <OneRow c="更多" />
            <Button onClick={()=>{
                let views = [...document.querySelectorAll('div[data-box=外观] div[data-filename]')].map(item => {
                    return item.getAttribute('data-filename');
                });
                let inner = [...document.querySelectorAll('div[data-box=内饰] div[data-filename]')].map(item => {
                    return item.getAttribute('data-filename');
                });
                let engine = [...document.querySelectorAll('div[data-box=结构] div[data-filename]')].map(item => {
                    return item.getAttribute('data-filename');
                });
                let more = [...document.querySelectorAll('div[data-box=更多] div[data-filename]')].map(item => {
                    return item.getAttribute('data-filename');
                });
                this.props.dispatch({'type': 'salecar/ADDCAR', views, inner, more, engine});
            }}>确认添加车辆</Button>
        </div>;
    }
}
