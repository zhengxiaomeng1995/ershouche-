import React, {Component} from 'react';
import {Icon} from 'antd';

export default class OneSmallElement extends Component {
    render () {
        return (
            <div className="onesmallelement">
                {this.props.chinese}
                <b onClick={()=>{
                    this.props.other.deloneitem(this.props.english);
                }}><Icon type="close" /></b>
            </div>
        );
    }
}
