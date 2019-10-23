import React from 'react';
import {Router, Route, Switch, Redirect} from 'dva/router';

import BigTable from './views/buycar/bigtable/BigTable.js';
import Detail from './views/buycar/detail/Detail.js';
import PersonalCar from './views/salecar/personalCar/PersonalCar.js';

export default ({history}) => <Router history={history}>
    <Switch>
        <Route path="/buycar/bigtable" exact component={BigTable}></Route>
        <Route path="/buycar/bigtable/:id" exact component={Detail}></Route>
        <Route path="/salecar/personalcar" exact component={PersonalCar}></Route>
        <Redirect from="/" to="/salecar/personalcar"></Redirect>
    </Switch>
</Router>;
