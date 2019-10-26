import React, {Component} from 'react';
import LR from '../../../layouts/LR.js';
import {Tabs, Input, Badge, Modal} from 'antd';
import {connect} from 'dva';
import './szss.less';
import ModalInner from './ModalInner.js';

const {TabPane} = Tabs;

@connect(
    ({szss}) => ({
        ...szss
    })
)
export default class Szss extends Component {
    constructor () {
        super();
        this.state = {
            isShowModel: true,
            keyword: '',
            nowItem: {'name': '混合装果仁干果', 'pic':'l7lwq17efk.png', 'factory': ['A', 'B'], 'price': 559}
        };
    }
    componentWillMount () {
        this.props.dispatch({'type': 'szss/LOADPRODUCTS'});
    }

    sosuoCount (typeName) {
        if (this.state.keyword === '') return 0;
        // reduce表示揉吧揉吧出个数
        return this.props.products[typeName].reduce((a, b) => {
            if (b.name.includes(this.state.keyword)) return a + 1;
            return a;
        }, 0);
    }

    render () {
        return (
            <LR>
                <div>
                    <Input value={this.state.keyword} onChange={e => {
                        this.setState({
                            keyword: e.target.value
                        });
                    }} />
                </div>
                <Tabs defaultActiveKey='1'>
                    {
                        Object.keys(this.props.products).map(typeName => <TabPane
                            key={typeName}
                            tab={
                                <Badge count={this.sosuoCount(typeName)}>
                                    {typeName}
                                </Badge>
                            }
                        >
                            {
                                this.props.products[typeName].filter(item => item.name.includes(this.state.keyword)).map(item => <div
                                    className='ge'
                                    key={item.name}
                                    onClick={() => {
                                        this.setState({
                                            'isShowModel': true,
                                            'nowItem': item
                                        });
                                    }}
                                >
                                    <p>
                                        <img src={'http://192.168.2.250:8922/productpics/' + item.pic} alt=''/>
                                    </p>
                                    <p><b>{item.name}</b></p>
                                </div>)
                            }
                        </TabPane>)
                    }
                </Tabs>
                <Modal
                    visible={this.state.isShowModel}
                    title='从哪儿发货？'
                    destroyOnClose={true}
                    onCancel={()=>{
                        this.setState({
                            isShowModel: false
                        });
                    }}
                >
                    <ModalInner nowItem={this.state.nowItem} />
                </Modal>
            </LR>
        );
    }
}
