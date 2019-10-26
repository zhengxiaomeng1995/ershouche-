import axios from 'axios';

export default {
    namespace: 'salecar',
    state: {
        'token': '',
        'step': 0,
        'step1data': {}
    },
    reducers: {
        CHANGETOKEN (state, {token}) {
            return {
                ...state,
                token
            };
        },
        CHANGESTEP (state, {step, step1data}) {
            return {
                ...state,
                step,
                step1data: step1data !== undefined ? step1data : state.step1data
            };
        }
    },
    effects: {
        // 读取所有bs
        *SENDMSG ({phone}, {put}) {
            // token就是被算出来的密码，不是随机数。
            const token = yield axios.get('http://192.168.2.250:8494/sendmsg.php?phone=' + phone).then(data => data.data);
            // 重新拉取
            yield put({'type': 'CHANGETOKEN', token});
        },
        // 真正添加车辆
        *ADDCAR ({views, inner, more, engine}, {put, select}) {
            // const {step1data} = yield select(({salecar}) => salecar);
            // yield axios.post('/api/addcar', {
            //     images: {
            //         views,
            //         inner,
            //         more,
            //         engine
            //     },
            //     brand: step1data.brand,
            //     color: step1data.color,
            //     series: step1data.series,
            //     exhaust: step1data.exhaust,
            //     engine: step1data.engine,
            //     buydate: step1data.buydate,
            //     km: 3444,
            //     price: 98,
            //     fuel: '纯电动'
            // }).then(function *(data) {
            //     if (data.data === 'ok') {
            // 重新拉取
            yield put({'type': 'CHANGESTEP', 'step': 3});
            //     }
            // });
        }
    }
};