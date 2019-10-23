import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col} from 'antd';
import classnames from 'classnames';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class FilterBox extends Component {
    constructor () {
        super();
        this.state = {
            isMultiple: false,
            // 已经选中的项
            arr: []
        };
    }

    // 当组件收到新的props的时候（全局的数据改变的时候）
    componentWillReceiveProps (nextProps) {
        // 为什么要写if语句，因为这个生命周期是检测所有全局变化的，太猛了
        // 我们要的就是你当前控制的这个筛选器变化的时候
        // 数组和数组现在在直接比较，因为我们就是要判断是不是内存中的那同一个值。
        if (nextProps[this.props.k] !== this.props[this.props.k]) {
            this.setState({
                isMultiple: false,
                arr: []
            });
        }
    }

    render () {
        return (
            <div className="myrow" style={{'display': this.props[this.props.k].length === 0 ? 'block' : 'none'}}>
                <Row>
                    <Col span={this.props.labelSpan}>
                        <b>{this.props.c}：</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        {
                            this.props.options.map(item => <span
                                className={classnames(['c_span', {
                                    'cur': this.state.arr.includes(item)
                                }])}
                                key={item}
                                onClick={()=>{
                                    if (this.state.isMultiple) {
                                        // 双色球逻辑
                                        if (this.state.arr.includes(item)) {
                                            this.setState({
                                                arr: this.state.arr.filter(_item => _item !== item)
                                            });
                                        } else {
                                            this.setState({
                                                arr: [...this.state.arr, item]
                                            });
                                        }
                                    } else {
                                        // 直接发请求了，交付SAGA
                                        this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': this.props.k, 'v': [item]});
                                    }
                                }}
                            >
                                {item}
                            </span>)
                        }
                    </Col>
                    <Col span={this.props.btnSpan}>
                        {
                            this.state.isMultiple ? <Button type="primary" onClick={()=>{
                                // 发dispatch
                                this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': this.props.k, 'v': this.state.arr});
                            }}>确定</Button> : <Button onClick={()=>{
                                this.setState({
                                    'isMultiple': true
                                });
                            }}>多选</Button>
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
