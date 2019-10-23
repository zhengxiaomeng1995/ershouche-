import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, Slider} from 'antd';
import classnames from 'classnames';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class PriceKm extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className="bsfilter_box">
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>价格</b>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0}
                            max={120}
                            range
                            value={this.props.price}
                            onChange={(arr)=>{
                                // 发dispatch，交付SAGA，飞轮效应，越写越简单
                                this.props.dispatch({'type': 'bigtable/CHANGEFILTER', 'k': 'price', 'v': arr});
                            }}
                            onAfterChange={(arr)=>{
                                // 发dispatch，交付SAGA，飞轮效应，越写越简单
                                this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': 'price', 'v': arr});
                            }}
                            marks={{
                                0: '0万',
                                10: '10万',
                                30: '30万',
                                50: '50万',
                                70: '70万',
                                100: '100万',
                                120: '120万'
                            }}
                        />
                    </Col>
                </Row>
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>公里数：</b>
                    </Col>
                    <Col span={18}>
                        <Slider
                            min={0}
                            max={200}
                            range
                            value={this.props.km.map(s => s / 10000)}
                            onChange={(arr)=>{
                                // 发dispatch，交付SAGA，飞轮效应，越写越简单
                                this.props.dispatch({'type': 'bigtable/CHANGEFILTER', 'k': 'km', 'v': arr.map(s => s * 10000)});
                            }}
                            onAfterChange={(arr)=>{
                                // 发dispatch，交付SAGA，飞轮效应，越写越简单
                                this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': 'km', 'v': arr.map(s => s * 10000)});
                            }}
                            marks={{
                                0: '0万',
                                10: '10万',
                                30: '30万',
                                50: '50万',
                                70: '70万',
                                100: '100万',
                                200: '200万'
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
