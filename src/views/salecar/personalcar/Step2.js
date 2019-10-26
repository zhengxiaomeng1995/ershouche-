import React, {Component} from 'react';
import {Form, Input, Button, notification, Row, Col, message} from 'antd';
import {connect} from 'dva';
import UpIdCard from './UpIdcard.js';
import RealUpIdCard from './RealUpIdCard.js';

// 这里可以写量
let zmfile = null;
let fmfile = null;

@Form.create({
    name: 'myform'
})
@connect(
    ({salecar}) => ({
        ...salecar
    })
)
export default class Step2 extends Component {
    constructor () {
        super();
    }

    getZm (file) {
        zmfile = file;
    }

    getFm (file) {
        fmfile = file;
    }

    render () {
        const {getFieldDecorator, validateFields} = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: {span: 4}
            },
            wrapperCol: {
                sm: {span: 14}
            }
        };

        return <Form {...formItemLayout}>
            <Form.Item label="卖车人身份证号码">
                {
                    getFieldDecorator(
                        'idcard',
                        {
                            rules: [
                                {
                                    required: true,
                                    message: '必须填写卖车人身份证号码'
                                },
                                {
                                    pattern: new RegExp('^[0-9]{17}[0-9X]$'),
                                    message: '不合法的身份证号码'
                                }
                            ]
                        }
                    )(<Input />)
                }
            </Form.Item>
            <UpIdCard getZm={this.getZm.bind(this)} />
            <UpIdCard getFm={this.getFm.bind(this)} />
            <Row>
                <Col span={4} style={{'textAlign': 'right'}}>
                </Col>
                <Col span={6}>
                    <Button onClick={() => {
                        // 检查表单正确性
                        validateFields((errors, values) => {
                            if (errors === null) {
                                // 检查身份证照片是否添加完毕
                                if (zmfile === null || fmfile === null) {
                                    message.error('请上传身份证照片');
                                    return;
                                }
                                notification.info({
                                    key: 'aa',
                                    message: '正在上传您的身份证，并核实核实身份证照片真假，请不要关闭窗口',
                                    description: <RealUpIdCard
                                        zmfile={zmfile}
                                        fmfile={fmfile}
                                        alldone={()=>{
                                            this.props.dispatch({'type': 'salecar/CHANGESTEP', 'step': 2});
                                            notification.close('aa');
                                        }}
                                    />
                                });
                            } else {
                                message.error('请检查表单');
                            }
                        });
                    }}>下一步</Button>
                </Col>
            </Row>
        </Form>;
    }
}
