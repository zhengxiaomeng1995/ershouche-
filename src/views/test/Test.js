import React, {Component} from 'react';
import {Button, message, Icon, Progress} from 'antd';
import axios from 'axios';

export default class Test extends Component {
    constructor () {
        super();
        this.state = {
            'percent': 0,
            'filename': '',
            'base64': ''
        };
    }
    render () {
        return (
            <div style={{
                'width': '800px',
                'margin': '50px auto'
            }}>
                <input type="file" ref="myfile" hidden onChange={()=>{
                    // 得到图片
                    let thepic = this.refs.myfile.files[0];
                    // 上传前预览
                    let fr = new FileReader();
                    // 读取这个图片
                    fr.readAsDataURL(thepic);
                    // 读完了
                    fr.onload = (e) => {
                        this.setState({
                            base64: e.target.result
                        });
                    };
                }}/>
                <Icon type="plus-circle" style={{
                    'fontSize': '70px'
                }} onClick={()=>{
                    // 创建一个事件
                    let evt = document.createEvent('MouseEvents');
                    // 初始化这个事件
                    evt.initMouseEvent('click', false, false);
                    // 发送给别人
                    this.refs.myfile.dispatchEvent(evt);
                }}/>
                <Button onClick={() => {
                    // 创建虚拟表单
                    let form = new FormData();
                    // 得到图片
                    let thepic = this.refs.myfile.files[0];
                    // 在虚拟表单中追加图片
                    form.append('file', thepic);
                    // 提交虚拟表单
                    axios.post('/api/uppic', form, {
                        // 头部
                        headers: {'Content-Type': 'multipart/form-data'},
                        // 进度
                        onUploadProgress: progressEvent => {
                            let complete = progressEvent.loaded / progressEvent.total * 100;
                            this.setState({
                                percent: complete
                            });
                        }
                    }).then(data => {
                        if (data.data.result === 200) {
                            message.success('服务器已经妥收您的图片');
                            this.setState({
                                'filename': data.data.filename
                            });
                        }
                        console.log(data.data);
                    });
                }}>点击我上传图片</Button>
                <Progress percent={this.state.percent} status="active" />
                {this.state.base64 ? <img src={this.state.base64} /> : null}
                {this.state.filename ? <img src={'http://192.168.2.250:3000/uploads/' + this.state.filename} /> : null}
            </div>
        );
    }
}
