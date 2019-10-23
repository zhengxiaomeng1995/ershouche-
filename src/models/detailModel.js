import axios from 'axios';

export default {
    namespace: 'detail',
    state: {
        // 结果
        'id': 0,
        'result': []
    },
    reducers: {
        CHANGEID (state, {id}) {
            return {
                ...state,
                id
            };
        },
        CHANGERESULT (state, {result}) {
            return {
                ...state,
                result
            };
        }
    },
    effects: {
        // 读本地存储中读取列
        *INIT ({id}, {put}) {
            const {result} = yield axios.get('/api/car/' + id).then(data => data.data);
            yield put({'type': 'CHANGERESULT', result});
            yield put({'type': 'CHANGEID', id});
        }
    }
};