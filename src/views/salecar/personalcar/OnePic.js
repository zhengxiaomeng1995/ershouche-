import React, {Component} from 'react';
import axios from 'axios';
import classnames from 'classnames';
import {sortable} from 'react-sortable';

@sortable
export default class OnePic extends Component {
    constructor () {
        super();
        this.state = {
            'base64': '',
            'percent': 0,
            'filename': ''
        };
    }
    componentWillMount () {
        // 读取base64得到图片
        let thepic = this.props.info.file;
        // 上传前预览
        let fr = new FileReader();
        // 读取这个图片
        fr.readAsDataURL(thepic);
        // 读完了
        fr.onload = (e) => {
            this.setState({
                'base64': e.target.result
            });
        };
        // 创建虚拟表单
        let form = new FormData();
        // 在虚拟表单中追加图片
        form.append('file', thepic);
        // 提交虚拟表单
        axios.post('/api/uppic', form, {
            headers: {'Content-Type': 'multipart/form-data'},
            // 进度
            onUploadProgress: progressEvent => {
                let complete = progressEvent.loaded / progressEvent.total * 100;
                this.setState({
                    percent: complete
                });
            }
        }).then(data => {
            this.setState({
                'filename': data.data.filename
            });
        });
    }
    render () {
        return (
            <div {...this.props} className={classnames(['onepicbox', {
                'done': this.state.percent === 100
            }])} style={{
                'backgroundImage': 'url(' + this.state.base64 + ')',
                'backgroundSize': 'cover',
                'backgroundPosition': 'center center'
            }} data-filename={this.state.filename}>
                <i className="chazi" onClick={()=>{
                    this.props.anothor.del(this.props.info.id);
                }}>×</i>
                <div className="jdt" style={{
                    'display': this.state.percent === 100 ? 'none' : 'block'
                }}>
                    <b style={{
                        'width': this.state.percent + '%',
                        'backgroundColor': (()=>{
                            if (this.state.percent < 20) {
                                return 'red';
                            } else if (this.state.percent < 50) {
                                return 'orange';
                            } else if (this.state.percent < 70) {
                                return 'yellow';
                            } else {
                                return 'yellowgreen';
                            }
                        })()
                    }}></b>
                </div>
            </div>
        );
    }
}
