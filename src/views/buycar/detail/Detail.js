import React, {Component} from 'react';
import {connect} from 'dva';
import {Descriptions, Badge} from 'antd';
import moment from 'moment';
import RcViewer from '@hanyk/rc-viewer';

import LR from '../../../layouts/LR.js';
import './detail.less';

@connect(({detail})=>({
    ...detail
}))
export default class Detail extends Component {
    componentWillMount () {
        // 发出Ajax，Ajax由model发，model就是saga
        this.props.dispatch({'type': 'detail/INIT', 'id': this.props.match.params.id});
    }
    render () {
        const result = this.props.result;

        if (Object.keys(this.props.result).length === 0) {
            return <div>
                正在加载，请稍后
            </div>;
        }

        return (
            <LR>
                <div className="detailbox">
                    <h1>{result.brand}{result.series}[{result.id}]详细信息</h1>
                    <Descriptions bordered column={4}>
                        <Descriptions.Item label="编号">{result.id}</Descriptions.Item>
                        <Descriptions.Item label="品牌">{result.brand}</Descriptions.Item>
                        <Descriptions.Item label="车系">{result.series}</Descriptions.Item>
                        <Descriptions.Item label="颜色">{result.color}</Descriptions.Item>
                        <Descriptions.Item label="购买日期">{moment(result.buydate).format('YYYY-MM-DD')}</Descriptions.Item>
                        <Descriptions.Item label="公里数">{result.km.toString().replace(/\B(?=(...)+$)/g, ',')}</Descriptions.Item>
                        <Descriptions.Item label="售价">{result.price}万元</Descriptions.Item>
                        <Descriptions.Item label="燃料">{result.fuel}</Descriptions.Item>
                        <Descriptions.Item label="排放">{result.exhaust}</Descriptions.Item>
                        <Descriptions.Item label="发动机">{result.engine}</Descriptions.Item>
                        <Descriptions.Item label="变速箱">{result.gearbox}</Descriptions.Item>
                        <Descriptions.Item label="是有有牌">{result.license ? '有牌' : '黑户'}</Descriptions.Item>
                    </Descriptions>
                    <h3>
                        本车外观图片：
                    </h3>
                    <RcViewer>
                        {
                            result.images.view.map(item => {
                                return <img className='xt' src={'/api/images/carimages_small/' + this.props.id + '/view/' + item} />;
                            })
                        }
                    </RcViewer>
                    <h3>
                        本车内饰图片：
                    </h3>
                    <RcViewer>
                        {
                            result.images.inner.map(item => {
                                return <img className='xt' src={'/api/images/carimages_small/' + this.props.id + '/inner/' + item} />;
                            })
                        }
                    </RcViewer>
                    <h3>
                        本车引擎图片：
                    </h3>
                    <RcViewer>
                        {
                            result.images.engine.map(item => {
                                return <img className='xt' src={'/api/images/carimages_small/' + this.props.id + '/engine/' + item} />;
                            })
                        }
                    </RcViewer>
                    <h3>
                        本车更多图片：
                    </h3>
                    <RcViewer>
                        {
                            result.images.more.map(item => {
                                return <img className='xt' src={'/api/images/carimages_small/' + this.props.id + '/more/' + item} />;
                            })
                        }
                    </RcViewer>
                </div>
            </LR>
        );
    }
}
