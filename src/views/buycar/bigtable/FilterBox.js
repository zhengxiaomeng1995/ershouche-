import React, {Component} from 'react';
import {connect} from 'dva';

import OneSingleMultiChoise from './OneSingleMultiChoise.js';
import Tags from './Tags.js';
import BuyDateFilter from './BuyDateFilter.js';
import BSFilter from './BSFilter.js';
import PriceKm from './PriceKm.js';

@connect(
    ({bigtable}) => ({
        ...bigtable
    })
)
export default class FilterBox extends Component {
    constructor () {
        super();
        this.state = {
            buydate: []
        };
    }
    render () {
        // 栅格系统占了多少列
        const spans = {
            labelSpan: 2,
            choseSpan: 12,
            btnSpan: 1
        };

        return (
            <div>
                <Tags />

                <BSFilter
                    {...spans}
                />

                <OneSingleMultiChoise
                    {...spans}
                    k={'color'}
                    c={'颜色'}
                    options={['红', '橙', '黄', '绿', '蓝', '黑', '白', '灰', '香槟']}
                />

                <OneSingleMultiChoise
                    {...spans}
                    k={'exhaust'}
                    c={'尾气'}
                    options={['国一', '国二', '国三', '国四', '国五']}
                />

                <OneSingleMultiChoise
                    {...spans}
                    k={'engine'}
                    c={'发动机'}
                    options={['1.6L', '1.6T', '1.8L', '1.8T', '2.0L', '2.0T', '2.4L', '2.4T']}
                />

                <OneSingleMultiChoise
                    {...spans}
                    k={'fuel'}
                    c={'燃料'}
                    options={['汽油', '柴油', '油电混合', '纯电动']}
                />

                <BuyDateFilter
                    {...spans}
                />

                <PriceKm
                    {...spans}
                />
            </div>
        );
    }
}
