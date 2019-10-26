import React, {Component} from 'react';
import {Row, Col, Progress} from 'antd';
import axios from 'axios';

export default class RealUpIdCard extends Component {
    constructor () {
        super();
        this.state = {
            base641: '',
            base642: '',
            percent1: 0,
            percent2: 0
        };
    }

    componentWillMount () {
        // 得到图片
        let zmfile = this.props.zmfile;
        let fmfile = this.props.fmfile;
        // 上传前预览
        let fr1 = new FileReader();
        let fr2 = new FileReader();
        // 读取这个图片
        fr1.readAsDataURL(zmfile);
        fr2.readAsDataURL(fmfile);
        // 读完了
        fr1.onload = (e) => {
            this.setState({
                base641: e.target.result
            });
        };
        fr2.onload = (e) => {
            this.setState({
                base642: e.target.result
            });
        };

        // 两组formdata逻辑，上传
        // 创建虚拟表单
        let form1 = new FormData();
        let form2 = new FormData();
        // 在虚拟表单中追加图片
        form1.append('file', zmfile);
        form2.append('file', fmfile);

        let pic1done = false;
        let pic2done = false;

        // 提交虚拟表单
        axios.post('/api/uppic', form1, {
            // 头部
            headers: {'Content-Type': 'multipart/form-data'},
            // 进度
            onUploadProgress: progressEvent => {
                let complete = progressEvent.loaded / progressEvent.total * 100;
                this.setState({
                    percent1: complete
                });
            }
        }).then(data => {
            if (data.data.result === 200) {
                pic1done = true;
                if (pic2done === true) {
                    // 通知父亲
                    this.props.alldone();
                }
            }
        });
        // 提交虚拟表单
        axios.post('/api/uppic', form2, {
            // 头部
            headers: {'Content-Type': 'multipart/form-data'},
            // 进度
            onUploadProgress: progressEvent => {
                let complete = progressEvent.loaded / progressEvent.total * 100;
                this.setState({
                    percent2: complete
                });
            }
        }).then(data => {
            if (data.data.result === 200) {
                pic2done = true;
                if (pic1done === true) {
                    // 通知父亲
                    this.props.alldone();
                }
            }
        });
    }

    render () {
        return (
            <div>
                <div>
                    <Row>
                        <Col span={4}>
                            <img width="60" height="60" src={this.state.base641} />
                        </Col>
                        <Col span={20}>
                            <Progress percent={this.state.percent1} status="active" style={{'width': '260px'}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={4}>
                            <img width="60" height="60" src={this.state.base642} />
                        </Col>
                        <Col span={20}>
                            <Progress percent={this.state.percent2} status="active" style={{'width': '260px'}}/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
