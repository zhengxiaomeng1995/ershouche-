import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import './layouts.less';

const {Header} = Layout;
@connect(({routing}) => ({
    routing
}))
export default class TB extends Component {
    render () {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{lineHeight: '64px'}}
                        onSelect={({key}) => {
                            if (key === '买车') {
                                this.props.dispatch(routerRedux.push('/buycar/bigtable'));
                            } else if (key === '卖车') {
                                this.props.dispatch(routerRedux.push('/salecar/personalcar'));
                            }
                        }}
                    >
                        <Menu.Item key="买车">买车</Menu.Item>
                        <Menu.Item key="卖车">卖车</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    {this.props.children}
                </Layout>
                <footer>
                    考拉公司 荣誉产品 &copy; 2019-2019
                </footer>
            </Layout>
        );
    }
}
