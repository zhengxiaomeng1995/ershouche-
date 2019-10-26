import React, {Component} from 'react';
import {Input, Cascader, Button, message, Row, Col} from 'antd';
import {connect} from 'dva';
import OnePic from './OnePic.js';

@connect(
    ({salecar}) => ({
        ...salecar
    })
)
export default class OneRow extends Component {
    constructor () {
        super();
        this.state = {
            files: []
        };
    }

    // 组件已经上树
    componentDidMount () {
        // 必须先屏蔽很多监听，防止浏览器跳转到图片上
        document.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        document.body.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        document.addEventListener('drag', function (e) {
            e.preventDefault();
        });

        document.body.addEventListener('drag', function (e) {
            e.preventDefault();
        });

        document.addEventListener('drop', function (e) {
            e.preventDefault();
        });

        document.body.addEventListener('drop', function (e) {
            e.preventDefault();
        });

        this.refs.row_box.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        this.refs.row_box.addEventListener('drop', (e) => {
            if (e.dataTransfer.files.length === 0) return;
            e.preventDefault();
            this.setState({
                files: [...this.state.files, ...[...e.dataTransfer.files].map(f => ({
                    'id': Math.random(),
                    'file': f
                }))]
            });
        });

        // 引入jQuery，如果window（全局）没有$的定义
        if (window['$'] === undefined) {
            // 创建script标签加载
            let oScript1 = document.createElement('script');
            oScript1.src = '/jslib/jquery.min.js';
            document.body.appendChild(oScript1);
            // 加载完jQuery就加载jQuery UI
            oScript1.onload = () => {
                let oScript2 = document.createElement('script');
                oScript2.src = '/jslib/jquery-ui.min.js';
                document.body.appendChild(oScript2);
                oScript2.onload = () => {
                    $('.row_box').sortable();
                };
            };
        }
    }

    del (id) {
        this.setState({
            files: this.state.files.filter(item => item.id !== id)
        });
    }

    render () {
        return <div>
            <Row>
                <Col span={4}><h3>请上传{this.props.c}照片：</h3></Col>
                <Col span={4}><Button onClick={()=>{
                    // 创建一个事件
                    let evt = document.createEvent('MouseEvents');
                    // 初始化这个事件
                    evt.initMouseEvent('click', false, false);
                    // 发送给别人
                    this.refs.myfile.dispatchEvent(evt);
                }}>添加图片</Button></Col>
                <input type="file" hidden ref="myfile" multiple onChange={()=>{
                    this.setState({
                        files: [...this.state.files, ...[...this.refs.myfile.files].map(f => ({
                            'id': Math.random(),
                            'file': f
                        }))]
                    });
                }}/>
            </Row>
            <div className="row_box" ref="row_box" data-box={this.props.c}>
                {
                    this.state.files.map((item, index) => <OnePic
                        key={item.id}
                        info={item}
                        anothor={{'del': this.del.bind(this)}}
                    />)
                }
            </div>
        </div>;
    }
}
