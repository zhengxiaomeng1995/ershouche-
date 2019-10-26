import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Button, Modal} from 'antd';

import columnsMap from './columnsMap.js';
import ModalInner from './ModalInner.js';
import FilterBox from './FilterBox.js';
import LR from '../../../layouts/LR.js';
import './bigtable.less';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class BigTable extends Component {
    constructor () {
        super();
        this.state = {
            // 是否显示模态框
            showChangeColumnModal: false
        };
    }
    // 组件即将上树
    componentWillMount () {
        this.props.dispatch({'type': 'bigtable/GETCOLUMNSFROMLOCALSTORAGE'});
        this.props.dispatch({'type': 'bigtable/INIT'});
    }
    render () {
        return (
            <LR>
                <Modal
                    title="请调整表格列的显示"
                    destroyOnClose={true}
                    visible={this.state.showChangeColumnModal}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            showChangeColumnModal: false
                        });
                    }}
                >
                    <ModalInner ref='modalinner' okHandler={(columns)=>{
                        // 点击确定按钮之后做的事情
                        this.props.dispatch({'type': 'bigtable/SETCOLUMNSTOLOCALSTORAGE', columns});
                        this.setState({
                            showChangeColumnModal: false
                        });
                    }} cancelHandler={(columns)=>{
                        // 点击取消按钮之后做的事情
                        this.setState({
                            showChangeColumnModal: false
                        });
                    }} />
                </Modal>

                <FilterBox />

                <div className="button_box">
                    <Button
                        className="btn"
                        type="primary"
                        shape="circle"
                        icon="setting"
                        onClick={()=>{
                            this.setState({
                                showChangeColumnModal: true
                            });
                        }}
                    />
                </div>
                <h3>共{this.props.total}辆车</h3>
                <Table
                    rowKey="id"
                    columns={
                        this.props.columnArr.map(str => ({
                            'key': str,
                            'dataIndex': str,
                            ...columnsMap[str]
                        }))
                    }
                    dataSource={this.props.results}
                />
            </LR>
        );
    }
}
