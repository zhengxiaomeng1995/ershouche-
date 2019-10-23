import React, {Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';

import TB from './TB.js';
const {Content, Sider} = Layout;

export default class LR extends Component {
    render () {
        return (
            <TB>
                <Sider width={200} style={{background: '#fff'}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>面包屑</Breadcrumb.Item>
                        <Breadcrumb.Item>面包屑</Breadcrumb.Item>
                        <Breadcrumb.Item>面包屑</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </TB>
        );
    }
}
