import axios from 'axios';

export default {
    namespace: 'szss',
    state: {
        'products': {}
    },
    reducers: {
        CHANGEPRODUCTS (state, {products}) {
            return {
                ...state,
                products
            };
        }
    },
    effects: {
        *LOADPRODUCTS (action, {put}) {
            console.log('123');
            const {products} = yield axios.get('http://192.168.2.250:8922/product').then(data => data.data);
            yield put({'type': 'CHANGEPRODUCTS', products});
        }
    }
};