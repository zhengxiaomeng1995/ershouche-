import React, {Component} from 'react';
import LR from '../../../layouts/LR.js';
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import Step3 from './Step3.js';
import Step4 from './Step4.js';
import {Steps} from 'antd';
import './personalcar.less';
import {connect} from 'dva';

const {Step} = Steps;

@connect(
    ({salecar}) => ({
        step: salecar.step
    })
)
export default class PersonalCar extends Component {
    render () {
        return (
            <LR>
                <div className="personalcar">
                    <h1>卖车资料填写</h1>
                    <Steps current={this.props.step}>
                        <Step title="基本资料填写" />
                        <Step title="证件照片上传" />
                        <Step title="上传车辆照片" />
                        <Step title="卖车成功" />
                    </Steps>
                    <div style={{'height': '30px'}}></div>
                    {
                        (()=>{
                            if (this.props.step === 0) {
                                return <Step1 />;
                            } else if (this.props.step === 1) {
                                return <Step2 />;
                            } else if (this.props.step === 2) {
                                return <Step3 />;
                            } else if (this.props.step === 3) {
                                return <Step4 />;
                            }
                        })()
                    }
                </div>
            </LR>
        );
    }
}
