import axios from 'axios';

export default {
    namespace: 'salecar',
    state: {
        'token': ''
    },
    reducers: {
        CHANGETOKEN (state, {token}) {
            return {
                ...state,
                token
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
        }
    }
};