import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, DatePicker} from 'antd';

const {RangePicker} = DatePicker;

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class BuyDateFilter extends Component {
    render () {
        return (
            <div>
                <Row style={{'display': this.props.buydate.length === 0 ? 'block' : 'none'}}>
                    <Col span={this.props.labelSpan}>
                        <b>购买日期：</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        <RangePicker onChange={arr => {
                            // arr是moment对象的数组
                            const v = arr.map(item => item.unix() * 1000);
                            this.setState({
                                buydate: v
                            });
                        }} />
                    </Col>
                    <Col span={this.props.btnSpan}>
                        <Button onClick={() => {
                            // 发dispatch，交付SAGA，飞轮效应，越写越简单
                            this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': 'buydate', 'v': this.state.buydate});
                        }}>
                            确定
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
