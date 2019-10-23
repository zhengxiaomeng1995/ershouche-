import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, DatePicker, Tabs} from 'antd';
import classnames from 'classnames';
const {TabPane} = Tabs;

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class BSFilter extends Component {
    constructor () {
        super();
        this.state = {
            nowDaxiezimu: ''
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/LOADALLBSSAGA'});
    }

    componentWillReceiveProps (nextProp) {
        if (nextProp.brand === '') {
            this.setState({
                nowDaxiezimu: ''
            });
        }
    }
    render () {
        if (Object.keys(this.props.allbs).length === 0) return null;

        return (
            <div className="bsfilter_box">
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>品牌：</b>
                    </Col>
                    <Col span={18}>
                        <Tabs defaultActiveKey="1">
                            {
                                Object.keys(this.props.allbs).map(DAXIEZIMU => <TabPane tab={DAXIEZIMU} key={DAXIEZIMU}>
                                    {
                                        Object.keys(this.props.allbs[DAXIEZIMU]).map(brand => <a key={brand} className={classnames(['tab_a', {
                                            'cur': this.props.brand === brand
                                        }])} onClick={()=>{
                                            this.props.dispatch({'type':'bigtable/CHANGEFILTERSAGA', 'k': 'brand', 'v': brand});
                                            this.setState({
                                                'nowDaxiezimu': DAXIEZIMU
                                            });
                                        }}>
                                            {brand}
                                        </a>)
                                    }
                                </TabPane>)
                            }
                        </Tabs>
                    </Col>
                </Row>
                <Row className="myrow">
                    <Col span={this.props.labelSpan}>
                        <b>车系：</b>
                    </Col>
                    <Col span={this.props.choseSpan}>
                        {
                            (() => {
                                if (this.state.nowDaxiezimu !== '' && this.props.brand !== '') {
                                    return this.props.allbs[this.state.nowDaxiezimu][this.props.brand].map(series => <a className={classnames(['tab_a', {
                                        'cur': this.props.series === series
                                    }])} key={series} onClick={()=>{
                                        this.props.dispatch({'type':'bigtable/CHANGEFILTERSAGA', 'k': 'series', 'v': series});
                                    }}>
                                        {series}
                                    </a>);
                                }
                            })()
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
