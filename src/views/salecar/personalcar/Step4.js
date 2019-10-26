import React, {Component} from 'react';
import {Result, Button} from 'antd';

export default class Step4 extends Component {
    constructor () {
        super();
    }

    render () {
        return <div>
            <Result
                status="success"
                title="成功添加车辆信息！"
                subTitle="哈哈哈哈哈哈哈"
                extra={[
                    <Button type="primary" key="console">
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>
                ]}
            />
        </div>;
    }
}
