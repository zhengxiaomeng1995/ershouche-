import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace: 'bigtable',
    state: {
        // 当前页
        current: 1,
        // 列定义
        columnArr: [],
        // 车结果
        results: [],
        // 筛选器：
        color: [],
        exhaust: [],
        fuel: [],
        engine: [],
        buydate: [],
        price: [0, 120],
        km: [0, 2000000],
        // 所有品牌
        allbs: {},
        // 筛选的品牌
        brand: '',
        // 筛选的车系
        series: ''
    },
    reducers: {
        CHANGECOLUMNS (state, {columnArr}) {
            return {
                ...state,
                columnArr
            };
        },
        CHANGERESULTS  (state, {results}) {
            return {
                ...state,
                results
            };
        },
        CHANGEFILTER (state, {k, v}) {
            return {
                ...state,
                [k]: v
            };
        },
        LOADALLBS (state, {obj}) {
            return {
                ...state,
                allbs: obj
            };
        }
    },
    effects: {
        // 读本地存储中读取列
        *GETCOLUMNSFROMLOCALSTORAGE (action, {put}) {
            // 试着从本地存储中读取column字段
            const columnsFromLocalStorage = localStorage.getItem('columns');
            // 如果这个字段读取出来是null，表示用户第一次来本网站或者清空过缓存
            if (columnsFromLocalStorage === null) {
                // 第一次来，没事儿，给你赋予一个默认值
                localStorage.setItem('columns', JSON.stringify(['img', 'id', 'brand', 'series', 'color']));
            }
            // 再次从本地存储中读取列存储信息，并转换
            const columnArr = JSON.parse(localStorage.getItem('columns'));
            yield put({'type': 'CHANGECOLUMNS', columnArr});
        },
        // 设本地存储
        *SETCOLUMNSTOLOCALSTORAGE ({columns}, {put}) {
            localStorage.setItem('columns', JSON.stringify(columns));
            yield put({'type': 'GETCOLUMNSFROMLOCALSTORAGE'});
        },
        // 读取Ajax
        *INIT (action, {put, select}) {
            const {color, exhaust, fuel, engine, buydate, brand, series, price, km} = yield select(({bigtable}) => bigtable);
            const {results, total} = yield axios.get('http://www.aiqianduan.com:7897/cars?' + querystring.stringify({
                color: color.join('v'),
                exhaust: exhaust.join('v'),
                fuel: fuel.join('v'),
                engine: engine.join('v'),
                buydate: buydate.join('to'),
                price: price.join('to'),
                km: km.join('to'),
                brand,
                series
            })).then(data => data.data);
            yield put({'type': 'CHANGERESULTS', results});
        },
        // 改变筛选条件
        *CHANGEFILTERSAGA ({k, v}, {put}) {
            // 改变筛选条件
            yield put({'type': 'CHANGEFILTER', k, v});
            // 如果你改变的是brand，那么要多一次put，把品牌弄掉
            if (k === 'brand') {
                yield put({'type': 'CHANGEFILTER', 'k': 'series', 'v': ''});
            }
            // 重新拉取
            yield put({'type': 'INIT'});
        },
        // 读取所有bs
        *LOADALLBSSAGA (action, {put}) {
            const obj = yield axios.get('http://www.aiqianduan.com:7897/allbs').then(data => data.data);
            // 重新拉取
            yield put({'type': 'LOADALLBS', obj});
        }
    }
};