import React, {Component} from 'react';
import {Form, Input, Cascader, Button, message} from 'antd';
import {connect} from 'dva';
import axios from 'axios';

@Form.create({
    name: 'myform'
})
@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
@connect(
    ({salecar}) => ({
        ...salecar
    })
)
export default class MyForm extends Component {
    constructor () {
        super();
        this.state = {
            // 剩余秒数
            miao: 6,
            // 是否开始倒计时
            isDjs: false
        };
    }

    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/LOADALLBSSAGA'});
    }

    render () {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                sm: {span: 4}
            },
            wrapperCol: {
                sm: {span: 8}
            }
        };

        return (
            <Form {...formItemLayout}>
                <Form.Item label="卖车人中文姓名">
                    {
                        getFieldDecorator(
                            'name',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写卖车人姓名'
                                    },
                                    {
                                        pattern: new RegExp('^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$'),
                                        message: '必须符合中国人命名法'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>

                <Form.Item label="车架号">
                    {
                        getFieldDecorator(
                            'chejiahao',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写车架号'
                                    },
                                    {
                                        pattern: /^\d{17}$/,
                                        message: '必须是17位数字'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>

                <Form.Item label="品牌和车系">
                    {
                        getFieldDecorator(
                            'chejiahao',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写品牌和车系'
                                    }
                                ]
                            }
                        )(<Cascader />)
                    }
                </Form.Item>
                <p>兄弟，帮你把数据弄回来了，接下来靠你了，我离职了</p>
                <p style={{'overflowY': 'scroll', 'height': '40px'}}>{JSON.stringify(this.props.allbs)}</p>
                <Form.Item label="手机号码">
                    {
                        getFieldDecorator(
                            'mobile',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写手机号码'
                                    },
                                    {
                                        pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
                                        message: '必须是11位数字'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                    <Button disabled={this.state.isDjs} onClick={()=>{
                        // 得到手机号码
                        let mobile = this.props.form.getFieldValue('mobile');
                        // 验证是否符合正则
                        if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(mobile)) {
                            message.error('请输入正确手机号码');
                            return;
                        }
                        // dispatch发验证名
                        this.props.dispatch({'type': 'salecar/SENDMSG', 'phone': mobile});
                        this.setState({
                            isDjs: true
                        });
                        clearInterval(this.timer);
                        this.timer = setInterval(()=>{
                            this.setState({
                                miao: this.state.miao - 1
                            }, () => {
                                if (this.state.miao <= 0) {
                                    this.setState({
                                        miao: 6,
                                        isDjs: false
                                    });
                                    clearInterval(this.timer);
                                }
                            });
                        }, 1000);
                    }}>
                        {
                            (()=>{
                                if (this.state.isDjs) {
                                    return '已经发送，请等待（' + this.state.miao + '）';
                                } else {
                                    return '发送短信验证码';
                                }
                            })()
                        }
                    </Button>
                </Form.Item>
                <Form.Item label="短信验证码">
                    {
                        getFieldDecorator(
                            'yzm',
                            {
                                rules: [
                                    {
                                        required: true,
                                        message: '必须填写短信验证码'
                                    },
                                    {
                                        pattern: /^[0-9]{4}$/,
                                        message: '必须是4位数字'
                                    }
                                ]
                            }
                        )(<Input />)
                    }
                </Form.Item>
                {this.props.token}
            </Form>
        );
    }
}
