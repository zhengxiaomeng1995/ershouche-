import React, {Component} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, Tag} from 'antd';
import classnames from 'classnames';
import moment from 'moment';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class FilterBox extends Component {
    constructor () {
        super();
    }

    // 封装成小函数
    showTagOrNull (json) {
        if (this.props[json.k].length === 0 || json.k === 'price' && this.props[json.k].toString() === '0,120') {
            return null;
        } else {
            let v = '';
            switch (json.k) {
            case 'color':
            case 'engine':
            case 'fuel':
            case 'exhaust':
                v = this.props[json.k].join(' 或 ');
                break;
            case 'buydate':
                v = this.props[json.k].map(item => {
                    return moment(item).format('YYYY年MM月DD日');
                }).join(' 到 ');
                break;
            case 'brand':
            case 'series':
                v = this.props[json.k];
                break;
            case 'price':
                v = this.props[json.k].map(n => n + '万元').join(' 到 ');
                break;
            }

            return <Tag
                key={json.k}
                closable
                onClose={()=>{
                    if (json.k === 'brand' || json.k === 'series') {
                        this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': json.k, 'v': ''});
                    } else if (json.k === 'price') {
                        this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': json.k, 'v': [0, 120]});
                    } else {
                        this.props.dispatch({'type': 'bigtable/CHANGEFILTERSAGA', 'k': json.k, 'v': []});
                    }
                }}
            >
                {json.c} ： {v}
            </Tag>;
        }
    }

    render () {
        return (
            <div className="tagsbox">
                {
                    [
                        {'k': 'color', 'c': '颜色'},
                        {'k': 'engine', 'c': '发动机'},
                        {'k': 'fuel', 'c': '燃料'},
                        {'k': 'exhaust', 'c': '排放'},
                        {'k': 'buydate', 'c': '购买日期'},
                        {'k': 'brand', 'c': '品牌'},
                        {'k': 'series', 'c': '车系'},
                        {'k': 'price', 'c': '价格'}
                    ].map(item => this.showTagOrNull(item))
                }
            </div>
        );
    }
}
