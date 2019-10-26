import React, {Component} from 'react';
import {Input} from 'antd';

export default class ModalInner extends Component {
    render () {
        return (
            <div>
                生产{this.props.nowItem.name}的工厂有：
                <div>
                    {
                        this.props.nowItem.factory.map(f => <div className="ff" key={f}>
                            {f}工厂，您要进货：<Input />
                        </div>)
                    }
                </div>
            </div>
        );
    }
}
