import React, {Component} from 'react';
import LR from '../../../layouts/LR.js';
import MyForm from './MyForm.js';
import {Steps} from 'antd';
import './personalcar.less';

const {Step} = Steps;

export default class PersonalCar extends Component {
    render () {
        return (
            <LR>
                <div className="personalcar">
                    <h1>卖车资料填写</h1>
                    <Steps current={1}>
                        <Step title="基本资料填写" />
                        <Step title="证件照片上传" />
                        <Step title="上传车辆照片" />
                        <Step title="卖车成功" />
                    </Steps>
                    <div style={{'height': '30px'}}></div>
                    <MyForm />
                </div>
            </LR>
        );
    }
}
