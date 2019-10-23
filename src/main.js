import React from 'react';
import Dva from 'dva';

import bigtableModel from './models/bigtableModel.js';
import detailModel from './models/detailModel.js';
import salecarModel from './models/salecarModel.js';

import route from './route.js';

const app = Dva();

// 模型列表
app.model(bigtableModel);
app.model(detailModel);
app.model(salecarModel);

// 路由
app.router(route);

app.start('#app');
