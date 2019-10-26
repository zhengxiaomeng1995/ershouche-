import React, {Component} from 'react';
import './UpIdcard.less';
import {Icon, Row, Col} from 'antd';

export default class UpIdcard extends Component {
    constructor () {
        super();
        this.state = {
            base64: ''
        };
    }

    render () {
        return (
            <Row>
                <Col span={4} style={{'textAlign': 'right'}}>
                    <b className="xing">*</b>请上传身份证{this.props.c}的照片：
                </Col>
                <Col span={9}>
                    <div className="upidcard_box" onClick={() => {
                        // 创建一个事件
                        let evt = document.createEvent('MouseEvents');
                        // 初始化这个事件
                        evt.initMouseEvent('click', false, false);
                        // 发送给别人
                        this.refs.myfile.dispatchEvent(evt);
                    }} style={{
                        'backgroundImage': 'url(' + this.state.base64 + ')'
                    }}>
                        <input type="file" hidden ref="myfile" onChange={()=>{
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

                            // 向爸爸回调这个图片
                            if (this.props.getZm !== undefined) {
                                this.props.getZm(thepic);
                            } else if (this.props.getFm !== undefined) {
                                this.props.getFm(thepic);
                            }
                        }} />
                        <Icon className="plus" type="plus-circle" />
                    </div>
                </Col>
            </Row>
        );
    }
}
