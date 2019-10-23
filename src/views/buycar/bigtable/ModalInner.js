import React, {Component} from 'react';
import {connect} from 'dva';
import _ from 'lodash';
import {Icon, Button} from 'antd';

import OneSmallElement from './OneSmallElement.js';
import columnsMap from './columnsMap.js';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class ModalInner extends Component {
    constructor (props) {
        super();
        // 这里筹备beixuanArr的初始值，直接交给lodash计算差集。
        let beixuanArr = _.difference(Object.keys(columnsMap), props.columnArr);
        this.state = {
            'columnArr': props.columnArr.slice(),
            'beixuanArr': beixuanArr
        };
    }

    deloneitem (english) {
        console.log('儿子，尼乐山' + english);
        this.setState({
            'columnArr': this.state.columnArr.filter(item => item !== english),
            'beixuanArr': [...this.state.beixuanArr, english]
        });
    }

    render () {
        return (
            <div>
                <p>当前为您展示的列（可以拖拽排序）：</p>
                <div className="onesmallelementbox">
                    {
                        this.state.columnArr.map((item, i) => {
                            return (
                                <OneSmallElement
                                    key={i}
                                    onSortItems={(columnArr)=>{
                                        this.setState({
                                            columnArr
                                        });
                                    }}
                                    items={this.state.columnArr}
                                    sortId={i}
                                    english={item}
                                    chinese={columnsMap[item].title}
                                    other={{
                                        deloneitem: this.deloneitem.bind(this)
                                    }}
                                >
                                </OneSmallElement>
                            );
                        })
                    }
                    <div className="clearfix"></div>
                </div>
                <p>备选列：</p>
                <div className="beixuanbox">
                    {
                        this.state.beixuanArr.map((item, i) => <span
                            key={i}
                        >
                            {columnsMap[item].title}
                            <b onClick={()=>{
                                this.setState({
                                    'beixuanArr': this.state.beixuanArr.filter(_item => _item !== item),
                                    'columnArr': [...this.state.columnArr, item]
                                });
                            }}>
                                <Icon type="plus" />
                            </b>
                        </span>)
                    }
                    <div className="clearfix"></div>
                </div>
                <div className="mi_btn_box">
                    <Button className="cancelbtn" onClick={()=>{
                        this.props.cancelHandler(this.state.cancelHandler);
                    }}>取消</Button>
                    <Button onClick={()=>{
                        this.props.okHandler(this.state.columnArr);
                    }} type="primary">确定</Button>
                </div>
            </div>
        );
    }
}
